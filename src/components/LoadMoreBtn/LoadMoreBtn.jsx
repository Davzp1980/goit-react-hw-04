import css from './LoadMoreBtn.module.css';
function LoadMoreBtn({ onLoadMoreBtn }) {
  return (
    <div className={css.div}>
      <button className={css.btn} type="button" onClick={onLoadMoreBtn}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;
