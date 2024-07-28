"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Note, Category } from "@/app/services/types";
import CreateNewNoteCard from "./notesComponents/createNewNoteCard";
import NoteCard from "./notesComponents/noteCard";
import NoteModal from "./notesComponents/noteModal";
import {
  createNote,
  deleteNote,
  fetchCategories,
  fetchNotes,
  updateNote,
} from "@/app/services/apiService";
import LoadingNote from "./notesComponents/loadingNote";
import CategoryFilterButton from "./notesComponents/categoryFilterButton";

const NotesContainer = () => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNotesLoading, setIsNotesLoading] = useState(true);
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [notes, setNotes] = useState<Note[] | null>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    const getNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
      setFilteredNotes(data); // Initialize filteredNotes with all notes
      setIsNotesLoading(false);
    };

    getCategories();
    getNotes();
  }, []);

  useEffect(() => {
    const filter = searchParams.get("filter");
    console.log(filter);
    filterNotes(filter);
  }, [searchParams, notes]);

  const filterNotes = (filter: string | null) => {
    if (!notes) return;

    let filtered = notes;
    if (filter === "active") {
      filtered = notes.filter((note) => note.archived);
    } else if (filter === "archived") {
      filtered = notes.filter((note) => !note.archived);
    }
    setFilteredNotes(filtered);
  };

  const filterNotesByCategory = (categoryId: number | null) => {
    if (categoryId === null) {
      setFilteredNotes(notes);
    } else {
      const filtered = notes?.filter((note) => note.categoryId === categoryId);
      setFilteredNotes(filtered || []);
    }
  };

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    filterNotesByCategory(categoryId);
  };

  return (
    <section className="relative flex gap-2 w-fit max-w-7xl">
      <div className="flex flex-wrap w-full gap-4">
        <CreateNewNoteCard setIsNoteModalOpen={setIsNoteModalOpen} />
        {!isNotesLoading &&
          filteredNotes?.map((note) => {
            const { id, title, description, archived } = note;
            return (
              <NoteCard
                key={id}
                id={id!}
                title={title}
                parragraph={description}
              />
            );
          })}
        {isNotesLoading && <LoadingNote />}
        {isNoteModalOpen && (
          <NoteModal
            isNoteModalOpen={isNoteModalOpen}
            setIsNoteModalOpen={setIsNoteModalOpen}
          />
        )}
      </div>
      <CategoryFilterButton onFilterByCategory={handleSelectCategory} />
    </section>
  );
};

export default NotesContainer;
