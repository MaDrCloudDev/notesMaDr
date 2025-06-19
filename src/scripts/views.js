import { v4 as uuidv4 } from "uuid";
import { getNotes, saveNotes } from "./notes";
import { getFilters } from "./filters";

const renderNotes = () => {
  const notes = getNotes();
  const { searchText, sortBy } = getFilters();
  const notesEl = document.querySelector("#notes");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  filteredNotes.sort((a, b) => {
    if (sortBy === "byEdited") {
      return b.updatedAt > a.updatedAt ? 1 : -1;
    } else if (sortBy === "byCreated") {
      return b.createdAt > a.createdAt ? 1 : -1;
    } else if (sortBy === "alphabetical") {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    }
  });

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

const createNote = () => {
  const id = uuidv4();
  const notes = getNotes();
  const timestamp = new Date().getTime();

  notes.push({
    id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes(notes);
  return id;
};

const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  statusEl.textContent = new Date(note.updatedAt).toLocaleString();
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

const initializeEditPage = (noteId) => {
  const titleElement = document.querySelector("#note-title");
  const bodyElement = document.querySelector("#note-body");
  const dateElement = document.querySelector("#last-edited");
  const notes = getNotes();
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    location.assign("/index.html");
  }

  titleElement.value = note.title;
  bodyElement.value = note.body;
  dateElement.textContent = `Last edited: ${new Date(
    note.updatedAt
  ).toLocaleString()}`;
};

const updateNote = (id, updates) => {
  const notes = getNotes();
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return;
  }

  if (typeof updates.title === "string") {
    note.title = updates.title;
    note.updatedAt = new Date().getTime();
  }

  if (typeof updates.body === "string") {
    note.body = updates.body;
    note.updatedAt = new Date().getTime();
  }

  saveNotes(notes);
  return note;
};

const removeNote = (id) => {
  const notes = getNotes();
  const notesToKeep = notes.filter((note) => note.id !== id);
  saveNotes(notesToKeep);
};

export { createNote, renderNotes, initializeEditPage, updateNote, removeNote };
