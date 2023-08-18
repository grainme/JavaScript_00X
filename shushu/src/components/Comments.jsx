/* eslint-disable react/prop-types */
import { X } from "lucide-react";

export function Comment(props) {
  return (
    <div className="flex flex-col gap-2 font-Raleway text-[14px] text-[#202020]">
      <div className="flex flex-row gap-3 items-center">
        <img src={props.profile} className="w-7 h-7 rounded-full"></img>
        <div className="grow font-Raleway text-[15px] font-medium text-[#202020]">
          {props.username}
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div>{props.dateComment}</div>
          <X
            onClick={() => {
              props.removeComment(props.commentId);
            }}
            className="h-4 w-4 cursor-pointer hover:text-red-600 "
          />
        </div>
      </div>
      <div>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
