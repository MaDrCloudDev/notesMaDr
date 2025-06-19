import { createNote, renderNotes } from "./views";
import { setFilters } from "./filters";

renderNotes();

// Event listeners
document.querySelector("#create-note").addEventListener("click", () => {
  const id = createNote();
  location.assign(`/edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({ searchText: e.target.value });
  renderNotes();
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  setFilters({ sortBy: e.target.value });
  renderNotes();
});
