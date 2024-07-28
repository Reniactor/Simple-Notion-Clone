"use client";
import { useEffect, useState } from "react";
import { fetchNoteById } from "@/app/services/apiService";
import { Note } from "@/app/services/types";
import { nunitoSans } from "@/app/utils/fontIndex";
import EditNoteForm from "./components/editNoteForm";

export default function Page({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id;
  const numId = Number(id);

  useEffect(() => {
    const getNote = async () => {
      try {
        const fetchedNote = await fetchNoteById(numId);
        setNote(fetchedNote);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    getNote();
  }, [numId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  const { title, description, archived, categoryId } = note;

  return (
    <div
      className={`${nunitoSans.className} flex min-h-screen flex-col pl-14 pr-6 gap-24 w-full`}
    >
      <EditNoteForm
        id={numId}
        initialTitle={title}
        initialDescription={description}
        archived={archived}
      />
    </div>
  );
}
