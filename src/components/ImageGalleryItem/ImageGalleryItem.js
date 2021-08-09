import PropTypes from "prop-types";

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => (
  <li className="ImageGalleryItem">
    <img
      className="ImageGalleryItem-image"
      src={webformatURL}
      data-url={largeImageURL}
      alt={tags}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
