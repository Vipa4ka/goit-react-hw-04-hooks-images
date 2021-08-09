import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "21917669-1fedcfe337ac78c8906ac8c38";

const fetchHits = async ({ search = "", currentPage = 1 }) => {
  return axios
    .get(
      `?q=${search}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
};

const imagesApi = { fetchHits };
export default imagesApi;
