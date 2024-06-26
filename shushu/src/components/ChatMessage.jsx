/* eslint-disable react/prop-types */
import { DateTime } from "luxon";

export function ChatMessage(props) {
  return (
    <div className="text-[#202020] font-Bricolage flex flex-row gap-3 items-center">
      <img src={props.image} className="h-10 w-10 rounded-lg"></img>
      <div className="flex flex-col">
        <div className="text-[13px]">{props.name}</div>
        <div className="text-[13px] opacity-80">
          Last Sign in{" "}
          {DateTime.fromISO(props.status).toLocaleString(
            DateTime.DATETIME_SHORT
          )}
        </div>
      </div>
    </div>
  );
}
