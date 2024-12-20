import Button from "../../components/ui/button";
import { Avatar } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { useAppContext } from "../context/appContext";

export function InputFile() {
  const { updateProfilePicture } = useAppContext();
  const [state, setState] = useState({ file: null, preview: "" });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setState({ file, preview });
  };
  // console.log(state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state?.file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("profileImg", state?.file);
    console.log(state);
    updateProfilePicture(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-60">
      <Label htmlFor="profilePicture">Upload Profile Picture</Label>

      <Input
        type="file"
        id="profilePicture"
        onChange={handleFileChange}
        className="p-2 border border-gray-300 rounded-md"
      />

      {state?.preview && (
        <Avatar
          src={state?.preview}
          alt="Profile Preview"
          className="w-20 h-20 rounded-full object-cover"
        />
      )}

      <Button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Update Profile Picture
      </Button>
    </form>
  );
}
