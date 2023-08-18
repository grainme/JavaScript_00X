/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, memo } from "react";
import { Trash2, Edit, Tag, CircleDot, TrendingUp, Users } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReactModal from "react-modal";
import { Comment } from "./Comments";
import { PriorityCard } from "./PriorityCard";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { FriendsDrop } from "./FriendsDropdown";
import { AssigneeAvatars } from "./AssigneeAvtars";
import { v4 as uuidv4 } from "uuid";

function TaskCard(props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(props.task.content);
  const [lastTrack, setLastTrack] = useState(editedContent);
  const [textAreaType, setTextAreaType] = useState("description");
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.content);
  const [dueDate, setDueDate] = useState(props.task.dueDate);
  const [priority, setPriority] = useState(props.task.priority);
  const [imageUrl, setImageUrl] = useState("");
  const [job, setJob] = useState("");
  const [username, setUsername] = useState("");
  const [Comments, setComments] = useState([]);
  const [taskImgUrl, setTaskImgUrl] = useState("");
  const [ImgHere, setImgHere] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const supabase = useSupabaseClient();
  const user = useUser();

  const CDNURL_TASK =
    "https://fanrwzurfpvlbhywhamg.supabase.co/storage/v1/object/public/tasks";

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    console.log(file);
    console.log(props.task.id);
    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from("tasks")
      .upload(user?.id + "/" + props.task.id + "/" + uuidv4(), file);

    if (error) {
      console.error("Error uploading file:", error);
      return;
    }
    console.log(data);

    // ughhhh this is quite haaaard!
    const imageUrl = CDNURL_TASK + "/" + data.path;
    setUploadedImageUrl(imageUrl);

    // Fetch the current images array from the task
    const { data: taskData, error: taskError } = await supabase
      .from("tasks")
      .select("images")
      .eq("id", props.task.id)
      .single();

    if (taskError) {
      console.error("Error fetching task data:", taskError);
      return;
    }

    const currentImages = taskData.images || [];

    // Update the images array with the new image URL
    const updatedImages = [...currentImages, imageUrl];

    // Update the task's images array
    const { data: updatedTask, error: updateError } = await supabase
      .from("tasks")
      .update({ images: updatedImages })
      .eq("id", props.task.id);

    if (updateError) {
      console.error("Error updating task:", updateError);
      return;
    }

    console.log("File uploaded and task updated successfully:", updatedTask);
  };

  const fetchTaskImages = async () => {
    // Fetch the current images array from the task
    const { data: taskData, error: taskError } = await supabase
      .from("tasks")
      .select("images")
      .eq("id", props.task.id);

    if (taskData) {
      const currentImages = taskData[0].images || [];
      setTaskImgUrl(currentImages[0]);
      setImgHere(true);
    } else {
      console.error("Error fetching task data:", taskError);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const retrieveComments = async () => {
    try {
      // Get the public URL of the avatar image from Supabase storage
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("user_id", user?.id)
        .eq("task_id", props.task.id);
      if (error) {
        throw error;
      }
      setComments(data);
    } catch (error) {
      console.error("Error retrieving Comments:", error);
    }
  };

  const retrieveAvatar = async () => {
    try {
      // Get the public URL of the avatar image from Supabase storage
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();

      if (error) {
        throw error;
      }
      // Now you have the avatar_url from the profiles table
      setImageUrl(data?.avatar_url);
      setJob(data?.job);
      setUsername(data?.username);
    } catch (error) {
      console.error("Error retrieving avatar:", error);
    }
  };

  useEffect(() => {
    retrieveComments();
    fetchTaskImages();
    retrieveAvatar();
  }, [user?.id, props.task]);

  async function editTask(
    oldTask,
    newTitle,
    newDescription,
    newDue_Data,
    newPriority
  ) {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: newTitle,
        description: newDescription,
        due_date: newDue_Data,
        priority: newPriority,
      })
      .eq("id", props.task.id);
    if (error) {
      console.error("Error updating user:", error.message);
      return;
    }
  }

  async function pushCommentBase(taskId, comment) {
    try {
      if (!supabase) {
        console.error("Supabase client not initialized.");
        return;
      }

      if (!taskId || !comment) {
        console.error("Invalid taskId or comment.");
        return;
      }

      const { data, error } = await supabase.from("comments").insert([
        {
          task_id: taskId,
          user_id: user?.id,
          content: comment,
          cmt_date: timeNow(),
        },
      ]);
      await retrieveComments();
      if (error) {
        console.error("Error inserting comment:", error.message);
        return;
      }
    } catch (error) {
      console.error("Error inserting comment:", error);
    }
  }

  async function removeComment(commentId) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
      if (error) {
        console.error("Error removing comment:", error.message);
        return;
      }
      console.log("Comment removed successfully!");

      // Create a new array excluding the deleted comment
      const updatedComments = Comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);

      setIsEditing(false);
      setComment("");
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  }

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChangeDueDate = (e) => {
    setDueDate(e.target.value);
  };

  function handleEditContent(e) {
    setDescription(e.target.value);
  }

  function saveChanges() {
    setIsEditing(false);
    editTask(props.task.title, title, description, dueDate, priority);
    closeModal();
  }

  function cancelEdit() {
    setEditedContent(lastTrack);
    setEditMode(false);
    closeModal();
  }

  function handleComment(event) {
    setComment(event.target.value);
  }

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  function saveComment() {
    pushCommentBase(props.task.id, comment);
    setComment(""); // Clear the comment input after saving
  }

  const customModalStyle = {
    content: {
      width: "550px",
      height: "650px",
      margin: "auto",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      gap: "1.2rem",
      // Marouane, here you can adjust the space between components!
      // justifyContent: "space-around",
      outline: "none",
      backgroundColor: "white",
      // backgroundColor: "#F5F5F5",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.45)",
    },
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditMode(false);
  }

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.task.id,
    data: {
      type: "Task",
      task: props.task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  function toggleEditMode() {
    setEditMode(true);
    openModal();
  }

  function timeNow() {
    const current = new Date();
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          opacity-30
          bg-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 cursor-grab relative
        "
      />
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white p-2.5 items-center flex text-left rounded-xl cursor-grab relative task"
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
      >
        <div className="flex flex-col gap-1 pl-2 w-[300px] flex-grow">
          <div className="flex flex-row items-center justify-between">
            <PriorityCard priority={props.task.priority} className="grow" />
            <div>
              <button
                onClick={toggleEditMode}
                className="stroke-white hover:bg-amber-500 hover:text-white bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  props.deleteTask(props.task.id);
                }}
                className="stroke-white hover:bg-red-400 hover:text-white bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {props.task.title && (
            <div className="font-Bricolage text-[22px]">{title}</div>
          )}

          <div className="overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-zinc-500 text-[12.5px] mt-1 mb-2">
            {description}
          </div>

          {props.task.images !== null && (
            <div className="rounded-lg overflow-hidden max-w-max h-[10rem]">
              <img
                src={props.task.images}
                alt="Task Image"
                className="max-w-1/2 max-h-1/2 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={cancelEdit}
        contentLabel="Edit Task"
        ariaHideApp={false}
        style={customModalStyle}
      >
        {/* Title */}
        <h1 className="text-[28px] mb-4 mt-2">{title}</h1>

        {/* Labels Div*/}
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px] text-[#202020]">
                <Tag className="h-[14px] w-[14px]" />
                Label
              </div>
              <div>
                {isEditing ? (
                  <input
                    value={title}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyPress}
                    className="focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 "
                  />
                ) : (
                  <div onClick={handleEditClick}>{title}</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px] text-[#202020]">
                <Users className="h-[14px] w-[14px]" />
                Assignee
              </div>
              <div className="flex flex-row gap-2 items-center  text-[14px] ">
                <AssigneeAvatars
                  classy="w-7 h-7 border-2 border-white rounded-full"
                  assignees={props.task.assignee}
                />
                <FriendsDrop taskId={props.task.id} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px] text-[#202020]">
                <TrendingUp className="h-[14px] w-[14px]" />
                Due Date
              </div>
              <div>
                {isEditing ? (
                  <input
                    value={dueDate}
                    onChange={handleInputChangeDueDate}
                    onKeyDown={handleInputKeyPress}
                    className="focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 "
                  />
                ) : (
                  <div onClick={handleEditClick}>{dueDate}</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px] text-[#202020]">
                <CircleDot className="h-[14px] w-[14px]" />
                Priority
              </div>
              {isEditing ? (
                <input
                  value={priority}
                  onKeyDown={handleInputKeyPress}
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  className="focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 "
                />
              ) : (
                <div onClick={handleEditClick}>
                  <PriorityCard priority={priority} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 mt-2 text-[15px] text-[#777777] ">
          <div
            className="hover:text-[#7c63e8] cursor-pointer "
            onClick={() => {
              setTextAreaType("description");
            }}
          >
            Description
          </div>
          <div
            className="hover:text-[#7c63e8] cursor-pointer "
            onClick={() => {
              setTextAreaType("comment");
            }}
          >
            Comments
          </div>
          <div
            className="hover:text-[#7c63e8] cursor-pointer "
            onClick={() => {
              setTextAreaType("upload");
            }}
          >
            Upload
          </div>
        </div>
        {/* TextArea */}
        <div className="w-full rounded-xl bg-[#F5F5F5] text-[14.8px] text-[#777777] flex flex-col">
          {" "}
          {textAreaType === "description" ? (
            <div className=" w-full rounded-xl bg-[#F5F5F5] p-1 text-[14.8px]  text-[#777777] flex flex-col ">
              <textarea
                className="bg-transparent resize-none focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0"
                value={description}
                autoFocus
                placeholder="Task content here"
                onChange={handleEditContent}
              />
            </div>
          ) : textAreaType === "comment" ? (
            <div className=" w-full rounded-xl bg-[#F5F5F5] p-1 text-[14.8px] text-[#777777] flex flex-col ">
              <textarea
                className="bg-transparent resize-none focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0"
                autoFocus
                value={comment}
                placeholder="Commentate here :)"
                onChange={handleComment}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                  <div className="flex flex-col items-center justify-center pt-7 pb-6">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {uploadedImageUrl && (
                <div className="rounded-lg overflow-hidden max-w-max  mt-2">
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded Task Image"
                    className="max-w-1/2 max-h-1/2 object-contain"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex justify-between items-end">
            {textAreaType === "comment" ? (
              <button
                onClick={saveComment}
                className="flex ml-auto m-2 px-3 py-1 text-[14px] rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Publish
              </button>
            ) : textAreaType === "description" ? (
              <button
                onClick={saveChanges}
                className="flex ml-auto m-2 px-3 py-1 text-[14px] rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save changes
              </button>
            ) : null}
          </div>
        </div>
        {textAreaType !== "upload" && (
          <div className=" w-full rounded-xl flex flex-col gap-4  p-3 text-[14.8px] text-[#2d2d2d]">
            {Comments.map((comment, key) => {
              return (
                <Comment
                  commentId={comment.id}
                  removeComment={removeComment}
                  dateComment={comment.cmt_date}
                  profile={imageUrl}
                  username={username}
                  content={comment.content}
                  key={key}
                />
              );
            })}
          </div>
        )}
      </ReactModal>
    </>
  );
}

export default memo(TaskCard);
