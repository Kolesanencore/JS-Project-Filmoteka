import { LIST_WATCHED, LIST_QUEUE } from './servises/constants';
import refs from './servises/refs';
import { pagination, resetIsDisabledBtn } from './api-search-movie';

const renderWithResetWatchedList = () => {
  pagination.page = 1;
  pagination.searchQuery = null;
  pagination.currentList = LIST_WATCHED;
  resetIsDisabledBtn();
  pagination.renderMoviesByPage();
};

const onRenderStartMyLibraryList = e => {
  e.preventDefault();
  if (pagination.currentList === LIST_WATCHED) return;
  addActiveClassList(refs.watched, refs.queue);
  renderWithResetWatchedList();
};

const onRenderWatchedList = e => {
  if (pagination.currentList === LIST_WATCHED) return;
  addActiveClassList(e.target, refs.queue);
  renderWithResetWatchedList();
};

const onRenderQueueList = e => {
  if (pagination.currentList === LIST_QUEUE) return;
  pagination.page = 1;
  pagination.searchQuery = null;
  pagination.currentList = LIST_QUEUE;
  addActiveClassList(e.target, refs.watched);
  resetIsDisabledBtn();
  pagination.renderMoviesByPage();
};

refs.myLibraryPage.addEventListener('click', onRenderStartMyLibraryList);
refs.watched.addEventListener('click', onRenderWatchedList);
refs.queue.addEventListener('click', onRenderQueueList);

function addActiveClassList(add, remove) {
  add.classList.remove('no-active');
  add.classList.add('button-active');

  remove.classList.add('no-active');
  remove.classList.remove('button-active');
}
