"use client";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

const CreateNewNoteCard = ({
  setIsNoteModalOpen,
}: {
  setIsNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Link
      href={`/createNote`}
      className="h-72 bg-transparent ring-1 ring-headerText hover:ring-subtitleText transition-all rounded-md w-56 flex flex-col items-center justify-center text-headerText duration-300 hover:cursor-pointer hover:text-subtitleText"
    >
      <CiCirclePlus className="w-12 h-12 " />
    </Link>
  );
};
export default CreateNewNoteCard;
