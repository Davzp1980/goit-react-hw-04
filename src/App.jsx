import { useEffect, useState } from 'react';
import './App.css';
import { fetchImages } from './components/image-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ColorRing } from 'react-loader-spinner';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { Toaster } from 'react-hot-toast';
import {
  errorMessage,
  badSearchRequestMessage,
  blankSearchFieldMessage,
} from './components/helpers/messages';

function App() {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [imageModal, setImageUrl] = useState({
    url: '',
    alt: '',
  });

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (search === null) return;
    async function loadImages(searchRequest, currentPage) {
      setLoader(true);
      try {
        const res = await fetchImages(searchRequest, currentPage);
        setImages(prevImages => {
          return [...prevImages, ...res.results];
        });

        setTotalPages(res.total_pages);
        if (res.total_pages === 0) {
          badSearchRequestMessage();
          return;
        }

        setShowBtn(true);
      } catch (err) {
        errorMessage();
      } finally {
        setLoader(false);
      }
    }

    loadImages(search, page);
  }, [page, search]);

  useEffect(() => {
    if (totalPages === page) {
      setShowBtn(false);
    }
  }, [totalPages, page]);

  async function searchImages(searchRequest) {
    setPage(1);
    setImages([]);

    setSearch(searchRequest);
  }
  function onLoadMoreBtn() {
    setPage(page + 1);
  }
  return (
    <>
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        imageModal={imageModal}
      />
      <SearchBar
        searchImages={searchImages}
        blankSearchFieldMessage={blankSearchFieldMessage}
      />

      <ImageGallery
        images={images}
        setImageUrl={setImageUrl}
        openModal={openModal}
      />
      {loader && (
        <div className="loader">
          <ColorRing className="loader" />
        </div>
      )}

      {showBtn && <LoadMoreBtn onLoadMoreBtn={onLoadMoreBtn} />}
      <Toaster />
    </>
  );
}

export default App;
