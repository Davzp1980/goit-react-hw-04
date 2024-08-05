/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function LoadMoreBtn({ loadMoreImages, page, search, setPage, setQuery }) {
  function handleClick() {
    setPage(page + 1);
    setQuery(true);
    // loadMoreImages(search, page);
  }
  return (
    <button type="button" onClick={handleClick}>
      Load more
    </button>
  );
}

export default LoadMoreBtn;
