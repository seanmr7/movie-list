// Define Movie object
class Movie {
  constructor(title, director, releasDate) {
    this.title = title;
    this.director = director;
    this.releasDate = new Date(releasDate).toISOString().split('T')[0];
  }
}

// Create UI object to modify DOM
class UIController {
  static createMovieUI(movie) {
    const newTableRow = document.createElement('tr');
    
    const titleElement = document.createElement('td');
    titleElement.innerText = movie.title;

    const directorElement = document.createElement('td');
    directorElement.innerText = movie.director;

    const releaseDateElement = document.createElement('td');
    releaseDateElement.innerText = movie.releasDate;

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

    movieListUI.appendChild(newTableRow);
  }

  static showMessage(messageText, type) {
    const message = document.createElement('h6');
    message.innerText = messageText;
    message.classList.add(type, 'center-align')
  
    document.querySelector('.container').prepend(message);
    setTimeout(function() {
      message.remove();
    }, 2700);
  }

  static deleteMovieElement(element) {
    element.remove();
  }


  static clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#director').value = '';
    document.querySelector('#release-date').value = '';
  }
}

// Class for setting and getting local storage
class Storage {
  static getMovies() {
    let movies;
    if(localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }

  static setMovieUI() {
    const movies = Storage.getMovies();
    movies.forEach(function(movie){
      UIController.createMovieUI(movie);
    })
  }

  static addMovieToStorage(movie) {
    const movies = Storage.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static deleteMovieFromStorage(collection) {
    const movies = Storage.getMovies();

    const title = collection[0].innerText;
    const director = collection[1].innerText;
    const releaseDate = collection[2].innerText;

    movies.forEach(function(movie, index) {
      if(movie.title === title && movie.director === director && movie.releasDate === releaseDate) {
        movies.splice(index, 1);
      }
    })

    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// Define variables
const movieFormUI = document.querySelector('form');
const movieListUI = document.querySelector('#movie-list');

// Add event listeners
document.addEventListener('DOMContentLoaded', Storage.setMovieUI);
movieFormUI.addEventListener('submit', submit);
movieListUI.addEventListener('click', deleteMovie);

function submit(e) {
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const director = document.querySelector('#director').value;
  const releaseDate = document.querySelector('#release-date').value;

  if(verifyFields(title, director, releaseDate)) {
    UIController.showMessage('Please enter valid information', 'error');
  } else {
    const movie = new Movie(title, director, releaseDate);
    UIController.showMessage('Movie added', 'success')
    UIController.createMovieUI(movie);
    UIController.clearForm();
    Storage.addMovieToStorage(movie);
  }
}

function deleteMovie(e) {
  if(e.target.classList.contains('delete-button')) {
    UIController.deleteMovieElement(e.target.parentElement.parentElement);
    UIController.showMessage('Movie removed', 'success');
    Storage.deleteMovieFromStorage(e.target.parentElement.parentElement.children);
  }
}

function verifyFields(title, director, releaseDate) {
  if(title === '' || director === '' || releaseDate === '' || isNaN(new Date(releaseDate))){
    return true;
  }
}