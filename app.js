const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('curr-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
      name: 'song-1',
      displayName: 'Cradles',
      artist: 'Sub Urban',
    },
    {
      name: 'song-2',
      displayName: 'Cyberpunk',
      artist: 'Max Brhon',
    },
    {
      name: 'song-3',
      displayName: 'Fearless',
      artist: 'Lost Sky / TULE',
    },
    {
      name: 'song-4',
      displayName: 'Make Me Move (feat. KARRA) (James Roche Remix)',
      artist: 'Culture Code, KARRA, James Roche',
    },
];

// Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play/Pause event listener
playBtn.addEventListener('click',()=>(isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `songs/${song.name}.mp3`;
    img.src = `IMG/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// onLoad - Select first song
loadSong(songs[songIndex]);

// Update bar
function updateProgressBar(e){
  if(isPlaying){
    const {duration, currentTime} = e.srcElement;
    // update bar width
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`
    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`
    }

    // delay switching duration element to avoid NaN displaying
    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration} = music;
  music.currentTime = (clickX/width)*duration;
}

// Eventlisteners for prev and next
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);