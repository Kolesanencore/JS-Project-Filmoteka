import refs from '../servises/refs';
import store from '../servises/localStorage';
import DefaultImg from '../../images/default-foto/filmoteka.jpg';
import {
  ALL_GENRES_KEY_LS,
  BASE_URL_IMG,
  FILE_SIZE,
} from '../servises/constants';

const takeGenresMovie = (genreId = []) => {
  const genres = store.get(ALL_GENRES_KEY_LS);
  return genreId.map(elId => genres.find(({ id }) => id === elId)?.name);
};

import NoResultImg from '../../images/no-result.jpg';

const movieMarkup = ({
  id,
  title,
  release_date,
  genre_ids,
  poster_path,
} = {}) => {
  const img = poster_path
    ? `${BASE_URL_IMG + FILE_SIZE + poster_path}`
    : DefaultImg;
  const yearMovie = new Date(release_date).getFullYear() || 'No date';
  const genreMovie =
    takeGenresMovie(genre_ids).splice(0, 2)?.join(', ') || 'No genre';
  return `<li class="list-item" data-id="${id}">
      <div class="image-wrapper">
       <img
          src="${img}"
          alt="exemple"
          class="list-item__img img"
        />
      </div> 
      <div class="descr-wrapper">
       <h2 class="list-item__title">${title.toUpperCase()}</h2>
      <div class="list-item__description">
      <p class="list-item__genre">${genreMovie}</p>
      <span class="list-item__span">&#124</span>
      <time>${yearMovie}</time>
      </div>
       
      </div>
    </li>`;
};

const movieMarkupLibrary = ({
  id,
  title,
  poster,
  genres,
  average,
  releaseDate,
} = {}) => {
  return `<li class="list-item" data-id="${id}">
      <div class="image-wrapper">
       <img
          src="${poster}"
          alt="exemple"
          class="list-item__img img"
        />
      </div> 
      <div class="descr-wrapper">
        <h2 class="list-item__title">${title.toUpperCase()}</h2>
        <div class="list-item__description">
          <p class="list-item__genre">${genres}</p>
          <span class="list-item__span">&#124</span>
          <time>${releaseDate}</time>
          <span class="list-item__vote">${average.toFixed(1)}</span>
        </div>
      </div>
    </li>`;
};

const renderMoviesMarkup = (movies = []) => {
  removeClassesNoresult();
  refs.gallery.innerHTML = movies.map(movieMarkup).join('');
};

const renderMoviesLibrary = (movies = []) => {
  refs.gallery.innerHTML = movies.map(movieMarkupLibrary).join('');
};

const clearGallery = () => {
  addClasessNoResult();
  refs.gallery.innerHTML = `<div class="no-results">
  <img src="${NoResultImg}" alt="No result" class="no-results__img" />
</div>
`;
};
export { renderMoviesMarkup, clearGallery };

const addClasessNoResult = () => {
  refs.sectionMovies.classList.add('movies--no-result');
  refs.pagination.classList.add('pagination--no-result');
  refs.gallery.classList.add('gallery-list--no-result');
};

const removeClassesNoresult = () => {
  refs.sectionMovies.classList.remove('movies--no-result');
  refs.pagination.classList.remove('pagination--no-result');
  refs.gallery.classList.remove('gallery-list--no-result');
};
