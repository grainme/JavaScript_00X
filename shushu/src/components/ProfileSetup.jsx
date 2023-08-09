/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { TextInput, FileInput, Label, Toast } from "flowbite-react";
import { Flame, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function ProfileSetup() {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [Avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);
  const [jobName, setJobName] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [CheckProfileImage, setCheckProfileImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(user?.id);

  const CDNURL =
    "https://fanrwzurfpvlbhywhamg.supabase.co/storage/v1/object/public/avatars/";

  const getAvatars = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(user?.id + "/", {
        limit: 1,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    if (data !== null) {
      console.log("DATA : ", data);
      setAvatar(data);
    } else {
      console.log("Error : " + error);
    }
  };

  const handleAvatarUpload = async (e) => {
    setLoading(true); // Start loading
    setSuccess(false); // Reset success

    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(user?.id + "/" + uuidv4(), file);

    if (data) {
      getAvatars();
      setSubmitted(true);
      setLoading(false); // Upload complete, stop loading
      setSuccess(true); // Set success
    } else {
      console.log(error);
      setLoading(false); // Upload failed, stop loading
    }
  };

  const handleFormSubmit = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .upsert([
          {
            id: user.id,
            username: username,
            full_name: fullName,
            job: jobName,
            avatar_url: CDNURL + user.id + "/" + Avatar[0]?.name,
          },
        ]);

      if (profileError) {
        throw profileError;
      }

      console.log("Profile data inserted successfully:", profileData);

      // Handle success, show a toast, or redirect the user
      navigate("/work");
    } catch (error) {
      console.error("Error inserting profile data:", error);
      // Handle error
    }
  };

  return (
    <div className="m-auto flex flex-col gap-6 justify-center items-start w-[40rem] mt-[3rem]">
      <div>
        <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
          <li className="flex items-center text-purple-600 dark:text-purple-500 space-x-2.5">
            <span className="flex items-center justify-center w-8 h-8 border border-purple-600 rounded-full shrink-0 dark:border-purple-500">
              1
            </span>
            <span>
              <h3 className="font-medium leading-tight">Sign Up</h3>
              <p className="text-sm">Custom or Providers</p>
            </span>
          </li>
          <li className="flex items-center text-purple-600 dark:text-purple-500 space-x-2.5">
            <span className="flex items-center justify-center w-8 h-8 border border-purple-600 rounded-full shrink-0 dark:border-purple-500">
              2
            </span>
            <span>
              <h3 className="font-medium leading-tight">Profile Setup</h3>
              <p className="text-sm">Setting up Profile Details</p>
            </span>
          </li>
          <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
            </span>
            <span>
              <h3 className="font-medium leading-tight">Welcome!</h3>
              <p className="text-sm">Enjoy PomodoroKai</p>
            </span>
          </li>
        </ol>
      </div>
      <div className="w-[40rem]">
        <div className="mb-2 block">
          <Label value="Username" />
        </div>
        <TextInput
          addon="@"
          id="username"
          name="username"
          placeholder="Username"
          value={username || ""}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
      </div>
      <div className="w-[40rem]">
        <div className="mb-2 block">
          <Label value="Full Name" />
        </div>
        <TextInput
          addon="@"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={fullName || ""}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          required
        />
      </div>
      <div className="w-[40rem]">
        <div className="mb-2 block">
          <Label value="Job Position" />
        </div>
        <TextInput
          addon="@"
          id="job"
          name="job"
          placeholder="Job Position - eg: Hacker :)"
          value={jobName || ""}
          onChange={(e) => {
            setJobName(e.target.value);
          }}
          required
        />
      </div>
      <div className="w-[40rem]">
        <div className="mb-2 block">
          <Label value="Email" />
        </div>
        <TextInput
          addon="@"
          id="email"
          name="email"
          placeholder="Confirm Email"
          value={user?.email}
          required
        />
      </div>
      <div>
        <div className="w-[40rem] flex flex-col gap-1" id="fileUpload">
          <div className="mb-2 block">
            <Label value="Profile Avatar" />
          </div>
          <FileInput id="file" onChange={handleAvatarUpload} />
          {loading && (
            <div className="fixed bottom-0 right-0 p-4">
              {" "}
              <Toast className="m-auto justify-center items-center">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-200 text-purple-500 ">
                  <Loader className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Uploading...</div>
                <Toast.Toggle />
              </Toast>
            </div>
          )}
          {success && (
            <div className="fixed bottom-0 right-0 p-4">
              {" "}
              <Toast className="m-auto justify-center items-center">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-200 text-purple-500 ">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  gg photo uploaded!
                </div>
                <Toast.Toggle />
              </Toast>
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleFormSubmit}
        className="w-[40rem] p-3 rounded-lg bg-black text-[#FFFFFF] text-xl hover:bg-slate-900"
      >
        Submit
      </button>
    </div>
  );
}
