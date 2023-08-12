import { renderSongs } from "./ui.js";
// istekler için kullanılan ayarlar
const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR&pageSize=20&startFrom=0";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "db05847b21msh1991065c74fc883p1759eajsn086d35208722",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
// api isteklerini yönettiğimiz class
export class API {
  constructor() {
    this.songs = [];
  }
  // popüler müzikleri getirir

  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();
    this.songs = data.tracks;

    // ekrana popüler müzikleri listeler
    renderSongs(this.songs);
  }
  //   arama metodu
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR%20`,
      options
    );
    const data = await res.json();
    // veriyi istediğimiz hale çevirme
    // song.track yerine song'a erişince
    const newData = data.tracks.hits.map((song) => ({ ...song.track }));

    this.songs = newData;
    // aratılan şarkıları ekrana basma

    renderSongs(this.songs);
  }
}
/*  bir objenin bütün özellikleri başka bir objeye verilirken ... kullanılır
var ahmet={
  id:"1",
  name:"ahmet"
 }

 var yeniAhmet={
  ...ahmet,
  boy:190
 }
 */
