export default function (name, year) {
  const KEY_YOUTUBE = 'AIzaSyDSkDOMztZoAuDKm9YJYqa0j3YxHzzYNDA';
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?q=${
      name + ` ${year}` + ' trailer'
    }&key=${KEY_YOUTUBE}`
  )
    .then(data => data.json())
    .then(data => {
      const idYoutube = data.items[0].id.videoId;
      const backdropModal = document.querySelector('.modal__backdrop');

      backdropModal.innerHTML = `
            <div style='position:relative;' id='modal-trailer-wrapper'>
                 <div class='modal-trailer' style="width: 80vw; height: 36vw"></div>
              </div>`;

      const modalTrailer = document.querySelector('.modal-trailer');
      const wrapper = document.querySelector('#modal-trailer-wrapper');
      modalTrailer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${idYoutube}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      modalTrailer.insertAdjacentHTML(
        'beforeend',
        `<button type="button" class="close-trailer">X</button>`
      );
   
      setTimeout(() => {
        backdropModal.classList.remove('is-hidden');
      }, 500);
      const onEscapeClose = function (e) {
        if (e.key === 'Escape') {
          backdropModal.classList.add('is-hidden');
          modalTrailer.innerHTML = '';
          backdropModal.innerHTML = '';
          // document.body.classList.remove('stop-scroll');
          window.removeEventListener('keydown', onEscapeClose);
        }
      };
      window.addEventListener('keydown', onEscapeClose);
      backdropModal.addEventListener('click', e => {
        if (e.target === e.currentTarget) {
          window.removeEventListener('keydown', onEscapeClose);
          modalTrailer.innerHTML = '';
          backdropModal.innerHTML = '';
          // document.body.classList.remove('stop-scroll');
          backdropModal.classList.add('is-hidden');
        }
      });
      const closeBtn = document.querySelector('.close-trailer');
      closeBtn.addEventListener('click', e => {
        window.removeEventListener('keydown', onEscapeClose);
        modalTrailer.innerHTML = '';
        backdropModal.innerHTML = '';
        //   document.body.classList.remove('stop-scroll');
        backdropModal.classList.add('is-hidden');
      });
    });
}
