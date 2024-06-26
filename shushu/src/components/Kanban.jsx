/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../Client/supabaseClient";
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
  { id: "todo", title: "TO DO" },
  { id: "doing", title: "IN PROGRESS" },
  { id: "done", title: "DONE" },
  { id: "review", title: "NEED REVIEW" },
];

export function KanbanBoard() {
  const user = useUser();
  const [columns, setColumns] = useState(defaultColumns);
  const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasksUser, setTasksUser] = useState([]);
  const [userAvatar, setUserAvatar] = useState("");
  const [movedTasks, setMovedTasks] = useState([]);
  const [Comments, setComments] = useState([]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const checkAvatar = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user?.id)
          .single();
        setUserAvatar(data?.avatar_url);
      } catch (error) {
        console.error(error);
      }
    };
    checkAvatar();
  }, [user?.id]);

  const getTasksForUser = async () => {
    const userId = user?.id;
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .contains("assignee", [userId]); // Note: Pass an array with user's ID

      if (error) {
        throw error;
      }

      setTasksUser(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getTasksForUser(user.id);
    }
  }, [user?.id]);

  const fetchData = async () => {
    const newTasks = await Promise.all(
      tasksUser.map(async (task) => {
        const comments = await retrieveComments(task.id);
        const avatars = await fetchAvatars(task.assignee);

        return {
          id: task.id,
          columnId: task.status,
          content: task.description,
          title: task.title,
          priority: task.priority,
          dueDate: task.due_date,
          images: task.images,
          assignee: task.assignee,
          tags: task.tags,
          Comments: comments,
          assigneeAvatars: avatars,
        };
      })
    );

    setTasks(newTasks);
  };

  useEffect(() => {
    fetchData();
  }, [tasksUser]);

  async function retrieveComments(taskId) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("task_id", taskId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error retrieving Comments:", error);
      return [];
    }
  }

  async function fetchAvatars(taskAssignee) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .in("id", taskAssignee);

      if (error) {
        console.error("Error fetching avatars:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("An error occurred:", error);
      return [];
    }
  }

  async function createTask() {
    try {
      const newTask = {
        title: "Template",
        status: "todo",
        description: "Template",
        user_id: user?.id,
        priority: "Low",
        due_date: new Date(),
        assignee: [user?.id],
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

  const channelA = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
      },
      (payload) => {
        console.log(payload);
        getTasksForUser(user?.id);
        fetchData();
      }
    )
    .subscribe();

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
        <div className="flex ml-5 mr-5 mb-3 gap-[1rem] ">
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
