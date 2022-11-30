import storage from './localStorage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';
import {
  WEB_LOCAL_WATCHED,
  WEB_LOCAL_QUEUE,
  LIST_WATCHED,
  LIST_QUEUE,
} from '../servises/constants';
import { getTrendingMovies, getSearchMovie } from '../servises/api';
import {
  renderMoviesMarkup,
  clearGallery,
  renderMoviesLibrary,
} from '../components/movie-markup';
import { toggleLoader } from './loader';

const takeDataWatchedMovies = () => storage.get(WEB_LOCAL_WATCHED) || [];
const takeDataQueueMovies = () => storage.get(WEB_LOCAL_QUEUE) || [];

class PaginationServiсe {
  isTrandingMovies = true;
  searchQuery = null;
  #page = 1;
  #totalPage = null;

  perPage = 20;
  currentList = null;

  renderMoviesByPage(query = null) {
    if (this.currentList === LIST_WATCHED) {
      this.isTrandingMovies = false;
      this.searchQuery = null;
      this.renderMoviesMyLibraryLs(takeDataWatchedMovies);
      return;
    }

    if (this.currentList === LIST_QUEUE) {
      this.isTrandingMovies = false;
      this.searchQuery = null;
      this.renderMoviesMyLibraryLs(takeDataQueueMovies);
      return;
    }

    if (!query && !this.isTrandingMovies && !this.searchQuery) {
      this.page = 1;
      this.isTrandingMovies = true;
      this.searchQuery = null;
      this.currentList = null;
      this.renderMovies(getTrendingMovies);
      return;
    }

    if (query && this.searchQuery !== query) {
      this.isTrandingMovies = false;
      this.page = 1;
      this.searchQuery = query;
      this.currentList = null;
      this.renderMovies(getSearchMovie);
      return;
    }

    if (this.isTrandingMovies) {
      this.currentList = null;
      this.renderMovies(getTrendingMovies);
      return;
    }

    this.renderMovies(getSearchMovie);
  }

  async renderMovies(callcback) {
    try {
      toggleLoader();

      const { page, results, total_pages, total_results } = await callcback(
        this.#page,
        this.searchQuery
      );

      if (!total_results) {
        refs.searchForm.elements.query.value = '';
        clearGallery();
        toggleLoader();
        return;
      }

      this.totalPage = total_pages;

      renderMoviesMarkup(results);

      if (total_pages === 1) {
        refs.pagination.classList.add('pagination--no-result');
        refs.sectionMovies.classList.add('movies--no-result-one-page');
      } else {
        refs.pagination.classList.remove('pagination--no-result');
        refs.sectionMovies.classList.remove('movies--no-result-one-page');
      }

      total_pages > 1 && this.renderNumberPag(page, total_pages);
    } catch (error) {
      console.log(error);
      Notify.failure('Something went wrong');
      clearGallery();
    }

    toggleLoader();
  }

  renderMoviesMyLibraryLs(callcack) {
    toggleLoader();

    const dataMovies = callcack();

    if (!dataMovies.length) {
      this.resetData();
      clearGallery();
      toggleLoader();
      return;
    }
    this.totalPage = Math.ceil(dataMovies.length / this.perPage);

    if (this.totalPage < this.page || this.page <= 0) {
      return;
    }

    const dataForRender = dataMovies.slice(
      this.perPage * this.#page - this.perPage,
      this.perPage * this.#page
    );

    renderMoviesLibrary(dataForRender);

    if (this.totalPage === 1) {
      refs.pagination.classList.add('pagination--no-result');
      refs.sectionMovies.classList.add('movies--no-result-one-page');
    } else {
      refs.pagination.classList.remove('pagination--no-result');
      refs.sectionMovies.classList.remove('movies--no-result-one-page');
    }

    this.totalPage > 1 && this.renderNumberPag(this.page, this.totalPage);
    toggleLoader();
  }

  renderNumberPag(currentPage, maxPage) {
    const isMobile = window.innerWidth < 768;
    let markup = [];

    if ((maxPage <= 5 && isMobile) || (maxPage <= 5 && !isMobile)) {
      for (let i = 1; i <= maxPage; i++) {
        markup.push(this.getBtnPaginationHtml(i, i === currentPage));
      }
      refs.paginationList.innerHTML = markup.join('');
      return;
    }

    const leftItemsLength = currentPage - 1;
    const rightItemsLength = maxPage - currentPage;

    let leftItems = 2;
    let rightItems = 2;

    if (leftItemsLength < 2) {
      leftItems = leftItemsLength;
      rightItems += 2 - leftItemsLength;
    } else if (leftItemsLength < 5 && !isMobile) {
      leftItems = leftItemsLength;
      rightItems += 5 - leftItemsLength - 1;
    }
    if (rightItemsLength < 2) {
      rightItems = rightItemsLength;
      leftItems += 2 - rightItemsLength;
    } else if (rightItemsLength < 5 && !isMobile) {
      rightItems = rightItemsLength;
      leftItems += 5 - rightItemsLength - 1;
    }

    if (leftItemsLength > 4 && !isMobile) {
      markup.push(this.getBtnPaginationHtml(1));
      markup.push(this.getBtnPaginationHtml('...', false, 'left'));
    }
    for (let i = leftItems; i >= 0; i--) {
      markup.push(
        this.getBtnPaginationHtml(
          currentPage - i,
          currentPage - i === currentPage
        )
      );
    }

    for (let i = 1; i <= rightItems; i++) {
      markup.push(this.getBtnPaginationHtml(+currentPage + i));
    }

    if (rightItemsLength > 4 && !isMobile) {
      markup.push(this.getBtnPaginationHtml('...', false, 'rigth'));
      markup.push(this.getBtnPaginationHtml(maxPage));
    }

    refs.paginationList.innerHTML = markup.join('');
  }

  getBtnPaginationHtml(value, isActive = false, dataValue) {
    return `<li class="pagination__item ${
      dataValue ? 'pagination__item--dote' : ''
    }">
  <button class="${isActive ? 'pagination__button--active' : ''} ${
      dataValue ? 'pagination__button--dote' : ''
    }" data-page="${dataValue || value}" type="button">${value}</button>
  </li>`;
  }

  changePage(page) {
    if (page <= 0) return;
    if (page === 1) {
      refs.prevBtnPAgination.disabled = true;
    } else if (refs.prevBtnPAgination.disabled) {
      refs.prevBtnPAgination.disabled = false;
    }

    if (page === this.totalPage || page >= this.totalPage) {
      refs.nextBtnPAgination.disabled = true;
    } else if (refs.nextBtnPAgination.disabled) {
      refs.nextBtnPAgination.disabled = false;
    }

    this.#page = page;
  }

  resetData() {
    this.perPage = 20;
    this.#page = 1;
    this.totalPage = null;
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
