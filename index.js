// Sample playlist data
let playlist = [
  {
    id: 0,
    name: 'Bheegi Saree From Param Sundari',
    artist: 'Sachin-Jigar',
    img: "./Img/Bheegi Saree.jpg",
    genre: 'Shreya_Ghosal',
    source: './Songs/Bheegi Saree.mp3'
  },
  {
    id: 1,
    name: 'Ishq Bukhaar From Tehran',
    artist: 'Elnaaz Norouzi',
    genre: 'Shreya_Ghosal',
    img: "./Img/Elnaaz Norouzi.jpg",
    source: './Songs/Ishq Bukhaar.mp3'
  },
  {
    id: 2,
    name: 'Saiyaara Reprise Female',
    artist: 'Tanishk Bagchi',
    genre: 'Shreya_Ghosal',
    img: "./Img/Saiyaara Reprise.jpg",
    source: './Songs/Saiyaara Reprise.mp3'
  },
  {
    id: 3,
    name: 'Duniya',
    artist: 'Siddharth-Garima',
    genre: 'Arijit',
    img: "./Img/Duniya.jpg",
    source: './Songs/Duniya.mp3'
  },

  {
    id: 4,
    name: 'Nazar Battu',
    artist: 'Harsh Upadhyay',
    genre: 'hip-hop',
    img: "./Img/Nazar.jpg",
    source: './Songs/Nazar Battu-320kbps.mp3'
  },
  {
    id: 5,
    name: 'Aankhon Ki Gustaakhiyan',
    artist: 'Vishal Mishra',
    genre: 'hip-hop',
    img: "./Img/Vishal Mishra.jpg",
    source: './Songs/Aankhon Ki Gustaakhiyan Title Track-320kbps.mp3'
  },

];


// Get DOM elements
const themeCheckbox = document.getElementById('theme-checkbox');
const genreSelect = document.getElementById('genre-select');
const createPlaylistButton = document.getElementById('create-playlist-button');
const updatePlaylistButton = document.getElementById('update-playlist-button');
const cardContent = document.querySelector('.card-content');
const prevButton = document.getElementById('prev-button');
const playButton = document.getElementById('play-button');
const nextButton = document.getElementById('next-button');
const addPlaylistButton = document.getElementById('add-playlist-button');
const currentPlaylist = document.getElementById('current-playlist');
const allPlay = document.getElementById('all-playlists');
const myImage = document.getElementById('song_image');



// Variables
let isLight = true;
let currentSongIndex = 0;
let currentGenreFilter = '';
let allPlaylist = [];
let currentPlaylistIndex;

renderCurrentSong();
showSongs(playlist);

// Theme toggle
function toggleTheme() {
  document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
  console.log(isLight);
  isLight = !isLight;
}

// Event handler for dropdown change
genreSelect.addEventListener('change', () => {
  currentGenreFilter = genreSelect.value;
  showSongs(playlist);
});

//function to show all song.
function showSongs(playlist) {
  const all_songs = document.getElementById("all-songs");
  all_songs.innerHTML = "";
  let filteredSongs;
  if (currentGenreFilter !== '') {
    filteredSongs = playlist.filter((song) => song.genre === currentGenreFilter);
  }
  else {
    filteredSongs = playlist;
  }
  filteredSongs.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${song.name} - ${song.artist}`;
    listItem.addEventListener('click', () => {
      currentSongIndex = song.id;
      renderCurrentSong();
    });
    all_songs.appendChild(listItem);
  }
  )
}
// Play song
function playSong(sourceUrl) {
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');

  // Set the source URL of the audio element
  audioSource.src = sourceUrl;

  // Load and play the audio
  audioPlayer.load();
  audioPlayer.play();
}

// Play current song
// playButton.addEventListener('click', () => {
//   const songUrl = playlist[currentSongIndex].source;
//   playSong(songUrl);
// });

// Next song
nextButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  renderCurrentSong();
});

// Previous song
prevButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  renderCurrentSong();
});

// Add song to playlist


// Render current song
function renderCurrentSong() {
  const currentSong = playlist[currentSongIndex];
  cardContent.querySelector('h2').textContent = currentSong.name;
  cardContent.querySelector('p').textContent = currentSong.artist;
  myImage.src = currentSong.img;
  playSong(currentSong.source);
}


// Clear playlist input
function clearPlaylistInput() {
  document.getElementById('playlist-input').value = '';
}

function createPlaylist() {
  const playlistName = document.getElementById('playlist-input').value;
  if (playlistName !== '') {
    const newPlaylist = {
      name: playlistName,
      songs: []
    };
    allPlaylist.push(newPlaylist);
    renderPlaylist();
  }
  document.getElementById('playlist-input').value = "";
}

function renderPlaylist() {
  document.getElementById('all-playlists').innerHTML = "";
  allPlaylist.forEach((playlist, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${playlist.name}`;
    listItem.addEventListener('click', () => {
      renderPlaylistSongs(playlist.songs);
      currentPlaylistIndex = index;
      // console.log(currentPlaylistIndex);
    });
    allPlay.appendChild(listItem);
  })
}

function renderPlaylistSongs(playlists) {
  currentPlaylist.innerHTML = "";
  playlists.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${song.name} - ${song.artist}`;
    currentPlaylist.appendChild(listItem);
  })
}
function addtoPlaylist() {
  console.log(allPlay, currentPlaylistIndex);
  const selectedPlaylist = allPlaylist[currentPlaylistIndex];
  const currentSng = playlist[currentSongIndex];
  if (selectedPlaylist.songs.indexOf(currentSng) == -1) {
    selectedPlaylist.songs.push(currentSng);
  }
  console.log(allPlaylist[currentPlaylistIndex].songs);
  renderPlaylistSongs(allPlaylist[currentPlaylistIndex].songs);
}
