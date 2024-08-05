/* eslint-disable react/prop-types */
import css from './ImageCard.module.css';

function ImageCard({ image, setImageUrl, openModal }) {
  function handleClick() {
    setImageUrl({
      url: image.urls.full,
      alt: image.alt_description,
    });
    openModal();
  }

  return (
    <div className={css.div} onClick={handleClick}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}

export default ImageCard;
//image.urls.regular
