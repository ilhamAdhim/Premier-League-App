const API_KEY = '47e21f74b233433f9424263bcf49c5b7';
const league_id = 2021;

var base_url = "https://api.football-data.org/v2/";
var standingsURL = `${base_url}competitions/${league_id}/standings`
var topScorersURL = `${base_url}competitions/PL/scorers?limit=3`

// All request in one function with dynamic url
let fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
    .then(status)
    .then(json)
    .catch(err => Promise.reject(err));
}

let cacheAPI = url => caches.match(url).then(response => {
  return response === undefined ? 'Caching' : response.json();
});

// Blok kode yang akan di panggil jika fetch berhasil
let status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
let json = response => {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
let error = error => {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

let getStandings = () => {
  let result;

  if ("caches" in window) result = cacheAPI(standingsURL);
  result = fetchApi(standingsURL)
  return result;
}

let getTopScorers = () => {
  let result;

  if ("caches" in window) result = cacheAPI(topScorersURL);
  result = fetchApi(topScorersURL);
  return result;
}

let getTeamById = () => {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    let dataTeam;

    if ("caches" in window) result = cacheAPI(`${base_url}teams/${idParam}`);
    dataTeam = fetchApi(`${base_url}teams/${idParam}`);
    resolve(dataTeam);
  });
}

let getMatchesByTeam = () => {
  let result;
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ("caches" in window) result = cacheAPI(`${base_url}teams/${idParam}/matches/?status=SCHEDULED`);
  result = fetchApi(`${base_url}teams/${idParam}/matches/?status=SCHEDULED`);
  return result;
}


let getFavTeams = () => getAll();

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (team) {
    clubHTML = '';
    var clubHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.cover}" />
      </div>
      <div class="card-content">
        <span class="card-title">${team.team_name}</span>
        ${snarkdown(team.post_content)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = clubHTML;
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function (team) {
        resolve(team);
      });
  });
}
