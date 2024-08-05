/* eslint-disable react/prop-types */
import { useState } from 'react';
import css from './SearchBar.module.css';
function SearchBar({ onSearch, setSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    setSearch(e.target.searchData.value);
    onSearch(e.target.searchData.value);
    setInputValue('');
  }

  const [inputValue, setInputValue] = useState('');
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="searchData"
          placeholder="Search images and photos"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className={css.btn}
          disabled={!inputValue && true}
          type="submit"
        >
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
