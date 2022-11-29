import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './servises/refs';
import PaginationServiсe from './servises/pagination';
import throttle from 'lodash.throttle';

const pagination = new PaginationServiсe();

window.addEventListener(
  'resize',
  throttle(e => {
    if (window.innerWidth < 768) {
      pagination.renderNumberPag(pagination.page, pagination.totalPage);
    }
  }, 250)
);

pagination.renderMoviesByPage();

const resetForTrandingMovies = () => {
  refs.searchForm.elements.query.value = '';
  pagination.page = 1;
  pagination.searchQuery = null;
};

const renderMoviesByChangePage = page => {
  if (page === pagination.page) return;
  pagination.changePage(page);
  pagination.renderMoviesByPage();
};

const onChangePageAndRendereMovies = e => {
  const page = +e.target.dataset.page;

  page &&
    page <= pagination.totalPage &&
    page !== pagination.page &&
    renderMoviesByChangePage(page);
};

const onSearchMoviesByQuery = e => {
  e.preventDefault();

  const value = e.currentTarget.elements.query.value.trim();
  if (!value) return Notify.failure('Enter your search query');

  value !== pagination.searchQuery && pagination.renderMoviesByPage(value);
};

refs.logo.addEventListener('click', e => {
  e.preventDefault();
  if (pagination.page === 1 && pagination.isTrandingMovies) return;

  resetForTrandingMovies();
  pagination.renderMoviesByPage();
});

refs.searchForm.addEventListener('submit', onSearchMoviesByQuery);

refs.prevBtnPAgination.addEventListener('click', () =>
  renderMoviesByChangePage(pagination.page - 1)
);
refs.nextBtnPAgination.addEventListener('click', () =>
  renderMoviesByChangePage(pagination.page + 1)
);
refs.paginationList.addEventListener('click', onChangePageAndRendereMovies);

export { onSearchMoviesByQuery };
