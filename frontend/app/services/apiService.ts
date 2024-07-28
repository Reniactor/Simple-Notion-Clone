import type { Note, Category } from "./types";

const API_BASE_URL = "http://localhost:3001";

//Notes CRUD operations
export const fetchNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    cache: "no-cache",
  });
  return response.json();
};

export const fetchActiveNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/notes/posted`, {
    cache: "no-cache",
  });
  return response.json();
};

export const fetchArchivedNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/notes/archived`, {
    cache: "no-cache",
  });
  return response.json();
};

export const fetchNoteById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    headers: {
      "Cache-control": "no-store",
    },
  });
  return response.json();
};

export const createNote = async (note: Note) => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateNote = async (id: number, note: Partial<Note>) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const deleteNote = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

//Categories CRUD operations
export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

export const fetchCategoryById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    headers: {
      "Cache-control": "no-store",
    },
  });
  return response.json();
};

export const createCategory = async (category: Category) => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateCategory = async (id: number, category: Category) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteCategory = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
