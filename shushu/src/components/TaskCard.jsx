/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Modal } from "react-modal";

function TaskCard(props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

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

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <textarea
          className="
            h-[90%]
            w-full resize-none border-none rounded bg-white text-black focus:outline-none
          "
          value={props.task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => props.updateTask(props.task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
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
            onClick={() => {
              props.updateTask(props.task.id);
            }}
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
          {props.task.content}
        </p>
      </div>
    </div>
  );
}

export default TaskCard;
