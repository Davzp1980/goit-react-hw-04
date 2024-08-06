/* eslint-disable react/prop-types */
import { useState } from 'react';
import css from './SearchBar.module.css';
function SearchBar({ searchImages, blankSearchFieldMessage }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (e.target.searchData.value === '') {
      blankSearchFieldMessage();
      return;
    }
    searchImages(e.target.searchData.value);
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
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
