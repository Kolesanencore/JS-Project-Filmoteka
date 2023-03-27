import {
  API_KEY,
  BASE_URL_API,
  BASE_URL_IMG,
  FILE_SIZE,
  ALL_GENRES_KEY_LS,
} from '../servises/constants.js';
// } from './servises/constants';

import {
  fetchMovie,
  getTrendingMovies,
  getAllGenresMovie,
  getMoVieById,
  getSearchMovie,
  takeGenresMovie,
} from '../servises/api.js';
// } from './servises/api';
import trailers from './trailers';
//-add----------***
// import storage from './servises/localStorage';
import storage from '../servises/localStorage';

const WEB_LOCAL_WATCHED = 'watched-list-movie';
const WEB_LOCAL_QUEUE = 'queue-list-movie';

function createObj(data) {
  const {
    original_title,
    genres,
    vote_average,
    release_date,
    poster_path,
    id,
  } = data;

  return {
    id,
    title: original_title,
    poster: `${
      poster_path ? BASE_URL_IMG + FILE_SIZE + poster_path : DefaultIMg
    }`,
    genres: `${preparationGenres(genres)}`,
    average: vote_average,
    releaseDate: new Date(release_date).getFullYear(),
  };
}
const preparationGenres = array =>
  array
    .map(({ name }) => name)
    .slice(0, 2)
    .join(', ');
//--------------***

const modalEl = document.querySelector('.modal');
const btnOpenEl = document.querySelector('.gallery-list');
const modalMovieSidesEl = document.querySelector('.modal-content__sides');

function fetchMovies(id) {
  return fetch(id).then(response =>
    response.status === 404
      ? Promise.reject(
          new Error('The resource you requested could not be found.')
        )
      : response.json()
  );
}

const renderMarkup = object => {
  const {
    poster_path,
    id,
    title,
    vote_average,
    vote_count,
    original_title,
    genres,
    overview,
    popularity,
  } = object;
  const genreMovies = genres.map(el => el.name);

  return `
      <div class="modal-content__img">
        <img src="${BASE_URL_IMG}/${FILE_SIZE}${poster_path}" alt="image" />
      </div>
      <div class="modal-content__right-side">
        <h2 class="modal-content__title">${title}</h2>
        <div class = "trailer">
        <p class="trailer-btn">
        <svg class="play-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="45" height="45" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
          <path d="M 45 77.4 c -2.729 0 -26.857 -0.052 -33.595 -1.858 c -4.646 -1.241 -8.305 -4.9 -9.548 -9.55 C 0.021 59.142 0 45.574 0 45 s 0.021 -14.142 1.857 -20.994 c 1.243 -4.646 4.902 -8.306 9.55 -9.548 C 18.143 12.652 42.271 12.6 45 12.6 c 2.729 0 26.857 0.052 33.594 1.857 c 4.647 1.243 8.307 4.902 9.549 9.55 C 89.979 30.861 90 44.426 90 45 s -0.021 14.142 -1.858 20.994 c -1.241 4.646 -4.901 8.307 -9.55 9.549 C 71.857 77.349 47.729 77.4 45 77.4 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          <path d="M 36.758 58.972 l 21.794 -12.584 c 1.069 -0.617 1.069 -2.16 0 -2.777 L 36.758 31.028 c -1.069 -0.617 -2.405 0.154 -2.405 1.388 v 25.168 C 34.353 58.818 35.689 59.589 36.758 58.972 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          <path d="M 88.143 24.008 c -1.242 -4.648 -4.901 -8.308 -9.549 -9.55 c -0.111 -0.03 -0.239 -0.058 -0.36 -0.087 C 79.978 21.327 80 34.436 80 35 c 0 0.574 -0.021 14.142 -1.858 20.994 c -1.241 4.646 -4.901 8.307 -9.55 9.549 C 61.857 67.349 37.729 67.4 35 67.4 c -2.684 0 -26.054 -0.051 -33.235 -1.772 c 0.03 0.122 0.06 0.246 0.092 0.363 c 1.243 4.649 4.902 8.309 9.548 9.55 C 18.143 77.349 42.271 77.4 45 77.4 c 2.729 0 26.857 -0.052 33.592 -1.857 c 4.648 -1.242 8.309 -4.902 9.55 -9.549 C 89.979 59.142 90 45.574 90 45 S 89.979 30.861 88.143 24.008 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(224,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          <path d="M 58.552 43.612 l -3.23 -1.865 c 0.098 0.618 -0.151 1.285 -0.77 1.642 L 34.353 55.051 v 2.533 c 0 1.234 1.336 2.005 2.405 1.388 l 21.794 -12.584 C 59.62 45.771 59.62 44.229 58.552 43.612 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(211,211,211); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        </g>
        </svg>


         Play Trailer</p>
        </div>
        <ul class="modal-content__items">
        <li class="modal-content__item">
        <p class="film-details">Vote / Votes</p>
        <p class="film-details__info--number"> 
        <sp class="film-details__rating--orange">${vote_average.toFixed(1)}</sp>
        <sp class="film-details__rating"> / </sp>
        <sp>${vote_count.toFixed(0)}</sp>
      </p>
      </li>
      <li class="modal-content__item">
      <p class="film-details">Popularity</p>
      <p class="film-details__info--number">${popularity.toFixed(0)}</p>
          </li>
          <li class="modal-content__item">
          <p class="film-details">Original Title</p>
          <p class="film-details__info">${original_title}</p>
          </li>
          <li class="modal-content__item">
            <p class="film-details">Genre</p>
            <p class="film-details__info">${genreMovies}</p>
            </li>
            </ul>
        <h3 class="modal-content__about">About</h3>
        <p class="modal-content__description">${overview}</p>
        <div class="modal-content__buttons">
          <button type="button" class="modal-content__btn  btn-watch">
            ADD TO WATCHED
          </button>
          <button type="button" class="modal-content__btn btn-queue">ADD TO QUEUE</button>
        </div>
      </div>
    `;
};

async function openModal() {
  modalEl.classList.add('modal-show');
  document.body.classList.add('stop-scrolling');

  const btnClose = document.querySelector('.modal-content__btn-close');

  btnClose.addEventListener('click', () => closeModal());
  modalEl.addEventListener('click', e => {
    //console.log(e.target.classList);
    if (e.target.classList.contains('modal__backdrop')) closeModal();
  });
  window.addEventListener('keydown', modalClosinByEsc);
}

btnOpenEl.addEventListener('click', e => {
  if (e.currentTarget === e.target) return;
  openModal();
  const id = e.target.closest('li').dataset.id;
  getMoVieById(id).then(data => {
    const markup = renderMarkup(data);
    //console.log(markup);
    modalMovieSidesEl.innerHTML = markup;
    //---add-----------***
    const newData = createObj(data);
    addEventsOnBtnToLs(newData);
    textModalBtn(newData);
    //-----------------***
    //---add trailer------------
    const trailerRef = document.querySelector('.trailer');

    trailerRef.addEventListener('click', () => {
      trailers(newData.title, newData.releaseDate);
    });
    //--------------------
  });
});

// Закриття модалки
function closeModal() {
  modalEl.classList.remove('modal-show');
  document.body.classList.remove('stop-scrolling');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', modalClosinByEsc);
}

function modalClosinByEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
//------------watched, queue handlers-----------------------------
async function textModalBtn(obj) {
  const btnQueue = document.querySelector('.btn-queue');
  const btnWatch = document.querySelector('.btn-watch');
  if (inList(obj, WEB_LOCAL_WATCHED)) {
    // console.log('есть такой в watched');
    btnWatch.textContent = 'Added to watched';
    btnWatch.disabled = true;
    function changeText() {
      btnWatch.disabled = false;
      btnWatch.textContent = 'Remove from watched';
      btnWatch.classList.add('active');
    }
    setTimeout(changeText, 500);
  } else {
    // console.log('нет такого в watched');
    btnWatch.textContent = 'Add to watched';
    btnWatch.classList.remove('active');
    // console.log('удаляем класс active');
    btnWatch.disabled = false;
  }

  if (inList(obj, WEB_LOCAL_QUEUE)) {
    // console.log('есть такой в queue');
    btnQueue.textContent = 'Added to queue';
    btnQueue.disabled = true;
    function changeText() {
      btnQueue.disabled = false;
      btnQueue.textContent = 'Remove from queue';
      btnQueue.classList.add('active');
    }
    setTimeout(changeText, 500);
  } else {
    // console.log('нет такого в queue');
    btnQueue.textContent = 'Add to queue';
    btnQueue.classList.remove('active');
    btnQueue.disabled = false;
  }
}

// Outer fetch by ID
function addEventsOnBtnToLs(obj) {
  const btnQueue = document.querySelector('.btn-queue');
  const btnWatch = document.querySelector('.btn-watch');

  btnQueue.addEventListener('click', () => addQueueList(obj));
  btnWatch.addEventListener('click', () => addWatchList(obj));
}

// const isUniqDataInSet = (uniqSet, data) =>
//   [...uniqSet].some(({ id }) => data.id === id);

function isUniqDataInSet(uniqSet, data) {
  return [...uniqSet].some(({ id }) => data.id === id);
}

function addWatchList(obj) {
  const btnWatch = document.querySelector('.btn-watch');
  if (btnWatch.classList.contains('active')) {
    removeFromWatchedList(obj);
  } else {
    let watchList = storage.get(WEB_LOCAL_WATCHED) || [];
    let queueList = storage.get(WEB_LOCAL_QUEUE) || [];

    let queueSet = [...new Set(queueList)];
    if (isUniqDataInSet(queueSet, obj)) {
      storage.deleteArrayItemFromStorage(WEB_LOCAL_QUEUE, obj.id);
    }

    const watchSet = new Set(watchList);
    if (isUniqDataInSet(watchSet, obj)) {
      textModalBtn(obj);
    } else {
      storage.saveArrayItemToStorage(WEB_LOCAL_WATCHED, obj);
      textModalBtn(obj);
    }
  }
}

function removeFromWatchedList(obj) {
  // console.log('удаляем из watched');
  storage.deleteArrayItemFromStorage(WEB_LOCAL_WATCHED, obj.id);
  textModalBtn(obj);
}

function removeFromQueueList(obj) {
  // console.log('удаляем из queue');
  storage.deleteArrayItemFromStorage(WEB_LOCAL_QUEUE, obj.id);
  textModalBtn(obj);
}

function addQueueList(obj) {
  const btnQueue = document.querySelector('.btn-queue');
  if (btnQueue.classList.contains('active')) {
    removeFromQueueList(obj);
  } else {
    let watchList = storage.get(WEB_LOCAL_WATCHED) || [];
    let queueList = storage.get(WEB_LOCAL_QUEUE) || [];

    let watchSet = new Set(watchList);
    if (isUniqDataInSet(watchSet, obj)) {
      storage.deleteArrayItemFromStorage(WEB_LOCAL_WATCHED, obj.id);
    }

    const queueSet = new Set(queueList);
    if (isUniqDataInSet(queueSet, obj)) {
      textModalBtn(obj);
    } else {
      storage.saveArrayItemToStorage(WEB_LOCAL_QUEUE, obj);
      textModalBtn(obj);
    }
  }
}

function inList(obj, list) {
  let arrList = storage.get(list) || [];
  return isUniqDataInSet([...new Set(arrList)], obj);
}
