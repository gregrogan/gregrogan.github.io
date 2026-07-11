(() => {
  const image = document.querySelector('.image-rotate[data-images]');
  if (!image) return;

  let images;
  try {
    images = JSON.parse(image.dataset.images);
  } catch (error) {
    console.warn('Could not parse rotating image data.', error);
    return;
  }

  if (!Array.isArray(images) || images.length < 2) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selected = images[Math.floor(Math.random() * images.length)];
  if (!selected || !selected.src || selected.src === image.getAttribute('src')) return;

  const applyImage = () => {
    image.src = selected.src;
    image.alt = selected.alt || '';
    if (selected.width) image.width = selected.width;
    if (selected.height) image.height = selected.height;
  };

  if (reducedMotion) {
    applyImage();
    return;
  }

  image.classList.add('is-changing');
  window.setTimeout(() => {
    applyImage();
    image.addEventListener('load', () => image.classList.remove('is-changing'), { once: true });
    window.setTimeout(() => image.classList.remove('is-changing'), 500);
  }, 180);
})();
