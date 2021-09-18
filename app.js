// Define UI variables
const container = document.querySelector('.container');
const movieFormUI = document.querySelector('form');
const titleUI = document.querySelector('#title');
const directorUI = document.querySelector('#director');
const releaseDateUI = document.querySelector('#release-date');
const movieListUI = document.querySelector('#movie-list')

// Add event listeners
movieFormUI.addEventListener('submit', addMovie);
movieListUI.addEventListener('click', deleteMovie);

// Create movie object from form and add to list UI
function addMovie(e) {
  e.preventDefault();
  if(checkFields()) {
    showMessage('Please enter valid information', 'error')
  } else {
    let newMovie = new Movie(titleUI.value, directorUI.value, releaseDateUI.value);
    newMovie.createMovieUI();
    showMessage('Movie added', 'success');
    movieFormUI.reset();
  }
}

function checkFields() {
  if(titleUI.value === '' || directorUI.value === '' || releaseDateUI.value === '' || isNaN(new Date(releaseDateUI.value))) {
    return true;
  }
}

function showMessage(messageText, type) {
  const message = document.createElement('h6');
  message.innerText = messageText;
  message.classList.add(type, 'center-align')

  container.prepend(message);
  setTimeout(function() {
    message.remove();
  }, 2700);
}

function deleteMovie(e) {
  if(e.target.classList.contains('delete-button')) {
    e.target.parentElement.parentElement.remove();
  }
}

// Define Movie object
class Movie {
  constructor(title, director, releasDate) {
    this.title = title;
    this.director = director;
    this.releasDate = new Date(releasDate).toISOString().split('T')[0];
  }

  createMovieUI() {
    const newTableRow = document.createElement('tr');
    
    const titleElement = document.createElement('td');
    titleElement.innerText = this.title;

    const directorElement = document.createElement('td');
    directorElement.innerText = this.director;

    const releaseDateElement = document.createElement('td');
    releaseDateElement.innerText = this.releasDate;

    const deleteTd = document.createElement('td');
    deleteTd.classList.add('center-align');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete'
    deleteBtn.classList.add('button', 'delete-button');
    deleteTd.appendChild(deleteBtn);

    newTableRow.appendChild(titleElement);
    newTableRow.appendChild(directorElement);
    newTableRow.appendChild(releaseDateElement);
    newTableRow.appendChild(deleteTd);

    movieListUI.appendChild(newTableRow)
  }
}