/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      className="bg-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div className="flex flex-col gap-1 pl-2">
        {props.task.priority && (
          <span
            className={`h-7 w-12 pl-2 pt-1 rounded-lg text-[14px] font-medium ${
              props.task.priority === "low"
                ? "bg-[#D58C48]"
                : props.task.priority === "high"
                ? "bg-red-500"
                : "bg-[#b3f7cf] text-[#67B266]"
            }`}
          >
            {props.task.priority}
          </span>
        )}
        {props.task.title && <h1>{props.task.title}</h1>}
        <p className="my-auto h-[90%] overflow-y overflow-x-hidden whitespace-pre-wrap w-[274px] text-zinc-500 text-xs font-normal">
          {props.task.content}
        </p>
      </div>

      {mouseIsOver && (
        <button
          onClick={() => {
            props.deleteTask(props.task.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
