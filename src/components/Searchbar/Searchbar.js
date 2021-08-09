import { useState } from "react";

export default function App({ onSubmit }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim === "") {
      return;
    }
    onSubmit(search);
    reset();
  };

  const reset = () => {
    setSearch("");
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          value={search}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
