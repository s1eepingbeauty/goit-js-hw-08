import galleryItems from '/gallery-items.js';

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('div.lightbox'),
  lightboxImg: document.querySelector('img.lightbox__image'),
  modalBtnClose: document.querySelector('button[data-action="close-lightbox"]'),
};

refs.gallery.insertAdjacentHTML(
  'afterbegin',
  galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" >
            </a>
        </li>`
    )
    .join('')
);

refs.gallery.addEventListener('click', onImgClick);
refs.modalBtnClose.addEventListener('click', closeModal);

function onImgClick(event) {
  if (event.target.nodeName !== 'IMG') {
    console.log('Кликнул не по картинке!');
    return;
  }
  event.preventDefault();
  const nextActiveImg = event.target;
  const activeImgSrc = nextActiveImg.dataset.source;
  const activeImgAlt = nextActiveImg.alt;
  openModal(activeImgSrc, activeImgAlt);
}

function openModal(source, description) {
  refs.lightbox.classList.add('is-open');
  refs.lightboxImg.setAttribute('src', source);
  refs.lightboxImg.setAttribute('alt', description);
}
function closeModal() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.removeAttribute('src');
  refs.lightboxImg.removeAttribute('alt');
}
