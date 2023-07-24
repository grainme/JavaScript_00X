import { useEffect, useState } from "react";
import { Operations } from "./components/Operations";
import { Results } from "./components/Results";
import { Quote } from "./components/Quote";
import Axios from "axios";
import "./styles/todo.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    id: NaN,
    completed: false,
  });
  const [newQuote, setNewQuote] = useState("");

  const fetchApi = async () => {
    try {
      const response = await Axios.get("https://api.adviceslip.com/advice");
      setNewQuote(response.data.slip.advice);
    } catch (error) {
      // Handle API call errors
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleInputChange = (event) => {
    setNewTask({
      name: event.target.value,
      id: taskList.length === 0 ? 1 : taskList[taskList.length - 1]?.id + 1,
      completed: false,
    });
  };

  const updateTasks = () => {
    if (newTask.name.length !== 0) {
      setTaskList([...taskList, newTask]);
      setNewTask({ name: "", id: 0, completed: false });
    } else {
      alert("Try Again!");
    }
  };

  const deleteTask = (id) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const resetTasks = () => {
    setTaskList([]);
  };

  const completeTask = (id) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true };
      } else {
        return task;
      }
    });
    setTaskList(newTaskList);
  };

  return (
    <div className="App">
      <h1>TO-DO LIST</h1>
      <Operations
        newTask={newTask.name}
        handleInputChange={handleInputChange}
        updateTasks={updateTasks}
        resetTasks={resetTasks}
      />
      <Results
        taskList={taskList}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
      <Quote newQuote={newQuote} />
    </div>
  );
}

export default App;
