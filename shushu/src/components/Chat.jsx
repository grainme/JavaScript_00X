/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Sidebar } from "../components/SideBar";
import { Member } from "./TeamMember";
import { Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../Client/supabaseClient";
import debounce from "lodash/debounce";
import { DateTime } from "luxon";

export function Chat() {
  const [avatars, setAvatars] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messagesData, setMessageData] = useState();
  const user = useUser();
  const messagesEndRef = useRef(null);
  const [Online, setOnline] = useState(false);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchAvatars = async () => {
    try {
      const { data: friendData, error: friendError } = await supabase
        .from("friend_relationships")
        .select()
        .eq("status", "accepted")
        .or(`friend_id.eq.${user?.id},user_id.eq.${user?.id}`);

      if (friendError) {
        console.error("Error fetching friend relationships:", friendError);
        return;
      }

      const friendIds = friendData.map((duo) =>
        duo.friend_id !== user?.id ? duo.friend_id : duo.user_id
      );

      if (friendIds.length > 0) {
        const { data: avatarData, error: avatarError } = await supabase
          .from("profiles")
          .select("*")
          .in("id", friendIds);

        if (avatarError) {
          console.error("Error fetching avatars:", avatarError);
          return;
        }

        if (Array.isArray(avatarData) && avatarData.length > 0) {
          setAvatars(avatarData);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const debouncedFetchAvatars = debounce(fetchAvatars, 300);

  useEffect(() => {
    debouncedFetchAvatars();
  }, [user?.id]);

  supabase
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "friend_relationships",
      },
      (payload) => {
        fetchAvatars();
      }
    )
    .subscribe();

  const sendMessage = async () => {
    const currentTime = DateTime.local();
    try {
      const newMessage = {
        receiver_id: selectedMember.id,
        content: messageInput,
        created_at: currentTime.toISO(),
      };
      const { data, error } = await supabase
        .from("messages")
        .insert([newMessage]);
      // Clear the message input after sending
      if (error) {
        throw error;
      }
      console.log("Message inserted nicely!");
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      if (selectedMember) {
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select()
          .order("created_at", { ascending: true });

        if (messagesError) {
          console.error("Error fetching messages:", messagesError);
          return;
        }

        setMessageData(messagesData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    scrollToBottom();
    const channelA = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        (payload) => {
          fetchMessages();
          scrollToBottom();
        }
      )
      .subscribe();
  }, [selectedMember?.id]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever new messagesData is set
  }, [messagesData]);

  return (
    <div className="flex flex-row ">
      <div className="w-[1px] opacity-10 bg-slate-600"></div>
      <div className="w-2/3">
        {selectedMember && (
          <div className="flex flex-col m-4 h-[75vh]">
            {/* Render the chat messages here */}
            <div className="flex flex-col flex-1 gap-4 ml-4 overflow-y-auto max-h-[calc(100vh - 150px)]">
              {" "}
              {/* Example chat message */}
              <ChatMessage
                image={selectedMember.avatar_url}
                name={selectedMember.full_name}
                status={user?.last_sign_in_at}
              />
              <div className="flex-grow"></div>
              <div className=" font-Raleway flex flex-col gap-4 ml-4 mr-7 text-[14px] text-[#202020]">
                {messagesData &&
                  messagesData.map(
                    (message, key) =>
                      ((message.sender_id === selectedMember.id &&
                        message.receiver_id === user.id) ||
                        (message.receiver_id === selectedMember.id &&
                          message.sender_id === user.id)) && (
                        <div
                          key={key}
                          className={`${
                            message.sender_id === user?.id
                              ? "flex flex-row-reverse"
                              : "flex"
                          }`}
                        >
                          <div
                            className={`${
                              message.sender_id === user?.id
                                ? "self-end bg-purple-600 text-white "
                                : "self-start bg-gray-100 text-gray-700"
                            } p-2 pl-4 pr-4 max-w-[60%] rounded-2xl`}
                          >
                            {message.content}
                            {/* <div>
                                {DateTime.fromISO(
                                  message.created_at
                                ).toLocaleString(DateTime.DATETIME_SHORT)}
                              </div> */}
                          </div>
                        </div>
                      )
                  )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        )}

        {/* Render the chat input */}
        {selectedMember && (
          <div className="mt-6">
            <div className="flex items-center p-2 border-t bg-transparent">
              <input
                type="text"
                placeholder="Type a message..."
                className="font-Raleway flex-1 p-2 pl-4 outline-none rounded-full border border-gray-300 bg-transparent  focus:outline-none focus:border-gray-300 focus:ring-0  ring-0 "
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Send
                className="text-purple-500 hover:text-purple-600 ml-2 cursor-pointer"
                size={22}
                onClick={sendMessage}
              />
            </div>
          </div>
        )}
        {!selectedMember && <div></div>}
      </div>

      <div className="w-[1px] opacity-10 bg-slate-600"></div>
      <div className="w-1/3">
        <div className="flex flex-row m-4">
          <div className="font-Raleway text-[25px] grow text-[#202020]">
            Directory
          </div>
        </div>
        <div className="flex flex-row items-center m-4 gap-3">
          <div className="font-Raleway text-[20px] text-[#202020]">
            my teammates
          </div>
          <div className="flex flex-row w-5 h-5 items-center justify-center text-[#202020] text-[12px] rounded-full bg-slate-200">
            <div>{avatars.length}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {avatars.map((avatar) => (
            <div
              key={avatar.id} // Marouane Don't forget to include a unique key for each element in a loop
              className="cursor-pointer"
              onClick={() => setSelectedMember(avatar)}
            >
              <Member
                image={avatar.avatar_url}
                name={avatar.full_name}
                job={avatar.job}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
