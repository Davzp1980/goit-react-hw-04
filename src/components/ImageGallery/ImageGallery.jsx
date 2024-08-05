/* eslint-disable react/prop-types */
import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
function ImageGallery({ images, setImageUrl, openModal }) {
  return (
    <ul className={css.ul}>
      {images.map(image => (
        <li key={image.id} className={css.li}>
          <ImageCard
            image={image}
            setImageUrl={setImageUrl}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
