import { initializeEditPage, updateNote, removeNote } from "./views";

const noteId = location.hash.substring(1);
initializeEditPage(noteId);

// Event listeners
document.querySelector("#note-title").addEventListener("input", (e) => {
  updateNote(noteId, { title: e.target.value });
});

document.querySelector("#note-body").addEventListener("input", (e) => {
  updateNote(noteId, { body: e.target.value });
});

document.querySelector("#remove-note").addEventListener("click", () => {
  removeNote(noteId);
  location.assign("/index.html");
});
