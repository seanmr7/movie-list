// Define UI variables
const movieFormUI = document.querySelector('form');
const titleUI = document.querySelector('#title');
const directorUI = document.querySelector('#director');
const releaseDateUI = document.querySelector('#release-date');
const movieListUI = document.querySelector('#movie-list')

// Add event listeners
movieFormUI.addEventListener('submit', addMovie);


// Create movie object from form and add to list UI
function addMovie(e) {
  e.preventDefault();
  console.log('movie')
  let newMovie = new Movie(titleUI.value, directorUI.value, releaseDateUI.value);

  newMovie.createMovieUI();
  movieFormUI.reset();
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
    deleteTd.classList.add('delete');
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

  deleteMovieUI() {
    // Removes table row from movie list UI
  }
}