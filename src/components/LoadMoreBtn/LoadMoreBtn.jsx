/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import css from './LoadMoreBtn.module.css';
function LoadMoreBtn({ page, setPage, setQuery, setLoader }) {
  function handleClick() {
    setPage(page + 1);
    setQuery(true);
    setLoader(true);
    // loadMoreImages(search, page);
  }
  return (
    <div className={css.div}>
      <button className={css.btn} type="button" onClick={handleClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;
