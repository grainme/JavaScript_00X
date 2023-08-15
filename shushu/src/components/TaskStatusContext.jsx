/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// TaskStatusContext.js
import { createContext, useContext, useState } from "react";

const TaskStatusContext = createContext();

export function TaskStatusProvider({ children }) {
  const [taskStatuses, setTaskStatuses] = useState({});

  return (
    <TaskStatusContext.Provider value={{ taskStatuses, setTaskStatuses }}>
      {children}
    </TaskStatusContext.Provider>
  );
}

export function useTaskStatus() {
  return useContext(TaskStatusContext);
}
