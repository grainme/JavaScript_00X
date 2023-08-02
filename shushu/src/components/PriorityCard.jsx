/* eslint-disable react/prop-types */
export function PriorityCard(props) {
  return (
    <span
      className={`h-6 w-12 p-auto pl-2 pt-[2px] rounded-lg text-[14px] font-medium ${
        props.priority === "Low"
          ? "bg-[#ffd6b0] text-[#c48a53]"
          : props.priority === "High"
          ? "bg-red-100 text-[#da6565]"
          : props.priority === "Done"
          ? "bg-[#ceffe2] text-[#439b66]"
          : null
      }`}
    >
      {props.priority}
    </span>
  );
}
