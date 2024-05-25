import axios from 'axios';
import { options, JSON_API_URL } from './api-key';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const imagesGallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

loadBtn.style.display = 'none';
const gallery = () =>
  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
function getPhotos(hits) {
  const markUp = hits
    .map(item => {
      return `<div class="photo-card">
            <a href ="${item.largeImageURL}">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
                </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> </br> ${item.likes}</p>
    <p class="info-item">
      <b>Views</b> </br> ${item.views}</p>
    <p class="info-item">
      <b>Comments</b></br> ${item.comments}</p>
    <p class="info-item">
      <b>Downloads</b> </br> ${item.downloads}</p>
  </div>
</div>`;
    })
    .join('');
  imagesGallery.insertAdjacentHTML('beforeend', markUp);
}

async function onSubmit(event) {
  event.preventDefault();
  const form = event.target;
  options.params.q = form.elements.searchQuery.value;
  if (options.params.q === '') {
    Notify.info('Please fill in the search input!');
    imagesGallery.innerHTML = '';
    return;
  }
  options.params.page = 1;
  imagesGallery.innerHTML = '';
  try {
    const response = await axios.get(JSON_API_URL, options);
    const totalHits = response.data.totalHits;
    const hits = response.data.hits;
    if (hits.length === 0) {
      loadBtn.style.display = 'none';
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      getPhotos(hits);
      gallery();
      loadBtn.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
}
async function getMorePhotos() {
    options.params.page += 1;
    try {
        const response = await axios.get(JSON_API_URL, options);
        const hits = response.data.hits;
        const totalHits = response.data.totalHits;
        getPhotos(hits);
        if (options.params.page * options.params.per_page >= totalHits) {
            loadBtn.style.display = 'none';
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        console.log(error);
    }
}
searchForm.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', getMorePhotos);
