export function Member(props) {
  return (
    <div className=" font-Bricolage text-[#202020] flex flex-row gap-3 m-3 ml-6 items-center">
      <img src={props.image} className="h-10 w-10 rounded-lg"></img>
      <div className="flex flex-col">
        <div className="text-[14px]">{props.name}</div>
        <div className="text-[14px] opacity-80">{props.job}</div>
      </div>
    </div>
  );
}
