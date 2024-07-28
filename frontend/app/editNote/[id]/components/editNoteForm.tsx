"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNote } from "@/app/services/apiService";

interface FormProps {
  id: number;
  initialTitle: string;
  initialDescription: string;
  archived: boolean;
}

const EditNoteForm: React.FC<FormProps> = ({
  id,
  initialTitle,
  initialDescription,
  archived,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateNote(id, { title, description, archived });
    router.replace(`/`);
  };

  const handleClearForm = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-screen flex-col pl-14 sm:pl-72 py-24 pr-6 gap-24 w-full"
    >
      <div className="flex flex-col w-full gap-4">
        <label htmlFor="title" className="text-4xl sm:text-6xl font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="text-2xl font-normal sm:text-3xl px-4 py-2 text-black max-w-4xl rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-4">
        <label
          htmlFor="description"
          className="text-2xl sm:text-3xl font-medium"
        >
          Description
        </label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-xl sm:text-2xl p-6 text-black max-w-4xl rounded-md"
        />
      </div>
      <div className="flex justify-between max-w-4xl">
        <button
          type="submit"
          className="px-12 py-2 bg-green-700 hover:bg-green-800 transition-colors duration-300 text-white rounded-md"
        >
          Save
        </button>
        <button
          onClick={handleClearForm}
          className="px-12 py-2 bg-red-700 hover:bg-red-800 transition-colors duration-300 text-white rounded-md"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default EditNoteForm;
