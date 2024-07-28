import { Category } from "@/app/services/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NoteCard = ({
  id,
  title,
  parragraph,
  category,
}: {
  id: number;
  title: string;
  parragraph: string;
  category?: Category;
}) => {
  const router = useRouter();

  return (
    <Link
      aria-labelledby="title"
      className="h-72 bg-cardsBackground hover:bg-sidebarBackground transition-colors duration-300 rounded-md w-56 flex flex-col items-center gap-12 p-6"
      href={`notes/${id}`}
    >
      <h1
        id="title"
        className="text-2xl font-bold text-headerText max-w-48 truncate"
      >
        {title}
      </h1>
      <p className="text-sm text-headerText h-40 w-full break-words line-clamp-1">
        {parragraph}
      </p>
    </Link>
  );
};
export default NoteCard;
