var searchInput = $('.search');
var itemWrapper = $('main');

function displayMatches(matches) {
  itemWrapper.html('');

  if (!matches) {
    itemWrapper.innerHTML('<p class="no-search" >No results found</p>');
    return;
  }

  console.log(matches);
  for (var matchObj of matches) {
    itemWrapper.append(`
      <div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${matchObj.Poster})">
        <h3>${matchObj.Title}</h3>
        <p>Release Year: ${matchObj.Year}</p>
        <a data-id="${matchObj.imdbID}" href="https://www.imdb.com/title/${matchObj.imdbID}" target="_blank">View More Details</a>
      </div>
    `);
  }
}

function getMovieData(event) {
  var keyCode = event.keyCode;
  var searchText = searchInput.val().trim();

  if (keyCode === 13 && searchText) {
    $.get(`https://www.omdbapi.com/?apikey=20dc4c7f&s=${searchText}`)
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
  searchInput.keydown(getMovieData);
  
  itemWrapper.click(function (event) {
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
























