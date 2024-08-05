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

  useEffect(() => {}, [page, query]);

  async function loadMoreImages(searchRequest, currentPage) {
    const res = await fetchImages(searchRequest, currentPage);
    setImages(prevImages => {
      return [...prevImages, res];
    });
  }

  async function getImages(searchRequest, currentPage) {
    try {
      setPage(1);
      setImages([]);
      setError(false);
      setLoader(true);
      const res = await fetchImages(searchRequest, currentPage);
      setImages(res);
    } catch (err) {
      setError(true);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <SearchBar
        onSearch={getImages}
        setSearch={setSearch}
        onQuery={setQuery}
      />

      <ImageGallery images={images} />
      {loader && (
        <div className="loader">
          <ColorRing className="loader" />
        </div>
      )}
      {error && <p>Internal server error</p>}
      {query && (
        <LoadMoreBtn
          loadMoreImages={loadMoreImages}
          page={page}
          search={search}
        />
      )}
    </>
  );
}

export default App;
