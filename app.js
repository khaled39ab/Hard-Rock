const searchSongs = async () => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displaySongs(data.data))
    // .catch(error => displayError("Oops! Something went wrong!! Please try again later!!!"))
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch {
        displayError("Oops! Something went wrong!! Please try again later!!!")
    }
}

const displaySongs = songs => {
    const songsContainer = document.getElementById("songs-container");
    songsContainer.innerHTML = '';
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerHTML = '';

    songs.forEach(song => {
        // console.log(song);
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.album.title}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/ogg">     
                        </audio>
                    </div>
                    
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick = "getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>                   
                    `;
        songsContainer.appendChild(songDiv);

    });
};

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`

    // fetch (url)
    // .then (res => res.json())
    // .then (data => songLyrics(data.lyrics))
    // .catch (error => displayError("Oops! Something went wrong!! Please try again later!!!"))
    try {
        const res = await fetch(url);
        const data = await res.json();
        songLyrics(data.lyrics);
    }
    catch {
        displayError("Oops! Something went wrong!! Please try again later!!!");
    }
}

const songLyrics = lyrics => {
    const lyricsDiv = document.getElementById("song-lyrics");
    if (lyrics === undefined) {
        lyricsDiv.innerHTML = ` <h3 id = 'undefine'> Can not load data ! Please try again later!! </h3>`;
    } else {
        lyricsDiv.innerText = lyrics;
    }
}

const displayError = error => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = error;
}