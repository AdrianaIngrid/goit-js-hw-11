import simpleLightbox from "simplelightbox";
import { Notify } from "notiflix";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { options, JSON_API_URL, PIXABAY_API_KEY } from "./api-key";

const searchForm = document.querySelector('.search-form');
//const imageGallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
loadBtn.style.display = 'none';
Notify.info("We're sorry, but you've reached the end of search results.");
Notify.warning('Sorry, there are no images matching your search query. Please try again.');
function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    options.params.q = form.element.searchQuery.value;
    if (searchQuery === "") {
        Notify.info('Please fill in the search input');
        return;
    }
}
searchForm.addEventListener('submit', onSubmit)