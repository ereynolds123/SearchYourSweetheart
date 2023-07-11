const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultsContainer = document.getElementById("results-container");
const player = document.getElementById("player");
const heroContainer = document.querySelector(".hero-container");

// Add event listener to search button
searchBtn.addEventListener("click", () => {
  searchSongs(searchInput.value.trim());
});

// Search for songs on iTunes API
async function searchSongs(searchTerm) {
  try {
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song`);
    const data = await response.json();
    displayResults(data.results);
    heroContainer.classList.add("hide-hero"); // add this line to hide the hero image
  } catch (error) {
    console.log(error);
  }
}


// Display search results
function displayResults(results) {
  resultsContainer.innerHTML = "";
  results.forEach((song) => {
    const songCard = document.createElement("div");
    songCard.classList.add("song-card");

    const artworkImg = document.createElement("img");
    artworkImg.classList.add("artwork");
    artworkImg.src = song.artworkUrl100;

    const songTitle = document.createElement("div");
    songTitle.classList.add("song-title");
    songTitle.textContent = song.trackName;

    const artistName = document.createElement("div");
    artistName.classList.add("artist-name");
    artistName.textContent = song.artistName;

    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");
    playBtn.textContent = "Play";
    playBtn.addEventListener("click", () => {
      playSong(song.previewUrl);
    });

    const pauseBtn = document.createElement("button");
    pauseBtn.classList.add("pause-btn");
    pauseBtn.textContent = "Pause";
    pauseBtn.addEventListener("click", () => {
      pauseSong();
    });

    const listenBtn = document.createElement("div");
    listenBtn.classList.add("listen-btn");
    const listenLink = document.createElement("a");
    listenLink.setAttribute("href", song.trackViewUrl);
    listenLink.setAttribute("target", "_blank");
    listenLink.textContent = "Listen on iTunes for complete song";
    listenBtn.appendChild(listenLink);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    buttonContainer.appendChild(playBtn);
    buttonContainer.appendChild(pauseBtn);

    const listenContainer = document.createElement("div");
    listenContainer.classList.add("listen-container");
    listenContainer.appendChild(listenBtn);

    songCard.appendChild(artworkImg);
    songCard.appendChild(songTitle);
    songCard.appendChild(artistName);
    songCard.appendChild(buttonContainer);
    songCard.appendChild(listenContainer);

    resultsContainer.appendChild(songCard);
    searchInput.value = ""; 
  });
}

// Play selected song
function playSong(songUrl) {
  player.src = songUrl;
  player.play();
}

// Pause currently playing song
function pauseSong() {
  player.pause();
}