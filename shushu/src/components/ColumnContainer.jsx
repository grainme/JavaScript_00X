/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { PlusIcon, Save } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function ColumnContainer(props) {
  const [editMode, setEditMode] = useState(false);
  const supabase = useSupabaseClient();

  const tasksIds = useMemo(() => {
    return props.tasks.map((task) => task.id);
  }, [props.tasks]);

  async function updateTaskStatus(taskId, newStatus) {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", taskId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  // Iterate over the movedTasks array and update task statuses
  function updateMovedTasksStatus() {
    for (const movedTask of props.movedTasks) {
      updateTaskStatus(movedTask.taskId, movedTask.finalStatus);
    }
  }

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
      className="bg-[#F5F5F5] rounded-2xl w-1/3 flex flex-col"
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
        "
      >
        <div className="flex flex-row justify-between items-center text-slate-900 text-base font-medium">
          <div className="flex items-center grow gap-2 text-[19px]">
            <div
              className={`w-2 h-2 rounded-full ${
                props.column.id === "todo"
                  ? "bg-indigo-600"
                  : props.column.id === "doing"
                  ? "bg-amber-500"
                  : "bg-[#8BC48A]"
              }`}
            />
            <h1>{props.column.title}</h1>
          </div>
          {props.column.id === "todo" && (
            <div className="flex flex-row gap-2 mr-5">
              <PlusIcon
                className="w-6 h-6 p-1 text-indigo-600 bg-indigo-200 hover:bg-indigo-300 rounded-md relative cursor-pointer"
                onClick={() => {
                  props.createTask(props.column.id);
                }}
              />
              <Save
                onClick={updateMovedTasksStatus}
                className="w-6 h-6 p-1  text-indigo-600 bg-indigo-200 hover:bg-indigo-300 rounded-md relative cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      <div className="m-3">
        {props.column.id === "todo" ? (
          <div className=" h-[2px] bg-indigo-600 rounded-sm" />
        ) : props.column.id === "doing" ? (
          <div className=" h-[2px] bg-amber-500 rounded-sm" />
        ) : (
          <div className=" h-[2px] bg-[#8BC48A] rounded-sm" />
        )}
      </div>

      {/* Column task container */}
      <div className="flex flex-grow h-[28rem] flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
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
