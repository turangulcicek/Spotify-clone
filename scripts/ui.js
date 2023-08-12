// ! Htmlden gelenler
export const elements = {
  list: document.querySelector(".list"),
  audio: document.querySelector("audio"),
  audioSource: document.querySelector("audio source"),
  playingInfo: document.querySelector(".playing .info"),
  form: document.querySelector("form"),
  title: document.querySelector(".songs h2"),
};

// her biz müzik için ekrana bir kart basar

export const renderSongs = (songs) => {
  // eskiden eklenenleri temizleme
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    // div oluşturma
    const div = document.createElement("div");
    // dive class verme
    div.className = "card";
    // kart elemanına bazı verileri ekleme
    div.dataset.url = song.hub?.actions?.pop()?.uri;
    div.dataset.title = song.title;
    div.dataset.img = song.images.coverart;
    // console.log(div);

    // div içeriğini belirleme
    div.innerHTML = `
    <figure>
        <img src=${song.images.coverart} />
        <div class="play">
            <i id="play-btn" class="bi bi-play-fill"></i>
        </div>
    </figure>
        <h5>${song.subtitle}</h5>
    <p>${song.title}</p>`;
    elements.list.appendChild(div);
  });
};

// çalan şarkının bilgilerini ekrana basma

export const renderPlayingInfo = (song) => {
  elements.playingInfo.innerHTML = `
         <img id="info-img"
          src="${song.img}"
        />
        <div>
          <p class="mb-2 fs-5">Now Playing</p>
          <h3>${song.title}</h3>
        </div>
    `;
};

// başlık metnini günceller
export const updateTitle = (message) => {
  elements.title.innerText = message;
};
