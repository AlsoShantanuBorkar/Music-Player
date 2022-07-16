const musicContainer = document.querySelector('.music-container');

const play = document.querySelector('#play');

const prev = document.querySelector('#prev');

const next = document.querySelector('#next');

const audio = document.querySelector('#audio');

const progress = document.querySelector('.progress');

const progressContainer = document.querySelector('.progress-container');

const title = document.querySelector('#title');

const cover = document.querySelector('#cover');

// Songs
const songs = [
 'You See Big Girl - Hiroyuki Sawano',
 'BFG Division',
 'Bones - Imagine Dragons', 
 'Level Of Concern - Twenty One Pilots'
];

//Keeping track of songs
let songIndex = 3;

//Load Initial Song in DOM
let loadSong = (song)=>{
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
};

loadSong(songs[songIndex]);

// Play Song
let playSong = () =>{
    musicContainer.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

}

// Pause Song
let pauseSong = () =>{
    musicContainer.classList.remove('play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

// Next Song
let nextSong = ()=>{
    songIndex++;
    if (songIndex==songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
let prevSong = ()=>{
    songIndex--;
    if (songIndex<0) {
        songIndex = songs.length-1;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar
let updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set Progress Bar
let setProgress = (e)=>{
    const width = progressContainer.clientWidth;
    console.log(width);
    const clickX = e.offsetX;
    console.log(clickX);
    const duration = audio.duration;

    audio.currentTime = (clickX/width)*duration;
}


//Event Listeners

// Play/Pause Song
play.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');
    // If song is already Playing pause it
    if (isPlaying) {
        pauseSong();
    }
    // If paused play song
    else playSong();
})


// Next Song
next.addEventListener('click', nextSong)


// Previous Song
prev.addEventListener('click',prevSong)

// Update Progress Bar
audio.addEventListener('timeupdate',updateProgress);

// Set Progress Bar Manually
progressContainer.addEventListener('click',setProgress);

// If Song ends 
audio.addEventListener('ended',nextSong)
