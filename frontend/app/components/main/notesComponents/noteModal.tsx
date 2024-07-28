import React, { useEffect, useRef, useState } from "react";

interface NoteModalProps {
  isNoteModalOpen: boolean;
  setIsNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormState {
  title: string;
  parragraph: string;
}

const NoteModal: React.FC<NoteModalProps> = ({
  isNoteModalOpen,
  setIsNoteModalOpen,
}) => {
  //Modal display state handling
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsNoteModalOpen(false);
    }
  };

  useEffect(() => {
    if (isNoteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNoteModalOpen]);

  const closeDialog = () => {
    setIsNoteModalOpen(false);
  };

  //Form state handling
  const [form, setForm] = useState<FormState>({
    title: "",
    parragraph: "",
  });

  const emptyForm = {
    title: "",
    parragraph: "",
  };
  const clearForm = () => {
    setForm(emptyForm);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    return;
  };

  return (
    <div
      role="dialog"
      aria-labelledby="dialogTitle"
      aria-describedby="dialogDescription"
      aria-modal="true"
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ${
        isNoteModalOpen ? "opacity-100" : "opacity-0"
      } pointer-events-${isNoteModalOpen ? "auto" : "none"}`}
      tabIndex={-1}
    >
      <div
        className="relative flex h-fit w-72 justify-center rounded-md bg-cardsBackground shadow-lg"
        ref={modalRef}
      >
        <button
          aria-label="Close dialog button"
          className="absolute right-2 top-2 text-subtitleText hover:text-gray-500 duration-300 transition-colors"
          onClick={closeDialog}
        >
          &times;
        </button>
        <div className="w-full py-4">
          <form className="flex flex-col items-center gap-10 p-8">
            <div>
              <label htmlFor="title" className="text-xl w-full font-bold">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="rounded-sm w-full text-mainBackground p-1 bg-headerText"
                placeholder="Title..."
              />
            </div>
            <div>
              <label htmlFor="parragraph" className="text-xl w-full font-bold">
                Content
              </label>
              <textarea
                name="parragraph"
                value={form.parragraph}
                onChange={handleInputChange}
                className="rounded-sm w-full text-mainBackground p-2 bg-headerText"
                placeholder="Content..."
              />
            </div>
            <div className="flex justify-between w-full">
              <button
                type="submit"
                className="text-headerText bg-green-800 hover:text-subtitleText hover:bg-green-700 py-1 px-6 rounded-sm font-medium"
              >
                save
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="text-headerText bg-red-900 hover:text-subtitleText hover:bg-red-700 py-1 px-6 rounded-sm font-medium"
              >
                clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
