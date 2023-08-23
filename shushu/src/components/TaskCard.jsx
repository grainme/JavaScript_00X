/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, memo } from "react";
import {
  Trash2,
  Edit,
  Tag,
  CircleDot,
  TrendingUp,
  Users,
  X,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReactModal from "react-modal";
import { Comment } from "./Comments";
import { PriorityCard } from "./PriorityCard";
import { useUser } from "@supabase/auth-helpers-react";
import { FriendsDrop } from "./FriendsDropdown";
import { AssigneeAvatars } from "./AssigneeAvtars";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../Client/supabaseClient";
import { Link } from "react-router-dom";
import { HashTags } from "./Hashtags";

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
  const [Comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [ImagesInsideModal, setImagesInsideModal] = useState(props.task.images);
  const [tag, setTag] = useState();
  const [Tags, setTags] = useState([]);
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

    const currentImages = props.task.images || [];

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

  const handleEditClick = () => {
    setIsEditing(!isEditing);
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
    retrieveAvatar();
  }, []);

  async function editTask(
    oldTask,
    newTitle,
    newDescription,
    newDueDate,
    newPriority,
    newTag
  ) {
    // Fetch the existing task data from the database
    const { data: existingData, error: fetchError } = await supabase
      .from("tasks")
      .select()
      .eq("id", props.task.id)
      .single();

    if (fetchError) {
      // Handle the fetch error
    } else {
      // Get the existing tags from the fetched data
      const oldTags = existingData.tags || [];

      // Create an updatedTags array by adding the new tag if it's not null
      const updatedTags =
        newTag !== null && newTag?.length !== 0
          ? [...oldTags, newTag]
          : oldTags;

      // Update the task in the database with the modified data
      const { data: updateData, error: updateError } = await supabase
        .from("tasks")
        .update({
          title: newTitle,
          description: newDescription,
          due_date: newDueDate,
          priority: newPriority,
          tags: updatedTags,
        })
        .eq("id", props.task.id)
        .select();

      if (updateData) {
        setTags(updateData);
      } else {
        console.error("Error updating task:", updateError);
      }
    }
  }

  const retrieveComments = async (props) => {
    try {
      // Get the public URL of the avatar image from Supabase storage
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("task_id", props.task?.id);
      if (error) {
        throw error;
      }
      setComments(data);
    } catch (error) {
      console.error("Error retrieving Comments:", error);
    }
  };

  async function pushCommentBase(taskId, comment) {
    try {
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

  async function removeImage(imageUrl) {
    try {
      const updatedImages = props.task.images.filter((img) => img !== imageUrl);
      const { data, error } = await supabase
        .from("tasks")
        .update({ images: updatedImages })
        .eq("id", props.task.id);

      if (error) {
        console.error("Error removing image:", error.message);
        return;
      }

      console.log("Image removed successfully!");
      // You might want to refresh your component's data after removing the image
    } catch (error) {
      console.error("Error removing image:", error);
    }
  }

  const retrieveImages = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("images")
        .eq("id", props.task.id);

      if (error) {
        console.error("Error retrieving images:", error);
        return;
      }

      // Update the images array in your task state
      const updatedTask = { ...props.task, images: data[0].images };
      // Update the task in the parent component's state or context
      // Example: updateTask(updatedTask);

      setImagesInsideModal(updatedTask.images);
    } catch (error) {
      console.error("Error retrieving images:", error);
    }
  };

  useEffect(() => {
    const channelB = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          table: "tasks",
          event: "*",
          schema: "public",
        },
        (payload) => {
          retrieveComments();
          retrieveImages(); // Call retrieveImages when a change happens in the "tasks" table
        }
      )
      .subscribe();

    return () => {
      // Unsubscribe the channel when the component unmounts
      channelB.unsubscribe();
    };
  }, []);

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
    editTask(props.task.title, title, description, dueDate, priority, tag);
  }

  function cancelEdit() {
    setEditedContent(lastTrack);
    setEditMode(false);
    closeModal();
  }

  function handleComment(event) {
    setComment(event.target.value);
  }

  function handletags(event) {
    setTag(event.target.value);
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
            <div className="flex flex-row">
              <PriorityCard priority={props.task.priority} />
              <AssigneeAvatars
                classy="w-7 h-7 border-2 border-white rounded-full"
                avatars={props.task?.assigneeAvatars}
              />
            </div>
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
                className="stroke-white hover:bg-red-500 hover:text-white bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {props.task.title && (
            <div className="font-Raleway text-[21px] font-medium">{title}</div>
          )}

          <div className=" font-Raleway overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-zinc-600 text-[13px] mt-1 mb-2">
            {description}
          </div>

          {props.task?.images !== null && (
            <div className="mb-2 w-full rounded-xl flex flex-row gap-1 text-[14px] text-[#202020]">
              {ImagesInsideModal.map((img, key) => {
                return (
                  <div
                    key={key}
                    className="h-[2.6rem] w-[2.6rem] rounded-lg overflow-hidden"
                  >
                    <img
                      src={img}
                      className="object-cover h-full w-full"
                      alt={`Image ${key}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row grow">
              {props.task?.tags !== null &&
                props.task?.tags.map((tag, key) => {
                  return <HashTags key={key} tag={tag} />;
                })}
            </div>
            <div className="flex flex-row gap-3">
              {props.task?.Comments !== null &&
                props.task?.Comments.length !== 0 && (
                  <div className="flex flex-row justify-center items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <div className="text-[14px]">
                      {props.task?.Comments !== null
                        ? props.task?.Comments.length
                        : 0}
                    </div>
                  </div>
                )}
              {props.task?.assigneeAvatars !== null &&
                props.task?.assigneeAvatars.length !== 0 && (
                  <div className="flex flex-row justify-center items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    <div className="text-[14px]">
                      {props.task?.assigneeAvatars !== null
                        ? props.task?.assigneeAvatars.length
                        : 0}
                    </div>
                  </div>
                )}
            </div>
          </div>
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
        <h1 className="text-[28px] mb-4 mt-2 font-Raleway">{title}</h1>

        {/* Labels Div*/}
        <div className="flex flex-col gap-3 font-Raleway">
          <div>
            <div className="flex flex-row gap-5">
              <div className="w-[7rem] flex flex-row gap-[.6rem] items-center text-[14px] text-[#202020]">
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
            <div className="flex flex-row gap-5">
              <div className="w-[7rem] flex flex-row gap-[.6rem] items-center text-[14px] text-[#202020]">
                <Users className="h-[14px] w-[14px]" />
                Assignee
              </div>
              <div className="flex flex-row gap-2 items-center  text-[14px] ">
                <AssigneeAvatars
                  classy="w-7 h-7 border-2 border-white rounded-full"
                  avatars={props.task?.assigneeAvatars}
                />
                <FriendsDrop taskId={props.task.id} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row gap-5">
              <div className="w-[7rem] flex flex-row gap-[.6rem] items-center text-[14px] text-[#202020]">
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
            <div className="flex flex-row gap-5">
              <div className="w-[7rem] flex flex-row gap-[.6rem] items-center text-[14px] text-[#202020]">
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
        <div className="flex flex-row gap-5 mt-2 font-Raleway text-[15px] font-medium text-[#202020]">
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
          <div
            className="hover:text-[#7c63e8] cursor-pointer "
            onClick={() => {
              setTextAreaType("hashtags");
            }}
          >
            Hashtags
          </div>
        </div>
        {/* TextArea */}
        <div className="font-Raleway w-full rounded-xl bg-[#F5F5F5]  text-[#202020] flex flex-col">
          {textAreaType === "description" ? (
            <div className=" w-full rounded-xl bg-[#F5F5F5] p-1 flex flex-col ">
              <textarea
                className="text-[14px] bg-transparent resize-none focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0"
                value={description}
                autoFocus
                placeholder="Task content here"
                onChange={handleEditContent}
              />
            </div>
          ) : textAreaType === "comment" ? (
            <div className=" w-full rounded-xl  bg-[#F5F5F5] p-1 flex flex-col ">
              <textarea
                className="text-[14px] text-[#202020] bg-transparent resize-none focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0"
                autoFocus
                value={comment}
                placeholder="Commentate here :)"
                onChange={handleComment}
              />
            </div>
          ) : textAreaType === "hashtags" ? (
            <div className=" w-full rounded-xl p-1 flex flex-col ">
              <input
                className="text-[14px] h-[3rem] p-5 text-[#202020] bg-transparent resize-none focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0"
                autoFocus
                // value={tag}
                placeholder="Add tags to your tasks"
                onChange={handletags}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                  <div className="flex flex-col items-center justify-center pt-7 pb-6">
                    <div className="mb-2 text-sm font-Raleway text-[15px] font-medium text-[#202020]">
                      <span>Click to upload</span> or drag and drop
                    </div>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
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
        {textAreaType !== "upload" && textAreaType !== "hashtags" ? (
          <div className=" w-full rounded-xl flex flex-col gap-4  p-3 text-[14px] text-[#202020]">
            {props.task?.Comments.map((comment, key) => {
              return (
                <Comment
                  commentId={comment.id}
                  removeComment={removeComment}
                  dateComment={comment.cmt_date}
                  comment_author={comment.user_id}
                  content={comment.content}
                  key={key}
                />
              );
            })}
          </div>
        ) : textAreaType === "hashtags" ? (
          <div className="flex flex-row">
            {props.task?.tags !== null &&
              props.task?.tags.map((tag, key) => {
                return <HashTags key={key} tag={tag} />;
              })}
          </div>
        ) : (
          textAreaType !== "hashtags" && (
            <div className="w-full rounded-xl flex flex-row gap-2 p-3 text-[14px] text-[#202020]">
              {props.task?.images !== null &&
                ImagesInsideModal.map((img, key) => {
                  return (
                    <div
                      key={key}
                      className="relative h-[3.5rem] w-[3.5rem] rounded-lg overflow-hidden"
                    >
                      <Link to={img}>
                        <img
                          src={img}
                          className="object-cover h-full w-full"
                          alt={`Image ${key}`}
                        />
                      </Link>
                      <div
                        className="absolute top-0 right-0 p-1 cursor-pointer"
                        onClick={() => removeImage(img)}
                      >
                        <X
                          className="text-white hover:text-red-400"
                          size={20}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )
        )}
      </ReactModal>
    </>
  );
}

export default memo(TaskCard);
