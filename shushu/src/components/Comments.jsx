/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { supabase } from "../Client/supabaseClient";
import { useEffect, useState } from "react";

export function Comment(props) {
  const [authorInfos, setAuthorInfos] = useState();

  useEffect(() => {
    const retrieveAvatar = async () => {
      try {
        // Get the public URL of the avatar image from Supabase storage
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", props.comment_author)
          .single();
        setAuthorInfos(data);
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Error retrieving avatar:", error);
      }
    };

    retrieveAvatar();
  }, []);

  return (
    <div className="flex flex-col gap-2 font-Raleway text-[14px] text-[#202020]">
      {authorInfos ? (
        <div className="flex flex-row gap-3 items-center">
          <img
            src={authorInfos?.avatar_url}
            className="w-7 h-7 rounded-full"
            alt="Author Avatar"
          />
          <div className="grow font-Raleway text-[15px] font-medium text-[#202020]">
            {authorInfos?.full_name}
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
      ) : (
        // Show loading state or nothing
        <p>Loading...</p>
      )}
      <div>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
