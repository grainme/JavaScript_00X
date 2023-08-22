export function HashTags(props) {
  const ClassNames = [
    "mr-1 p-2 h-[1.3rem] flex justify-center items-center rounded-lg bg-amber-200 text-amber-500 text-[12px]",
    "mr-1 p-2 h-[1.3rem] flex justify-center items-center rounded-lg bg-blue-200 text-blue-500 text-[12px]",
    "mr-1 p-2 h-[1.3rem] flex justify-center items-center rounded-lg bg-green-200 text-green-500 text-[12px]",
    "mr-1 p-2 h-[1.3rem] flex justify-center items-center rounded-lg bg-yellow-200 text-yellow-500 text-[12px]",
    "mr-1 p-2 h-[1.3rem] flex justify-center items-center rounded-lg bg-orange-200 text-orange-500 text-[12px]",
    "mr-1 p-2 h-[1.3rem] flex justify-center items-center rounded-lg bg-purple-200 text-purple-500 text-[12px]",
    "mr-1 p-2 h-[1.3rem] flex justify-center items-center rounded-lg bg-pink-200 text-pink-500 text-[12px]",
  ];

  // MATHS TRICKS MAROUANE ^-^ Function to generate a consistent index based on the hashtag's content
  const generateIndex = (content) => {
    let sum = 0;
    if (content !== null) {
      for (let i = 0; i < content.length; i++) {
        sum += content.charCodeAt(i);
      }
    }
    return sum % ClassNames.length;
  };

  // Get the index based on the hashtag's content
  const index = generateIndex(props.tag);

  // Select the class name based on the index
  const selectedClassName = ClassNames[index];

  return <div className={selectedClassName}>{props.tag}</div>;
}
