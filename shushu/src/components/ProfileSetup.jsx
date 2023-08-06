import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { TextInput, FileInput, Label, Toast } from "flowbite-react";
import { DatePicker } from "antd";
import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProfileSetup() {
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      await supabase.auth.getUser().then((value) => {
        setUserId(value.data?.user.id);
      });
    };
    getUserData();
  }, [userId]);

  const [userInfos, setUserInfos] = useState({
    username: "",
    email: "",
    birthday: null,
  });

  const [avatarFile, setAvatarFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfos((prevUserInfos) => ({
      ...prevUserInfos,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!avatarFile) {
      console.error("Avatar file is missing");
      // Handle error (e.g., show a message to the user)
      return;
    }

    try {
      const { data: avatarData, error: avatarError } = await supabase.storage
        .from("avatars")
        .upload(`${userId}/${avatarFile.name}`, avatarFile);

      if (avatarError) {
        throw avatarError;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .upsert([
          {
            id: userId,
            username: userInfos.username,
            full_name: userInfos.username,
            avatar_url: avatarData.Key, // Assuming avatar_url is a field in your table
            // Add other user fields here
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
    <div className="m-auto flex flex-col gap-6 justify-center items-start w-[20rem] mt-[3rem]">
      <Toast className="m-auto justify-center items-center">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          <Flame className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          Account Successfully Created!
        </div>
        <Toast.Toggle />
      </Toast>
      <div className="w-[320px]">
        <div className="mb-2 block">
          <Label value="Username" />
        </div>
        <TextInput
          addon="@"
          id="username"
          name="username"
          placeholder="Full Name"
          value={userInfos.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="w-[320px]">
        <div className="mb-2 block">
          <Label value="Email" />
        </div>
        <TextInput
          addon="@"
          id="email"
          name="email"
          placeholder="Confirm Email"
          value={userInfos.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Birthday" />
        </div>
        <DatePicker
          className="w-[320px] p-2"
          name="birthday"
          value={userInfos.birthday}
          onChange={(date) =>
            setUserInfos((prevUserInfos) => ({
              ...prevUserInfos,
              birthday: date,
            }))
          }
        />
        <div className="w-[320px]" id="fileUpload">
          <div className="mb-2 block">
            <Label value="Upload file" />
          </div>
          <FileInput
            helperText="A profile picture is useful!"
            id="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-[320px] p-3 rounded-lg bg-black text-[#FFFFFF] text-xl hover:bg-slate-900"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
