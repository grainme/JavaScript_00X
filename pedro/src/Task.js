export const Task = (props) => {
  return (
    <div className="noBreak">
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
          props.completed = true;
          props.updateTask(props.id);
        }}
      >
        Compelete
      </button>
    </div>
  );
};
