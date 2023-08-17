export function Member(props) {
  return (
    <div className="flex flex-row gap-3 m-3 ml-6 items-center">
      <img src={props.image} className="h-10 w-10 rounded-lg"></img>
      <div className="flex flex-col">
        <div className="text-[12px] font-semibold">{props.name}</div>
        <div className="text-[10px] font-medium opacity-80">{props.job}</div>
      </div>
    </div>
  );
}
