/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function LoadMoreBtn({ loadMoreImages, page, search }) {
  function handleClick() {
    page += 1;
    loadMoreImages(search, page);
  }
  return (
    <button type="button" onClick={handleClick}>
      Load more
    </button>
  );
}

export default LoadMoreBtn;
