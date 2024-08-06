import { useEffect, useState } from 'react';
import './App.css';
import { fetchImages } from './components/image-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ColorRing } from 'react-loader-spinner';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [imageModal, setImageUrl] = useState({
    url: '',
    alt: '',
  });

  const [modalIsOpen, setIsOpen] = useState(false);

  const errorMessage = () => {
    toast('Internal server error', {
      duration: 4000,
      position: 'top-left',
      style: {
        backgroundColor: 'red',
      },
    });
  };
  const blankSearchFieldMessage = () => {
    toast('The search field must be filled in', {
      duration: 4000,
      position: 'top-right',
      style: {
        backgroundColor: 'chartreuse',
      },
    });
  };
  const badSearchRequestMessage = () => {
    toast('No photos were found for your request', {
      duration: 4000,
      position: 'top-right',
      style: {
        backgroundColor: 'teal',
      },
    });
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (search === '') return;
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
