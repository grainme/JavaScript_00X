/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { PlusIcon } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

function ColumnContainer(props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return props.tasks.map((task) => task.id);
  }, [props.tasks]);

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.column.id,
    data: {
      type: "Column",
      column: props.column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          bg-columnBackgroundColor
          opacity-40
          border-2
          border-pink-500
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
        "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
         bg-[#F5F5F5]
         rounded-tl-2xl 
         rounded-tr-2xl
        w-1/3
        h-[500px]
        max-h-[500px]
        flex
        flex-col
      "
    >
      {/* Column title */}
      <div
        className="
          text-md
          h-[60px]
          rounded-md
          rounded-b-none
          py-6
          pl-5
          font-bold
          flex
          items-center
          justify-between
        "
      >
        <div className="flex gap-[14rem] items-center text-slate-900 text-base font-medium">
          <div className="flex flex-row gap-2 items-center text-[19px]">
            {props.column.id === "todo" ? (
              <div className="w-2 h-2 bg-indigo-600 rounded-full" />
            ) : props.column.id === "doing" ? (
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-[#8BC48A] rounded-full" />
            )}
            {props.column.title}
          </div>
          {props.column.id === "todo" && (
            <PlusIcon
              className="w-5 h-5 text-indigo-600  bg-indigo-200 rounded-md relative cursor-pointer"
              onClick={() => {
                props.createTask(props.column.id);
              }}
            />
          )}
        </div>
      </div>
      <div className="m-3">
        {props.column.id === "todo" ? (
          <div className="w-[340px] h-[2px] bg-indigo-600 rounded-sm" />
        ) : props.column.id === "doing" ? (
          <div className="w-[340px] h-[2px] bg-amber-500 rounded-sm" />
        ) : (
          <div className="w-[340px] h-[2px] bg-[#8BC48A] rounded-sm" />
        )}
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {props.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={props.deleteTask}
              updateTask={props.updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
