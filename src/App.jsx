import { useEffect, useState } from 'react';
import './App.css';
import { fetchImages } from './components/image-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ColorRing } from 'react-loader-spinner';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
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
    async function loadMoreImages(searchRequest, currentPage) {
      try {
        const res = await fetchImages(searchRequest, currentPage);
        setImages(prevImages => {
          return [...prevImages, ...res.results];
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    if (!query) return;
    loadMoreImages(search, page);
  }, [page, query, search]);

  useEffect(() => {
    if (totalPages === page) {
      setShowBtn(false);
    }
  }, [totalPages, page]);
  async function searchImages(searchRequest, currentPage) {
    try {
      setPage(1);
      setImages([]);
      setError(false);
      setLoader(true);
      const res = await fetchImages(searchRequest, currentPage);
      setImages(res.results);
      setShowBtn(true);
      setTotalPages(res.total_pages);
    } catch (err) {
      setError(true);
    } finally {
      setLoader(false);
    }
  }
  // Modal.setAppElement(el);
  return (
    <>
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        imageModal={imageModal}
      />
      <SearchBar onSearch={searchImages} setSearch={setSearch} />

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
      {error && <p>Internal server error</p>}
      {showBtn && (
        <LoadMoreBtn
          // loadMoreImages={loadMoreImages}
          page={page}
          search={search}
          setPage={setPage}
          setQuery={setQuery}
          setLoader={setLoader}
        />
      )}
    </>
  );
}

export default App;
