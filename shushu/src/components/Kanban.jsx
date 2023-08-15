/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";

const defaultColumns = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Work in progress" },
  { id: "done", title: "Done :)" },
];

export function KanbanBoard() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [columns, setColumns] = useState(defaultColumns);
  const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasksUser, setTasksUser] = useState([]);
  const [userAvatar, setUserAvatar] = useState("");
  const [movedTasks, setMovedTasks] = useState([]);

  useEffect(() => {
    const checkAvatar = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user?.id);
        setUserAvatar(data[0]?.avatar_url);
      } catch (error) {
        console.error(error);
      }
    };
    checkAvatar();
  }, []);

  useEffect(() => {
    let subscription;

    if (user?.id) {
      getTasksForUser(user.id);

      subscription = supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
          },
          (payload) => {
            getTasksForUser(user.id);
          }
        )
        .subscribe();
    }

    // Clean up the subscription when the component unmounts or user.id changes
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [user?.id]);

  const getTasksForUser = async (userUID) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("user_id", userUID);
      if (error) {
        throw error;
      }
      setTasksUser(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const newTasks = tasksUser.map((task) => ({
      id: task.id,
      columnId: task.status,
      content: task.description,
      title: task.title,
      priority: task.priority,
      dueDate: task.due_date,
      images: task.images,
      assignee: task.assignee,
    }));
    setTasks(newTasks);
  }, [tasksUser]);

  async function createTask() {
    try {
      const newTask = {
        title: "Template",
        status: "todo",
        description: "Template",
        user_id: user?.id,
        priority: "Low",
        due_date: new Date(),
        assignee: [{ name: user?.id, avatar: userAvatar }],
      };
      const { data, error } = await supabase.from("tasks").insert([newTask]);
      if (error) {
        throw error;
      }
      await getTasksForUser(user?.id);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) =>
      task.id !== id ? task : { ...task, content }
    );
    setTasks(newTasks);
  }

  function onDragStart(event) {
    const activeData = event.active.data.current;
    if (activeData?.type === "Column") {
      setActiveColumn(activeData.column);
    } else if (activeData?.type === "Task") {
      setActiveTask(activeData.task);
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return;
    }

    // This effect is not good but let's keep in case ;)
    // setColumns((prevColumns) => {
    //   const activeIndex = prevColumns.findIndex((col) => col.id === activeId);
    //   const overIndex = prevColumns.findIndex((col) => col.id === overId);

    //   return arrayMove(prevColumns, activeIndex, overIndex);
    // });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return;
    }

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column"; // Define this variable

    if (!isActiveATask) {
      return;
    }

    // Extract the new status based on the type of drop target
    let newStatus;
    if (isOverATask) {
      newStatus = tasks.find((t) => t.id === overId)?.columnId;
    } else if (isOverAColumn) {
      newStatus = overId;
    }

    // Check if the task is already in movedTasks list
    const existingMovedTaskIndex = movedTasks.findIndex(
      (mt) => mt.taskId === activeId
    );

    if (existingMovedTaskIndex !== -1) {
      // Update the existing task status in movedTasks list
      const updatedMovedTasks = [...movedTasks];
      updatedMovedTasks[existingMovedTaskIndex].finalStatus = newStatus;

      setMovedTasks(updatedMovedTasks);
    } else {
      // Insert a new pair in movedTasks list
      setMovedTasks((prevMovedTasks) => [
        ...prevMovedTasks,
        { taskId: activeId, finalStatus: newStatus },
      ]);
    }

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      // Update the columnId of the moved task
      tasks[activeIndex].columnId = newStatus;

      return arrayMove(tasks, activeIndex, overIndex);
    });
  }

  return (
    <div>
      <DndContext
        sensors={useSensors(
          useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
        )}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex ml-5 mr-5 mb-3 gap-[2rem]">
          <SortableContext items={columnIds}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                movedTasks={movedTasks}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
