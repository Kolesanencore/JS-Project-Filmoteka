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

import storage from './servises/localStorage';

const WEB_LOCAL_WATCHED = 'watched-list-movie';
const WEB_LOCAL_QUEUE = 'queue-list-movie';

const modalEl = document.querySelector('.modal');
const btnOpenEl = document.querySelector('.gallery-list');
const backdropEL = document.querySelector('.modal__backdrop');

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

  btnClose.addEventListener('click', () => closeModal());
  modalEl.addEventListener('click', e => {
    if (e.target.classList.contains('modal__backdrop')) closeModal();
  });
  window.addEventListener('keydown', modalClosinByEsc);
}

btnOpenEl.addEventListener('click', e => {
  if (e.currentTarget === e.target) return;
  openModal();
  const id = e.target.closest('li').dataset.id;
  getMoVieById(id).then(data => {
    //render
    const newData = createObj(data);
    addEventsOnBtnToLs(newData);
  });
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

//------------watched queue handlers-----------------------------

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
    setTimeout(changeText, 200);
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
    setTimeout(changeText, 200);
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

const isUniqDataInSet = (uniqSet, data) =>
  [...uniqSet].some(({ id }) => data.id === id);

function addWatchList(obj) {
  const btnWatch = document.querySelector('.btn-watch');
  if (btnWatch.classList.contains('active')) {
    removeFromWatchedList(obj);
  } else {
    // let watchList = [];
    // let localWatchListJson = storage.get(WEB_LOCAL_WATCHED);
    // if (localWatchListJson) {
    //   watchList = [...localWatchListJson];
    // }
    // let queueList = [];
    // let localQueueListJson = storage.get(WEB_LOCAL_QUEUE);
    // if (localQueueListJson) {
    //   queueList = [...localQueueListJson];
    // }

    let watchList = storage.get(WEB_LOCAL_WATCHED) || [];
    let queueList = storage.get(WEB_LOCAL_QUEUE) || [];

    let queueSet = [...new Set(queueList)];
    if (isUniqDataInSet(queueSet, obj)) {
      // storage.remove(WEB_LOCAL_QUEUE);
      // let index = queueList.indexOf(id);
      // queueList.splice(index, 1);
      // save(WEB_LOCAL_QUEUE, queueList);
      storage.deleteArrayItemFromStorage(WEB_LOCAL_QUEUE, obj.id);
    }

    const watchSet = new Set(watchList);
    if (isUniqDataInSet(watchSet, obj)) {
      textModalBtn(obj);
    } else {
      // watchList.push(id);
      // save(WEB_LOCAL_WATCHED, watchList);

      storage.saveArrayItemToStorage(WEB_LOCAL_WATCHED, obj);
      textModalBtn(obj);
    }
  }
}

function removeFromWatchedList(obj) {
  console.log('удаляем из watched');

  // let watchList = storage.get(WEB_LOCAL_WATCHED) || [];
  // let watchList = [];
  // let localWatchListJson = storage.get(WEB_LOCAL_WATCHED);
  // if (localWatchListJson) {
  //   watchList = [...localWatchListJson];
  // }
  // remove(WEB_LOCAL_WATCHED);
  // let index = watchList.indexOf(id);
  // watchList.splice(index, 1);
  // save(WEB_LOCAL_WATCHED, watchList);

  storage.deleteArrayItemFromStorage(WEB_LOCAL_WATCHED, obj.id);
  textModalBtn(obj);
}

function removeFromQueueList(obj) {
  console.log('удаляем из queue');
  // let queueList = storage.get(WEB_LOCAL_QUEUE) || [];
  // let localQueueListJson = storage.get(WEB_LOCAL_QUEUE);
  // if (localQueueListJson) {
  //   queueList = [...localQueueListJson];
  // }

  // remove(WEB_LOCAL_QUEUE);
  // let index = queueList.indexOf(id);
  // queueList.splice(index, 1);
  // save(WEB_LOCAL_QUEUE, queueList);

  // textModalBtn();

  storage.deleteArrayItemFromStorage(WEB_LOCAL_QUEUE, obj.id);
  textModalBtn(obj);
}

function addQueueList(obj) {
  const btnQueue = document.querySelector('.btn-queue');
  if (btnQueue.classList.contains('active')) {
    removeFromQueueList(obj);
  } else {
    // let queueList = [];
    // let localQueueListJson = storage.get(WEB_LOCAL_QUEUE);
    // if (localQueueListJson) {
    //   queueList = [...localQueueListJson];
    // }

    // let watchList = [];
    // let localWatchListJson = storage.get(WEB_LOCAL_WATCHED);
    // if (localWatchListJson) {
    //   watchList = [...localWatchListJson];
    // }

    let watchList = storage.get(WEB_LOCAL_WATCHED) || [];
    let queueList = storage.get(WEB_LOCAL_QUEUE) || [];

    let watchSet = new Set(watchList);
    if (isUniqDataInSet(watchSet, obj)) {
      // remove(WEB_LOCAL_WATCHED);
      // let index = watchList.indexOf(id);
      // watchList.splice(index, 1);
      // save(WEB_LOCAL_WATCHED, watchList);

      storage.deleteArrayItemFromStorage(WEB_LOCAL_WATCHED, obj.id);
    }

    const queueSet = new Set(queueList);
    if (isUniqDataInSet(queueSet, obj)) {
      textModalBtn(obj);
    } else {
      // queueList.push(id);
      // save(WEB_LOCAL_QUEUE, queueList);

      storage.saveArrayItemToStorage(WEB_LOCAL_QUEUE, obj);
      textModalBtn(obj);
    }
  }
}

function inList(obj, list) {
  // let arrList = [];
  // let localListJson = get(list);
  // if (localListJson) {
  //   arrList = [...localListJson];
  // }

  let arrList = storage.get(list) || [];
  return isUniqDataInSet([...new Set(arrList)], obj);
}
