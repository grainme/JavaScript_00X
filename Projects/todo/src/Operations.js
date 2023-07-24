export function Operations(props) {
  return (
    <div className="AddTask">
      <input
        value={props.newTask}
        placeholder="Add Task"
        onChange={props.handleInputChange}
      ></input>
      <button type="submit" onClick={props.updateTasks}>
        Submit
      </button>
      <button onClick={props.resetTasks}>Reset</button>
    </div>
  );
}
