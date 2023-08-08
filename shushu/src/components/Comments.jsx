/* eslint-disable react/prop-types */
import { X } from "lucide-react";

export function Comment(props) {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-row gap-3 items-center text-[15px] font-medium">
        <img src={props.profile} className="w-7 h-7 rounded-full"></img>
        <div className="grow">{props.username}</div>

        <div className="flex flex-row gap-1 items-center text-gray-700 text-[12px]">
          <div className="">{props.dateComment}</div>
          <X
            onClick={() => {
              props.removeComment(props.commentId);
            }}
            className="h-4 w-4 cursor-pointer"
          />
        </div>
      </div>
      <div className="text-[#777777] text-[14px]">
        <p>{props.content}</p>
      </div>
    </div>
  );
}
