import {
  API_KEY,
  BASE_URL_API,
  BASE_URL_IMG,
  FILE_SIZE,
  ALL_GENRES_KEY_LS,
} from './servises/constants';
import {
  getTrendingMovies,
  getAllGenresMovie,
  getMoVieById,
  getSearchMovie,
} from './servises/api';

const modalEl = document.querySelector('.modal');
const btnOpenEl = document.querySelector('.gallery-list');
const backdropEL = document.querySelector('.modal__backdrop');

async function openModal() {
  // getMoVieById({
  //   poster_path,
  //   id,
  //   title,
  //   vote_average,
  //   vote_count,
  //   original_title,
  //   genre_ids,
  //   overview,
  // });

  modalEl.classList.add('modal-show');

  modalEl.innerHTML = `
      <div >
      <div class="modal__backdrop"></div>
    <div class="modal-content">
    <button type="button"  class="modal-content__btn-close">
    <span >x</span>
  </button>
      <div class="modal-content__sides">
        <div class="modal-content__img">
          <img src="="#" " alt="image" />
        </div>
        <div class="modal-content__right-side">
          <h2 class="modal-content__title"></h2>
          <ul class="modal-content__items">
          <li class="modal-content__item">
          <p class="film-details">Vote / Votes</p>
          <p class="film-details__info--number"> 
          <sp class="film-details__rating--orange"></sp>
          <sp class="film-details__rating"> / </sp>
          <sp></</sp>
        </p>
        </li>
        <li class="modal-content__item">
        <p class="film-details">Popularity</p>
        <p class="film-details__info--number"></p>
            </li>
            <li class="modal-content__item">
            <p class="film-details">Original Title</p>
            <p class="film-details__info"></p>
            </li>
            <li class="modal-content__item">
              <p class="film-details">Genre</p>
              <p class="film-details__info"></p>
              </li>
              </ul>
          <h3 class="modal-content__about">About</h3>
          <p class="modal-content__description"></p>
          <div class="modal-content__buttons">
            <button type="button" class="modal-content__btn  btn-watch">
              ADD TO WATCHED
            </button>
            <button type="button" class="modal-content__btn btn-queue">ADD TO QUEUE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
      `;
  const btnClose = document.querySelector('.modal-content__btn-close');
  console.log(btnClose);
  btnClose.addEventListener('click', () => closeModal());
  modalEl.addEventListener('click', e => {
    console.log(e.target.classList);
    if (e.target.classList.contains('modal__backdrop')) closeModal();
  });
  window.addEventListener('keydown', modalClosinByEsc);
}

btnOpenEl.addEventListener('click', e => {
  if (e.currentTarget === e.target) return;
  openModal();
  const id = e.target.closest('li').dataset.id;
  getMoVieById(id).then(console.log);
});

// Закриття модалки
function closeModal() {
  modalEl.classList.remove('modal-show');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', modalClosinByEsc);
}

function modalClosinByEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
