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

  useEffect(() => {
    if (user?.id) {
      getTasksForUser(user.id);
    }
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
    }));
    setTasks(newTasks);
  }, [tasksUser]);

  async function createTask(columnId) {
    try {
      const newTask = {
        title: "Template",
        status: columnId === 1 ? "todo" : columnId === 2 ? "doing" : "done",
        description: "Template",
        team_id: 2,
        user_id: user?.id,
        priority: "Low",
        due_date: new Date(),
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

  useEffect(() => {
    if (user?.id) {
      getTasksForUser(user.id);
      const subscription = supabase
        .channel("table-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => {
            getTasksForUser(user.id);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user?.id]);

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

    setColumns((prevColumns) => {
      const activeIndex = prevColumns.findIndex((col) => col.id === activeId);
      const overIndex = prevColumns.findIndex((col) => col.id === overId);

      return arrayMove(prevColumns, activeIndex, overIndex);
    });
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

    if (!isActiveATask) {
      return;
    }

    if (isActiveATask && isOverATask) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((t) => t.id === activeId);
        const overIndex = prevTasks.findIndex((t) => t.id === overId);

        prevTasks[activeIndex].columnId = prevTasks[overIndex].columnId;

        return arrayMove(prevTasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((t) => t.id === activeId);

        prevTasks[activeIndex].columnId = overId;

        return arrayMove(prevTasks, activeIndex, activeIndex);
      });
    }
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
