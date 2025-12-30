const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function loadMovie(){
    const res = await fetch(`http://localhost:5000/movies?id=${movieId}`);
    const movie = await res.json();

    document.getElementById("moviePoster").src = `http://localhost:5000/${movies.Poster}`;
    document.getElementById("movieTitle").textContent = movie.Title;
    document.getElementById("movieInfo").textContent=`
    Duration: ${movie.Duration}
    Genre: ${movie.Subgenre}
    Language: ${movie.Language}
    Year: ${movie.Year}
    Rating: ${movie.Rating}
    `;
}

document.getElementById("startMovieBtn").addEventListener("click", () =>{
    localStorage.setItem("currentMovie", movieId);

});
loadMovie();