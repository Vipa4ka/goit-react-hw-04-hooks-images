import React, { Component } from "react";

import imagesApi from "./service/news-api";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoaderGallery from "./components/Loader";
import Button from "./components/Button";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    hits: [],
    search: "",
    loading: false,
    error: null,
    currentPage: 1,
    currentPageHits: [],
    showModal: false,
    url: "",
    tag: "",
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.search;
    const nextName = this.state.search;
    if (prevName !== nextName) {
      this.fetchHits();
    }
  }

  addSearch = (search) => {
    this.setState({
      search: search,
      currentPage: 1,
      hits: [],
      error: null,
      url: "",
      tag: "",
    });
  };

  fetchHits = () => {
    const { search, currentPage } = this.state;
    const options = { search, currentPage };

    this.setState({ loading: true });

    imagesApi
      .fetchHits(options)
      .then((hits) => {
        this.setState((prevState) => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
          currentPageHits: [...hits],
        }));

        if (hits.length === 0) {
          this.setState({
            error: `No data on your request "${search}"`,
          });
        }
      })

      .catch((error) => this.setState({ error: error.message }))
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  bigImage = ({ target }) => {
    if (target.nodeName !== "IMG") {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    this.setState({
      url,
      tag,
      loading: false,
    });
    this.toggleModal();
  };

  render() {
    const { error, loading, hits, currentPageHits, showModal, url, tag } =
      this.state;
    const renderLoadMore = !(currentPageHits.length < 12) && !loading;
    return (
      <>
        <Searchbar onSubmit={this.addSearch} />
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

        <ImageGallery hits={hits} onClick={this.bigImage} />

        {loading && <LoaderGallery />}

        {renderLoadMore && <Button onFetchHits={this.fetchHits} />}

        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.bigImage}>
            <img src={url} alt={tag} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
