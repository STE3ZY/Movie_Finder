var httpRequest = new XMLHttpRequest();

    httpRequest.onload = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log(httpRequest.responseText);
          var movieData = JSON.parse(httpRequest.responseText);
          
          var results = document.getElementById("results");
          results.innerHTML = "";

          for (var i = 0; i < movieData.Search.length; i++) {
            var movie = movieData.Search[i];

            var movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = 
              "<img src='" + movie.Poster + "' />" +
              "<p>Title: <a href='https://www.imdb.com/title/" + movie.imdbID + "' class='movie-title'>" + movie.Title + "</a></p>" +
              "<p>Year: " + movie.Year + "</p>";

            results.appendChild(movieElement);
          }
        } else {
          console.log(httpRequest.statusText);
        }
      }
    }

    httpRequest.onerror = function () {
      console.log(httpRequest.statusText);
    }

    var searchMovie = function () {
      var input = document.querySelector('input').value;
      if (input) {
        httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + input + '&plot=short&apikey=b7da8d63');
        httpRequest.send(null);
      }
    }