import { useState } from "react";
import "./App.css";
import { Task } from "./Task";

export function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const AddTask = () => {
    const task = {
      id: taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1,
      name: newTask,
      completed: false,
    };
    setTaskList([...taskList, task]);
    setNewTask("");
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const removeTask = (id) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const updateTask = (id) => {
    setTaskList(
      taskList.map((task) => {
        return task.id === id ? { ...task, completed: true } : task;
      })
    );
  };

  return (
    <div className="App">
      <h1>This is a TODO App</h1>

      <div className="AddTask">
        <input
          value={newTask}
          placeholder="Add Task Here"
          onChange={handleInputChange}
        ></input>
        <button onClick={AddTask} type="submit">
          Submit
        </button>
      </div>

      <div className="taskList">
        {taskList.map((task, key) => {
          return (
            <Task
              key={key}
              updateTask={updateTask}
              removeTask={removeTask}
              name={task.name}
              id={task.id}
              completed={task.completed}
            />
          );
        })}
      </div>
    </div>
  );
}
