import storage from './localStorage';
import { getTrendingMovies, getSearchMovie } from '../servises/api';
import { renderMoviesMarkup } from '../components/movie-markup';
import { toggleLoader } from './loader';

class PaginationServiсe {
  isTrandingMovies = true;
  searchQuery = null;
  #page = 1;
  #totalPage = null;

  renderMoviesByPage(query = null) {
    if (!query && this.searchQuery && !this.isTrandingMovies) {
      console.log('!query && !this.isTrandingMovies');
      this.page = 1;
      this.isTrandingMovies = true;
      this.searchQuery = null;
      this.renderMovies(getTrendingMovies);
      return;
    }

    if (query && this.searchQuery !== query) {
      console.log('query && this.searchQuery !== query');
      this.isTrandingMovies = false;
      this.page = 1;
      this.searchQuery = query;
      this.renderMovies(getSearchMovie);
      return;
    }

    if (this.isTrandingMovies) {
      console.log('this.isTrandingMovies');
      this.renderMovies(getTrendingMovies);
      return;
    }

    this.renderMovies(getSearchMovie);

    // if (this.#totalPage > 1) {

    // }
  }

  async renderMovies(callcback) {
    try {
      toggleLoader();

      const { page, results, total_pages } = await callcback(
        this.#page,
        this.searchQuery
      );

      this.totalPage = total_pages;
      renderMoviesMarkup(results);
    } catch (error) {
      console.log(error);
    }
    toggleLoader();
  }

  onChangePaginationCount(e) {
    this.renderMoviesByPage();
  }

  setDataMovies(page, total_pages) {
    this.page = page;
    this.totalPage = total_pages;
  }

  set page(pageMovie = 1) {
    this.#page = pageMovie;
  }

  get page() {
    return this.#page;
  }

  set totalPage(pages) {
    this.#totalPage = pages;
  }

  get totalPage() {
    return this.#totalPage;
  }
}

export default PaginationServiсe;
