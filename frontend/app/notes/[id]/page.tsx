"use client";
import { useEffect, useState } from "react";
import {
  deleteNote,
  fetchNoteById,
  updateNote,
} from "@/app/services/apiService";
import { Category, Note } from "@/app/services/types";
import { nunitoSans } from "@/app/utils/fontIndex";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaBoxArchive } from "react-icons/fa6";
import CategoriesButton from "../components/categoriesDropdown";

export default function Page({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null);
  const [loadingNote, setLoadingNote] = useState(true);
  const id = params.id;
  const numId = Number(id);
  const router = useRouter();

  useEffect(() => {
    const getNote = async () => {
      try {
        const fetchedNote = await fetchNoteById(numId);
        setNote(fetchedNote);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoadingNote(false);
      }
    };

    getNote();
  }, [numId]);

  const onSelectCategory = async (categoryId: number) => {
    if (!note) return;
    try {
      const updatedNote = await updateNote(numId, {
        categoryId,
      });
      setNote(updatedNote);
    } catch (error) {
      console.error("Error updating note category:", error);
    }
  };

  const removeNote = async () => {
    try {
      await deleteNote(numId);
      router.replace(`/`);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const archiveNote = async (currentArchiveState: boolean) => {
    if (!note) return;
    try {
      const updatedNote = await updateNote(numId, {
        archived: !currentArchiveState,
      });
      router.replace(`/`);
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  if (loadingNote) {
    return <div>Loading note...</div>;
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  const { title, description, archived, categoryId } = note;

  const buttonsUniversalClasses = "flex gap-2 p-2 text-2xl items-center";
  const iconsUniversalClasses = "text-2xl";

  return (
    <article
      className={`${nunitoSans.className} flex min-h-screen flex-col pl-14 sm:pl-72 py-24 pr-6 gap-24 w-full`}
    >
      <CategoriesButton
        onSelectCategory={onSelectCategory}
        initialCategory={categoryId}
      />
      <h1 className="text-4xl font-bold sm:text-7xl">{title}</h1>
      <p className="text-2xl sm:text-4xl max-w-prose break-words h-fit">
        {description}
      </p>
      <div className="w-full max-w-lg flex gap-10">
        <Link href={`../editNote/${id}`} className={buttonsUniversalClasses}>
          <FaEdit className={`${iconsUniversalClasses}`} /> Edit
        </Link>
        <button className={buttonsUniversalClasses} onClick={removeNote}>
          <MdDelete className={`${iconsUniversalClasses} text-red-600`} />
          Delete
        </button>
        <button
          className={buttonsUniversalClasses}
          onClick={() => archiveNote(note.archived)}
        >
          <FaBoxArchive className={iconsUniversalClasses} />
          {note.archived ? "Archive" : "Unarchive"}
        </button>
      </div>
    </article>
  );
}
