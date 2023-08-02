/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReactModal from "react-modal";

function TaskCard(props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(props.task.content);
  const [lastTrack, setLastTrack] = useState(editedContent);

  const customModalStyle = {
    content: {
      width: "500px",
      height: "300px",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      outline: "none",
      backgroundColor: "#F5F5F5",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          {props.task.priority && (
            <span
              className={`h-6 w-12 p-auto pl-2 pt-[2px] rounded-lg text-[14px] font-medium ${
                props.task.priority === "Low"
                  ? "bg-[#ffd6b0] text-[#c48a53]"
                  : props.task.priority === "High"
                  ? "bg-red-100 text-[#da6565]"
                  : props.task.priority === "Done"
                  ? "bg-[#ceffe2] text-[#439b66]"
                  : null
              }`}
            >
              {props.task.priority}
            </span>
          )}
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
        <h1 className="text-2xl font-semibold mb-4">Edit Here!</h1>
        <textarea
          className="h-[70%] w-full text-[17px] resize-none border rounded bg-white text-black focus:outline-none p-2"
          value={editedContent}
          autoFocus
          placeholder="Task content here"
          onChange={handleEditContent}
        />
        <div className="flex justify-between mt-4 gap-4">
          <button
            onClick={cancelEdit}
            className="px-4 py-2 rounded  bg-red-100 hover:bg-red-200 text-[#da6565]"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 rounded bg-[#ceffe2] text-[#439b66] hover:bg-[#b5edcb]"
          >
            Save Changes
          </button>
        </div>
      </ReactModal>
    </>
  );
}

export default TaskCard;
