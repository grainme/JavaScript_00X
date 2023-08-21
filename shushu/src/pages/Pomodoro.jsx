import { useState, useEffect } from "react";
import { Sidebar } from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";
import { Icons } from "../components/Icons";
import { Dropdown } from "../components/Dropdown";

export function Pomodoro() {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [formattedTime, setFormattedTime] = useState("25:00"); // Initial time

  useEffect(() => {
    let animationFrameId;

    const startTimer = (timestamp) => {
      if (!startTime) {
        setStartTime(timestamp);
      }
      if (isRunning) {
        setElapsedTime(timestamp - startTime);
      }

      const remainingTime = Math.max(time - Math.floor(elapsedTime / 1000), 0);
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      const newFormattedTime =
        ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

      setFormattedTime(newFormattedTime);

      if (remainingTime > 0) {
        animationFrameId = requestAnimationFrame(startTimer);
      } else {
        setFormattedTime("00:00");
      }
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(startTimer);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [time, startTime, elapsedTime, isRunning]);

  const handleStartClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStopClick = () => {
    setIsRunning(false);
    setStartTime(null);
  };

  const handleResumeClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(performance.now() - elapsedTime);
    }
  };

  return (
    <div className="flex flex-row bg-[#FFFEFB]">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen flex flex-col">
        <div className="h-10 flex flex-row justify-between items-center my-6 pr-2 pl-[3rem] mb-3">
          <SearchBar className="flex-grow" />
          <div className="flex flex-row ">
            <Icons />
            <div className="top-[0.2rem]">
              <Dropdown />
            </div>
          </div>
        </div>
        <div className="border-b"></div>
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 flex justify-center items-center m-auto">
            <div className="flex flex-col justify-center items-center  w-[60vw] h-[60vh] rounded-lg">
              {/* Timer section */}
              <div className="flex flex-col items-center">
                <h1
                  id="timer"
                  className="text-[260px] font-clash text-black font-semibold"
                >
                  {formattedTime}
                </h1>
                <div className="flex justify-center gap-[4rem]">
                  <button
                    onClick={handleStopClick}
                    className="bg-transparent font-medium w-[15rem] h-[5rem] border border-gray-400 rounded-md text-[30px] font-clash text-gray-700 m-0.2 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    Stop
                  </button>
                  <button
                    onClick={handleStartClick}
                    className="bg-transparent font-medium w-[15rem] h-[5rem] border border-gray-400 rounded-md text-[30px] font-clash text-gray-700 m-0.2 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    Start
                  </button>
                  <button
                    onClick={handleResumeClick}
                    className="bg-transparent font-medium w-[15rem] h-[5rem] border border-gray-400 rounded-md text-[30px] font-clash text-gray-700 m-0.2 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
