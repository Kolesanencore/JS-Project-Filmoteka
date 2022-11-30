import Glide from '@glidejs/glide';
import { glideFooter, options } from './slider_glide';
import { onClickEscape, closeModal } from './modal_footer';
// import { users } from './students';

const refs = {
  footerModal: document.querySelector('.footer-modal'),
  openModalLink: document.querySelector('[data-footer-open]'),
  modal: document.querySelector('[data-modal-footer]'),
  backdrop: document.querySelector('.js-backdrop'),
  addBodyClass: document.querySelector('body'),
};

export function openModal() {
  refs.modal.classList.remove('is-hidden');
  refs.addBodyClass.classList.add('modal-open');
  document.addEventListener('keydown', onClickEscape);
  refs.footerModal.innerHTML = '';

  const markup = `
  <div class="glide_footer">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides--footer">
        <li class="glide__slide">
        
       
    <div class='border__outside'>
      <div class='border__inside'>
        <img class='student-foto' src="https://kolesanencore.github.io/Oh-my-donats/sergey.0d51e22f.png" alt=name />
      </div>
    </div>
    <div class='student__card'>
      <h3 class='student__name'>Kolesan Sergey</h3>
      <p class='student__role'>Developer</p>
      <ul class='footer__social'>
        <li class='footer__sociallink'>
          <a class='student__link' href="https://github.com/Kolesanencore" target='_blank'>
            <i class='fa-brands fa-github fa-xl'></i>
          </a>
        </li>   
      </ul>
      <p class='student__about'>
        It's so much darker when a light goes out than it would have been if it had never shone
      </p>
    </div>
    </li>

        <li class="glide__slide">    <div class='border__outside'>
      <div class='border__inside'>
        <img class='student-foto' src="https://avatars.githubusercontent.com/u/89158959?v=4" alt=name />
      </div>
    </div>
    <div class='student__card'>
      <h3 class='student__name'>Zykova Tetiana</h3>
      <p class='student__role'>Developer</p>
      <ul class='footer__social'>
        <li class='footer__sociallink'>
          <a class='student__link' href="https://github.com/Kolesanencore" target='_blank'>
            <i class='fa-brands fa-github fa-xl'></i>
          </a>
        </li>   
      </ul>
      <p class='student__about'>
    For a person, if he wants something very much, nothing is impossible.
      </p>
    </div></li>


        <li class="glide__slide">    <div class='border__outside'>
      <div class='border__inside'>
        <img class='student-foto' src="https://kolesanencore.github.io/Oh-my-donats/oleg.2202c5a5.png" alt=name />
      </div>
    </div>
    <div class='student__card'>
      <h3 class='student__name'>Martinuk Oleg</h3>
      <p class='student__role'>Developer</p>
      <ul class='footer__social'>
        <li class='footer__sociallink'>
          <a class='student__link' href="https://github.com/Kolesanencore" target='_blank'>
            <i class='fa-brands fa-github fa-xl'></i>
          </a>
        </li>   
      </ul>
      <p class='student__about'>
    There are no accidents. There is only the illusion of chance.
      </p>
    </div></li>


        <li class="glide__slide">    <div class='border__outside'>
      <div class='border__inside'>
        <img class='student-foto' src="https://kolesanencore.github.io/Oh-my-donats/gena.ba795a76.png" alt=name />
      </div>
    </div>
    <div class='student__card'>
      <h3 class='student__name'>Tingaev Genadiy</h3>
      <p class='student__role'>Team Lead</p>
      <ul class='footer__social'>
        <li class='footer__sociallink'>
          <a class='student__link' href="https://github.com/Kolesanencore" target='_blank'>
            <i class='fa-brands fa-github fa-xl'></i>
          </a>
        </li>   
      </ul>
      <p class='student__about'>
       Learning to do, doing to learn.
      </p>
    </div></li>

      </ul>
    </div>






    <div class="glide__arrows" data-glide-el="controls">
      <button style="padding: 10px;
      border: none; left: 10px" class="glide__arrow glide__arrow--left arrow__footer" data-glide-dir="<">&#5130;</button>
      <button style="padding: 10px;     
      border: none; right: 10px" class="glide__arrow glide__arrow--right arrow__footer" data-glide-dir=">">&#5125;</button>
    </div>

    <div class="close-container "data-footer-close>
      <div class="leftright"></div>
      <div class="rightleft"></div>
    </div>
  </div>
    `;

  refs.footerModal.insertAdjacentHTML('beforeend', markup);

  const slide = document.querySelector('.glide__slides--footer');
  const closeModalBtn = document.querySelector('[data-footer-close]');


  glideFooter.destroy();
  let glidFooter = new Glide('.glide_footer', options);
  glidFooter.mount();

  closeModalBtn.addEventListener('click', closeModal);
}
