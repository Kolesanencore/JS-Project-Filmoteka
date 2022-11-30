const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery-list'),

  footerModal: document.querySelector('.footer-modal'),
  openModalLink: document.querySelector('[data-footer-open]'),
  modal: document.querySelector('[data-modal-footer]'),
  backdrop: document.querySelector('.js-backdrop'),
  containerSlider: document.querySelector('.container__slider'),
  sliderTitle: document.querySelector('.slide__title'),

  logo: document.querySelector('.logo'),
  pagination: document.querySelector('.js-pagination'),
  paginationList: document.querySelector('.pagination__list'),
  prevBtnPAgination: document.querySelector('[data-page="prev"]'),
  nextBtnPAgination: document.querySelector('[data-page="next"]'),
  sectionMovies: document.querySelector('.movies'),

  homePage: document.querySelector('[data-current="home"]'),
  myLibraryPage: document.querySelector('[data-current="library"]'),
  watched: document.querySelector('[data-list="watched"]'),
  queue: document.querySelector('[data-list="queue"]'),
  scrolUp: document.querySelector('.scroll-up'),
};
export default refs;
