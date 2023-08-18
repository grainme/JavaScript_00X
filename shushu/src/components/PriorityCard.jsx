/* eslint-disable react/prop-types */
export function PriorityCard(props) {
  let bgColor, textColor, darkBgColor, darkTextColor;

  switch (props.priority) {
    case "High":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      darkBgColor = "dark:bg-red-900";
      darkTextColor = "dark:text-red-300";
      break;
    case "Low":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      darkBgColor = "dark:bg-yellow-900";
      darkTextColor = "dark:text-yellow-300";
      break;
    case "Done":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      darkBgColor = "dark:bg-green-900";
      darkTextColor = "dark:text-green-300";
      break;
    default:
      bgColor = "";
      textColor = "";
      darkBgColor = "";
      darkTextColor = "";
  }

  return (
    <span
      className={`w-[3rem] font-Bricolage text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${bgColor} ${textColor} ${darkBgColor} ${darkTextColor}`}
    >
      {props.priority}
    </span>
  );
}
