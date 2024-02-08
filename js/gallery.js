import images from './data.js';

const gallery = document.querySelector('.gallery');

const markup = images.map(({ preview, original, description }) => {
  return `<li class="gallery-item">
  <a class="gallery-link" href="${removeFirstLaseChar(original)}">
    <img
      class="gallery-image"
      src="${removeFirstLaseChar(preview)}"
      data-source="${removeFirstLaseChar(original)}"
      alt="${description}"
    />
  </a>
</li>`;
});

gallery.insertAdjacentHTML('beforeend', markup.join(''));

gallery.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    openModal(event.target.dataset.source);
  }
});

document.addEventListener('keydown', event => {
  const modal = document.querySelector('.modal');
  if (
    event.code === 'Enter' ||
    event.code === 'NumpadEnter' ||
    (event.code === 'Space' && !modal)
  ) {
    openModal(event.target.querySelector('img').dataset.source);
  }
});

function openModal(src) {
  const instance = basicLightbox.create(
    `
    	<img src="${src}" width="1112" height="640">
    `,
    {
      className: 'modal',

      onShow: instance => {
        document.addEventListener('keydown', onEscapePress);
      },

      onClose: instance => {
        document.addEventListener('keydown', onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}

function removeFirstLaseChar(string) {
  return string.slice(1, string.length - 1);
}
