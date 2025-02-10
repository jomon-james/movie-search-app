async function searchMovies() {
    const query = document.getElementById('search').value;
    const response = await fetch(`http://localhost:5500/search?query=${query}`);
    const movies = await response.json();
    displayResults(movies);
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (movies.length === 0) {
        resultsDiv.innerHTML = '<p>No movies found.</p>';
    } else {
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Director: ${movie.director}</p>
                <p>Year: ${movie.year}</p>
                <p>Genre: ${movie.genre}</p>
            `;
            resultsDiv.appendChild(movieDiv);
        });
    }
}
