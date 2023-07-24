export function Results(props) {
  return (
    <div className="ShowTask">
      <ul>
        {props.taskList.map((task, key) => {
          return (
            <div className="task" key={key}>
              <li>{task.name}</li>
              <div className="taskOp">
                <button
                  onClick={() => {
                    props.deleteTask(task.id);
                  }}
                  style={{
                    color: task.completed ? "white" : "",
                    backgroundColor: task.completed ? "green" : "",
                  }}
                >
                  X
                </button>
                <button
                  style={{
                    color: task.completed ? "white" : "",
                    backgroundColor: task.completed ? "green" : "",
                  }}
                  onClick={() => {
                    props.completeTask(task.id);
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
