import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getFoto } from './api';

const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const btn = document.querySelector('.load-more')



form.addEventListener('submit', onSubmit)
btn.addEventListener('click', loadMore)
const lightbox = new SimpleLightbox('.gallery a', { /* options */ });

let page = 1
let query = ''
function onSubmit(e){
    e.preventDefault()
    page = 1;
    gallery.innerHTML = ""
    query = e.currentTarget.elements.searchQuery.value
    getFoto(query, page).then(data => {
        if (data.hits.length !== 0) { createMarkup(data) } else {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }})
}

function createMarkup(photo) {
  const markup = photo.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<a class="photo-card" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="150" heigth="100" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</a>
`
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup)
    lightbox.refresh()
    btn.classList.remove('hidden')
}

function loadMore(){
    page += 1;
    
    getFoto(query, page).then(data => { createMarkup(data); Notify.success(`Hooray! We found ${data.totalHits} images.`) }).catch(error => {
        Notify.failure("We're sorry, but you've reached the end of search results");
        btn.classList.add('hidden')
    })
    
}
