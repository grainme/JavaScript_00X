/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trash2, Edit, Tag, CircleDot, TrendingUp, Users } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReactModal from "react-modal";
import profile from "../assets/mriwina.jpg";
import { PriorityCard } from "./PriorityCard";
import { Title } from "./Title";

function TaskCard(props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(props.task.content);
  const [lastTrack, setLastTrack] = useState(editedContent);
  const [textAreaType, setTextAreaType] = useState("description");
  const [comment, setComment] = useState("");

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
      /* Marouane, here you can adjust the space between components! */
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

  function handleEditContent(event) {
    setEditedContent(event.target.value);
  }

  function saveChanges() {
    props.updateTask(props.task.id, editedContent);
    setLastTrack(editedContent);
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
        {mouseIsOver && (
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
        )}
        <div className="flex flex-col gap-1 pl-2 w-[300px] flex-grow">
          <PriorityCard priority={props.task.priority} />
          {props.task.title && <h1>{props.task.title}</h1>}

          <p className="overflow-y-auto overflow-x-hidden w-[280px] whitespace-pre-wrap text-zinc-500 text-xs font-normal">
            {editedContent}
          </p>
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
        <h1 className="text-[28px] font-medium mb-4 mt-2">
          {props.task.title}
        </h1>

        {/* Labels Div*/}
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px]  text-[#777777]">
                <Tag className="h-[14px] w-[14px]" />
                Label
              </div>
              <div className="text-[14px] ">{props.task.title}</div>
            </div>
          </div>

          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px]  text-[#777777]">
                <Users className="h-[14px] w-[14px]" />
                Assignee
              </div>
              <div className="text-[14px] ">To Be Done!</div>
            </div>
          </div>

          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px]  text-[#777777]">
                <TrendingUp className="h-[14px] w-[14px]" />
                Due Date
              </div>
              <Title
                titleStyle=""
                classNameInput=" bg-transparent border-b-2  border-indigo-600 focus:outline-none"
                inputEdit="p-1 w-6 h-6 bg-indigo-200 text-indigo-600 rounded-lg cursor-pointer"
                editIcon="false"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-row ">
              <div className="w-[7rem] flex flex-row gap-1 items-center text-[14px]  text-[#777777]">
                <CircleDot className="h-[14px] w-[14px]" />
                Priority
              </div>
              <PriorityCard priority={props.task.priority} />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 mt-2 text-[15px] font-medium text-[#777777] ">
          <div
            className="hover:text-[#7c63e8] cursor-pointer"
            onClick={() => {
              setTextAreaType("description");
            }}
          >
            Description
          </div>
          <div
            className="hover:text-[#7c63e8] cursor-pointer  hover:border-b-2"
            onClick={() => {
              setTextAreaType("comment");
            }}
          >
            Comments
          </div>
        </div>
        {/* TextArea */}
        {textAreaType === "description" ? (
          <div className="h-[17%] w-full rounded-xl bg-[#F5F5F5] p-3 text-[14.8px] text-[#777777] flex flex-col ">
            <textarea
              className="bg-transparent resize-none focus:outline-none"
              value={editedContent}
              autoFocus
              placeholder="Task content here"
              onChange={handleEditContent}
            />
          </div>
        ) : (
          <div className="h-[17%] w-full rounded-xl bg-[#F5F5F5] p-3 text-[14.8px] text-[#777777] flex flex-col justify-end">
            <textarea
              className="bg-transparent resize-none focus:outline-none"
              autoFocus
              value={comment}
              placeholder="Commentate here :)"
              onChange={handleComment}
            />
            <button className="px-4 py-2 rounded bg-purple-200 hover:bg-purple-300 text-[#7165da] mt-2 ml-auto">
              Publish
            </button>
          </div>
        )}
        <div className="h-[10rem] w-full rounded-xl flex flex-col gap-4  p-3 text-[14.8px] text-[#2d2d2d] overflow-auto">
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-3 items-center text-[15px] font-medium">
              <img src={profile} className="w-7 h-7 rounded-full"></img>
              <div>Saitam Kun</div>
            </div>
            <div className="text-[#777777] text-[14px]">
              <p>We need to finish up this task asap!</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-3 items-center text-[15px] font-medium">
              <img src={profile} className="w-7 h-7 rounded-full"></img>
              <div>Saitam Kun</div>
            </div>
            <div className="text-[#777777] text-[14px]">
              <p>We need to finish up this task asap!</p>
            </div>
          </div>
        </div>
        <button
          onClick={saveChanges}
          className="px-4 py-2 rounded bg-[#ceffe2] text-[#439b66] hover:bg-[#b5edcb] mt-2 ml-auto"
        >
          Save
        </button>
      </ReactModal>
    </>
  );
}

export default TaskCard;
