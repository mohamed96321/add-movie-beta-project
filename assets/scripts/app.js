const backdrop = document.getElementById('backdrop');
const addMovieModal = document.getElementById('add-modal');
const btnAddMovie = document.querySelector('#btn-add-movie');
const cancleAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancleAddMovieBtn.nextElementSibling;
const usrInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const listRoot = document.getElementById('movie-list');

const movies = [];

const showBackdrop = () => {
  backdrop.classList.toggle('visible')
};


const updataUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const cancleMovieDeletionModal = () => {
  showBackdrop();
  deleteMovieModal.classList.remove('visible');
};


const deleteMovie = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;m
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  cancleMovieDeletionModal();
};

const deleteMovieChoice = movieId => {
  deleteMovieModal.classList.add('visible');
  showBackdrop();
  const cancleDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  cancleDeletionBtn.removeEventListener('click', cancleMovieDeletionModal);
  cancleDeletionBtn.addEventListener('click', cancleMovieDeletionModal);
  confirmDeletionBtn.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovieEl = (id, title, imageUrl, rating) => {
  const newMovieEl = document.createElement('li');
  newMovieEl.className = 'movie-element';
  newMovieEl.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieEl.addEventListener('click', deleteMovieChoice.bind(null, id));
  listRoot.append(newMovieEl);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  showBackdrop();
};

const clearUrsInputs = () => {
  for (const usrInput of usrInputs) {
    usrInput.value = '';
  }
};

const cancleAddMovie = () => {
  closeMovieModal();
  clearUrsInputs();
  showBackdrop();
};

const addMovieHandler = () => {
  const titleValue = usrInputs[0].value;
  const imageUrlValue = usrInputs[1].value;
  const ratingValue = usrInputs[2].value;

  if (
    titleValue.trim() === '' || 
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === ''
    +ratingValue < 1 ||
    +ratingValue > 5 
  ) {
    alert('Please enter valid values (rating between 1 and 4).')
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  showBackdrop();
  clearUrsInputs();
  renderNewMovieEl(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updataUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancleMovieDeletionModal();
  clearUrsInputs();
};

btnAddMovie.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancleAddMovieBtn.addEventListener('click', cancleAddMovie);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
