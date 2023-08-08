/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done :)",
  },
];

export function KanbanBoard() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasksUser, setTasksUser] = useState([]);

  // This is just testing Supabase Fetching Data from Tables
  useEffect(() => {
    const getTasksForUser = async (userUID) => {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select()
          .eq("user_id", userUID);
        if (error) {
          throw error;
        }
        return data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        return null;
      }
    };

    (async () => {
      if (user?.id) {
        const tasks = await getTasksForUser(user?.id);
        setTasksUser(tasks);
      }
    })();
  }, [user?.id]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

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

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex ml-5 mr-5 mb-3 gap-[2rem]">
          <SortableContext items={columnsId}>
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

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }
  async function createTask(columnId) {
    try {
      const newTask = {
        title: "Template",
        user_id: user.id, // Assuming your tasks table has a user_id column
        status: "todo",
        description: "Template",
        title: "Template",
        team:2,
        user_id:user?.id,
        priority: "Low", // Set the appropriate priority value
        due_date: new Date(), // Set the due date as needed
      };
      const { data, error } = await supabase.from("tasks").insert([newTask]);
      if (error) {
        throw error;
      }

    } catch (error) {
      console.error("Error creating task:", error);
    }
  }


  async function deleteTask(id) {
    try {
      // Delete the task from the database
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Update the local state by filtering out the deleted task
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
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

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
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

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}
