var searchInput = document.querySelector('.search');
var itemWrapper = document.querySelector('main');



function getMovieData(event) {
  var keyCode = event.keyCode;
  var searchText = searchInput.value.trim().toLowerCase();

  if (keyCode === 13 && searchText) {
    var responsePromise = fetch(`https://www.omdbapi.com/?apikey=20dc4c7f&s=${searchText}`);

    function handleResponse(responseObj) {
      return responseObj.json();
    }

    responsePromise
      .then(handleResponse)
      .then(function (data) {
        console.log(data);
        displayMatches(data.Search); // data.Search -> array of matches
      });


  }
}

function showMovieDetails(movieId) {
  var responsePromise = fetch(`https://www.omdbapi.com/?apikey=20dc4c7f&i=${movieId}`);

  function handleResponse(responseObj) {
    return responseObj.json();
  }

  responsePromise
    .then(handleResponse)
    .then(function (data) {
      var detailDisplay = document.querySelector('.detail-display');

      detailDisplay.innerHTML = `
      <h2>${data.Title}</h2>
      <h3>Release Year: ${data.Year}</h3>
      <p><strong>Plot:</strong> ${data.Plot}</p>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank">View IMDB Page</a>
      `

      detailDisplay.classList.remove('hide');
    });
}

function init() {
  searchInput.addEventListener('keydown', getMovieData);
  itemWrapper.addEventListener('click', function (event) {
    event.preventDefault();

    var el = event.target;

    if (el.tagName === 'A') {
      showMovieDetails(el.dataset.id)
    }
  })
}

init();

// Grab html elements
// Get the input's value on enter key press
// Grab data related to user's search
// Inject the movie items into the DOM, based on user's search
























