import { v4 as uuidv4 } from "uuid";

let notes = [];

const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveNotes = (newNotes) => {
  localStorage.setItem("notes", JSON.stringify(newNotes));
};

const getNotes = () => {
  notes = loadNotes();
  return notes;
};

export { getNotes, saveNotes };
