"use client";
import { AiOutlineLoading } from "react-icons/ai";

const LoadingNote = () => {
  return (
    <div className="h-72 bg-cardsBackground ring-0 ring-headerText rounded-md w-56 flex flex-col items-center justify-center">
      <AiOutlineLoading className="text-subtitleText w-12 h-12 duration-300 transition-transform animate-spin" />
    </div>
  );
};
export default LoadingNote;
