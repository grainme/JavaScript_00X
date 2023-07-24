export const Task = (props) => {
  return (
    <div
      className="noBreak"
      style={{ backgroundColor: props.completed ? "green" : "" }}
    >
      <h1>{props.name}</h1>
      <button 
        onClick={() => {
          props.removeTask(props.id);
        }}
      >
        X
      </button>
      <button
        onClick={() => {
          props.updateTask(props.id);
        }}
      >
        Compelete
      </button>
    </div>
  );
};
