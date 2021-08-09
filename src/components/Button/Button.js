import { useEffect } from "react";
import PropTypes from "prop-types";

export default function Button({ onFetchHits }) {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <button type="button" className="Button" onClick={onFetchHits}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onFetchHits: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
