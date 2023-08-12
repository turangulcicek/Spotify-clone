import { API } from "./scripts/api.js";
import { elements, renderPlayingInfo, updateTitle } from "./scripts/ui.js";
// api classından örnek oluşturma
const api = new API();
// sayfa yüklendiği anda apiye istek atıp, popüler müzikleri listeler
document.addEventListener(
  "DOMContentLoaded",
  async () => await api.getPopular()
);

// müziği parametre olarak aldığı  müziği çalar

const playMusic = (url) => {
  elements.audioSource.src = url;
  elements.audio.load();
  elements.audio.play();
};

// listede tıklama yapınca çalışır
const handeClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card");
    // console.log(parent.dataset);
    // çalınacak müziğin bilgilerini ekrana basar
    renderPlayingInfo(parent.dataset);
    // müziği çalar
    playMusic(parent.dataset.url);
  }
};
// liste alanındaki tıklamaaları izleme
document.addEventListener("click", handeClick);

// fotoğrafı döndürme
const animatePhoto = (e) => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

const stopAnimation = (e) => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};
// müziğin çalma olayını izleme
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);

// form olaylarını izleme

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) return;

  // başlığı güncelle
  updateTitle(` Results for ${query}`);
  // aratılan kelime ile eşleşen kelimeleri çeker
  api.searchMusic(query);
});
