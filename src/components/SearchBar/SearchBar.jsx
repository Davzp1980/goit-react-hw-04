/* eslint-disable react/prop-types */
import css from './SearchBar.module.css';
function SearchBar({ onSearch, setSearch, onQuery }) {
  function handleSubmit(e) {
    e.preventDefault();
    setSearch(e.target.searchData.value);
    onSearch(e.target.searchData.value);
    onQuery(true);
  }
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="searchData"
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
