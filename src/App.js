import { useState, useEffect } from "react";
import imagesApi from "./service/news-api";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoaderGallery from "./components/Loader";
import Button from "./components/Button";
import Modal from "./components/Modal";

export default function App() {
  const [hits, setHits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageHits, setCurrentPageHits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");

  const renderLoadMore = !(currentPageHits.length < 12) && !loading;

  useEffect(() => {
    if (search === "") {
      return;
    }
    fetchHits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchHits = () => {
    setLoading(true);
    const options = { search, currentPage };

    imagesApi
      .findFetchHits(options)
      .then((hits) => {
        setHits((prevHits) => [...prevHits, ...hits]);
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        setCurrentPageHits([...hits]);

        if (hits.length === 0) {
          setError(`No data on your request "${search}"`);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const addSearch = (search) => {
    setSearch(search);
    setCurrentPage(1);
    setHits([]);
    setError(null);
    setUrl("");
    setTag("");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const bigImage = ({ target }) => {
    if (target.nodeName !== "IMG") {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    setUrl(url);
    setTag(tag);
    setLoading(false);
    toggleModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={addSearch} />
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <ImageGallery hits={hits} onClick={bigImage} />

      {loading && <LoaderGallery />}

      {renderLoadMore && <Button onFetchHits={fetchHits} />}

      {showModal && (
        <Modal onClose={toggleModal} onClick={bigImage}>
          <img src={url} alt={tag} />
        </Modal>
      )}
    </>
  );
}
