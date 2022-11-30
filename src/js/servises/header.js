const formRef = document.getElementById('search-form');
const inputRef = document.querySelector('.search__input');
const gallery = document.querySelector('.collection');
const headerRef = document.querySelector('.header');
const pageHomeRef = document.querySelector('.menu__link-home');
const pageLabraryRef = document.querySelector('.menu__link-library');
const modalBackdrop = document.querySelector('.modal__backdrop');
const modalBox = document.getElementById('modal');
const headerWarning = document.querySelector('.warning-notification');
const pagiCont = document.querySelector('.pagination-container');
const inputeHidden = document.querySelector('.search');
const buttonHidden = document.querySelector('.button_hidden');

pageLabraryRef.addEventListener('click', () => {
  headerRef.classList.add('header__library');
  pageHomeRef.classList.remove('current');
  pageLabraryRef.classList.add('current1');
  inputeHidden.classList.add('search_none');
  buttonHidden.classList.remove('button_hidden');
});

const onChangeCurrentHomePage = () => {
  headerRef.classList.remove('header__library');
  headerRef.classList.add('header');
  pageHomeRef.classList.add('current');
  pageLabraryRef.classList.remove('current1');
  inputeHidden.classList.remove('search_none');
  buttonHidden.classList.add('button_hidden');
};

pageHomeRef.addEventListener('click', onChangeCurrentHomePage);

export { onChangeCurrentHomePage };
