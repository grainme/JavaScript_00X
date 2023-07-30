import {
  HomeIcon,
  LayoutList,
  MessageCircle,
  InfoIcon,
  User2,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex h-screen flex-col justify-between border-e ">
      <div className="px-4 py-6">
        <span className="grid h-10 place-content-center rounded-lg">
          <h1 className="text-[27px] font-semibold font-clash">PomodoroKai</h1>
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <a
              href=""
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              <div className="flex flex-row items-center space-x-3">
                <HomeIcon className="h-5 w-5 text-[#787486]" />
                <div className="text-[#787486]">Home</div>
              </div>
            </a>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <div className="flex flex-row items-center space-x-3">
                  <LayoutList className="h-5 w-5 text-[#787486]" />
                  <div className="text-[#787486]">Management</div>
                </div>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <div className="text-[#787486]">Pomodoro</div>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <div className="text-[#787486]">Kanban</div>
                    </div>
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <a
              href=""
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex flex-row items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-[#787486]" />
                <div className="text-[#787486]">Messages</div>
              </div>
            </a>
          </li>

          <li>
            <a
              href=""
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex flex-row items-center space-x-3">
                <InfoIcon className="h-5 w-5 text-[#787486]" />
                <div className="text-[#787486]">About</div>
              </div>
            </a>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <div className="flex flex-row items-center space-x-3">
                  <User2 className="h-5 w-5 text-[#787486]" />
                  <div className="text-[#787486]">Account</div>
                </div>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Settings
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Profile
                  </a>
                </li>

                <li>
                  <form action="/logout">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="w-[15rem] ml-3 mr-3 mb-3 space-y-7 h-[16rem] rounded-3xl bg-gray-100 mx-auto flex flex-col justify-center items-center p-4">
        <h1 className="text-lg font-semibold">Thoughts Time</h1>
        <p className="text-center text-sm">
          We don’t have any notice for you, till then you can share your
          thoughts with your peers.
        </p>
        <button className=" bg-white p-3 rounded-xl font-[400px] text-[16px]">
          Write a message
        </button>
      </div>

      {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a href="#" className="flex items-center gap-2  p-4 hover:bg-gray-50">
          <img
            alt="Man"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">Marouane Boufarouj</strong>

              <span> marouane@gmail.com </span>
            </p>
          </div>
        </a>
      </div> */}
    </div>
  );
}
