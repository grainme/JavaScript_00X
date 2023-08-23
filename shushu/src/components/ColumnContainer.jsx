/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { PlusIcon, Save } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { supabase } from "../Client/supabaseClient";

function ColumnContainer(props) {
  const [editMode, setEditMode] = useState(false);
  const [savingWorkspace, setSavingWorkspace] = useState(null);

  const showNotification = async () => {
    setSavingWorkspace("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setSavingWorkspace("success");
      setTimeout(() => {
        setSavingWorkspace(null);
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      setSavingWorkspace("error");
    }
  };

  const tasksIds = useMemo(() => {
    return props.tasks.map((task) => task.id);
  }, [props.tasks]);

  async function updateMovedTasksStatus() {
    try {
      setSavingWorkspace("loading");
      for (const movedTask of props.movedTasks) {
        try {
          const { data, error } = await supabase
            .from("tasks")
            .update({ status: movedTask.finalStatus }) // Use an object to specify the update
            .eq("id", movedTask.taskId);

          if (error) {
            showNotification("error");
            throw error;
          } else {
            showNotification("success");
          }
        } catch (error) {
          console.error("Error updating task status:", error);
        }
      }
      setSavingWorkspace("idle"); // Reset the state after all tasks are processed
      showNotification("success");
    } catch (error) {
      console.log("Error: ", error);
      showNotification("error");
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
          bg-black
          opacity-40
          border-7
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
      className="rounded-lg w-1/4 flex flex-col font-Bricolage"
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
        "
      >
        <div className="flex flex-row justify-between items-center text-slate-900">
          <div className="flex items-center grow gap-2 text-[15px] font-normal">
            <div
              className={`w-3 h-3 rounded-sm ${
                props.column.id === "todo"
                  ? "bg-gray-400"
                  : props.column.id === "doing"
                  ? "bg-red-500 text-red-500"
                  : props.column.id === "review"
                  ? "bg-amber-500 "
                  : "bg-green-400 "
              }`}
            />
            <div
              className={`text-[16px] tracking-[.009rem] ${
                props.column.id === "todo"
                  ? " text-gray-400"
                  : props.column.id === "doing"
                  ? " text-red-500"
                  : props.column.id === "review"
                  ? " text-amber-500"
                  : " text-green-500"
              }`}
            >
              {props.column.title}
            </div>
          </div>
          {props.column.id === "todo" && (
            <div className="flex flex-row gap-2 mr-5">
              <PlusIcon
                className="w-6 h-6 p-1 text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-md relative cursor-pointer"
                onClick={() => {
                  props.createTask(props.column.id);
                }}
              />
              <Save
                onClick={updateMovedTasksStatus}
                className="w-6 h-6 p-1  text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-md relative cursor-pointer"
              />
              {savingWorkspace && (
                <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 w-[15rem] rounded-md m-auto mb-1 h-12 flex items-center justify-center text-zinc-100">
                  <span className="text-[15px] font-Bricolage">
                    {savingWorkspace === "success" && "Workspace saved :)"}
                    {savingWorkspace === "error" && "something is wrong"}
                    {savingWorkspace === "loading" && (
                      <div className="flex flex-row items-center justify-center">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        <span>Saving Workspace ...</span>
                      </div>
                    )}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Column task container */}
      <div className="flex flex-grow min-h-[31rem] flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto ">
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
