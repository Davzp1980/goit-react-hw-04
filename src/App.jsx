import { useEffect, useState } from 'react';
import './App.css';
import { fetchImages } from './components/image-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ColorRing } from 'react-loader-spinner';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    console.log(page);
    console.log(page);
    async function loadMoreImages(searchRequest, currentPage) {
      const res = await fetchImages(searchRequest, currentPage);
      setImages(prevImages => {
        return [...prevImages, res];
      });
    }
    if (!query) return;
    loadMoreImages(search, page);
  }, [page, query, search]);

  async function searchImages(searchRequest, currentPage) {
    try {
      setPage(1);
      setImages([]);
      setError(false);
      setLoader(true);
      const res = await fetchImages(searchRequest, currentPage);
      setImages(res);
      setShowBtn(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <SearchBar
        onSearch={searchImages}
        setSearch={setSearch}
        setShowBtn={setShowBtn}
      />

      <ImageGallery images={images} />
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
        />
      )}
    </>
  );
}

export default App;
