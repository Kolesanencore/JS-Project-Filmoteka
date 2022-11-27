import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './servises/refs';
import PaginationServiсe from './servises/pagination';

const pagination = new PaginationServiсe();
pagination.renderMoviesByPage();

const onSearchMoviesByQuery = e => {
  e.preventDefault();

  const value = e.currentTarget.elements.query.value.trim();

  if (!value) return Notify.failure('Enter your search query');
  if (value === pagination.searchQuery) return;

  pagination.renderMoviesByPage(value);
};

refs.logo.addEventListener('click', e => {
  e.preventDefault();
  if (pagination.page === 1 && pagination.isTrandingMovies) return;

  pagination.renderMoviesByPage();
});

const onRenderMoviesByClickBtn = e => {
  if (e.target.tagName !== 'BUTTON') return;
  const btn = e.target;

  if (btn.dataset.firstPage === '1' && pagination.page !== 1) {
    pagination.page === 1;
    pagination.renderMoviesByPage();
    return;
  }

  if (btn.dataset.lastPage) {
    pagination.page = btn.dataset.lastPage;
    pagination.renderMoviesByPage();
    return;
  }

  if (btn.dataset.page === 'prev' && pagination.page !== 1) {
    pagination.page = +pagination.page - 1;
    pagination.renderMoviesByPage();
    return;
  }

  if (btn.dataset.page === 'next' && pagination.page < pagination.totalPage) {
    pagination.page = +pagination.page + 1;
    pagination.renderMoviesByPage();
    return;
  }

  pagination.page = btn.dataset.page;
  pagination.renderMoviesByPage();
};

refs.searchForm.addEventListener('submit', onSearchMoviesByQuery);

refs.paginationList.addEventListener('click', onRenderMoviesByClickBtn);

export { onSearchMoviesByQuery };
