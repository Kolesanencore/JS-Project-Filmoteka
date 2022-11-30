import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './servises/refs';
import PaginationServiсe from './servises/pagination';
import throttle from 'lodash.throttle';

import { onChangeCurrentHomePage } from './servises/header';

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

const onRenderTrandingMovies = e => {
  e.preventDefault();

  if (
    pagination.page === 1 &&
    pagination.isTrandingMovies &&
    refs.homePage.classList.contains('current')
  )
    return;

  resetForTrandingMovies();
  pagination.renderMoviesByPage();
};

const onSearchMoviesByQuery = e => {
  e.preventDefault();

  const value = e.currentTarget.elements.query.value.trim();
  if (!value) return Notify.failure('Enter your search query');

  value !== pagination.searchQuery && pagination.renderMoviesByPage(value);
};

refs.homePage.addEventListener('click', onRenderTrandingMovies);
refs.logo.addEventListener('click', e => {
  onChangeCurrentHomePage();
  onRenderTrandingMovies(e);
});
refs.searchForm.addEventListener('submit', onSearchMoviesByQuery);

const onNextPage = () => renderMoviesByChangePage(pagination.page + 1);
const onPrevPage = () => renderMoviesByChangePage(pagination.page - 1);

refs.prevBtnPAgination.addEventListener('click', onPrevPage);
refs.nextBtnPAgination.addEventListener('click', onNextPage);
refs.paginationList.addEventListener('click', onChangePageAndRendereMovies);

function resetForTrandingMovies() {
  pagination.page = 1;
  pagination.currentList = null;
  pagination.searchQuery = null;
  refs.searchForm.elements.query.value = '';
  resetIsDisabledBtn();
}

function resetIsDisabledBtn() {
  refs.prevBtnPAgination.disabled = true;
  refs.nextBtnPAgination.disabled = false;
}

export { onSearchMoviesByQuery, pagination, resetIsDisabledBtn };
