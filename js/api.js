const API_KEY = '47e21f74b233433f9424263bcf49c5b7';
const league_id = 2021;

var base_url = "https://api.football-data.org/v2/";
var standingsURL = `${base_url}competitions/${league_id}/standings`
var topScorersURL = `${base_url}competitions/PL/scorers?limit=3`

// All request in one function with dynamic url
let fetchApi = url => {
  let responseAPI = fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
    .then(status)
    .then(json)
  return responseAPI;
}

let cacheAPI = url => caches.match(url).then(response => {
  let responseCache = response === undefined ? 'Caching' : response.json();
  return responseCache;
});

// Blok kode yang akan di panggil jika fetch berhasil
let status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(() => {
      document.querySelector("#body-content").innerHTML =
        `
        <div class="container">
          Failed
        </div>
      `
    });
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
  return fetchApi(standingsURL).catch(() => {
    return cacheAPI(standingsURL);
  });
}

let getTopScorers = () => {
  return fetchApi(topScorersURL).catch(() => {
    return cacheAPI(topScorersURL);
  });
}

let getTeamById = () => {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let dataTeam;

    resolve(fetchApi(`${base_url}teams/${idParam}`).catch(() => {
      return cacheAPI(`${base_url}teams/${idParam}`);
    }));
  });
}

let getMatchesByTeam = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  return fetchApi(`${base_url}teams/${idParam}/matches/?status=SCHEDULED`).catch(() => {
    return cacheAPI(`${base_url}teams/${idParam}/matches/?status=SCHEDULED`);
  });
}


let getFavTeams = () => getAll();

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then((team) => {
    clubHTML = `
    <div class="card top-space">
      <div class="row card-content">
          <div class="col s12 m4 l4 center-align">
              <img src="${data.crestUrl}" alt="${data.shortName}" width=128px height=128px/>
              <div class="center-align" id="team-name" style="padding:8px"> <b> ${data.name} </b> </div>
          </div>
          <div class="col s12 m8 l8">
              <i class="material-icons" style="font-size:.8rem"> sports_soccer </i>  ${data.venue} <br><br>
              <i class="material-icons" style="font-size:.8rem"> location_on </i>  ${data.address}  <br><br>
              <i class="material-icons" style="font-size:.8rem"> phone </i> ${data.phone !== null ? data.phone : 'No contact'}  <br><br>
              <b> Official Website : </b> <a href="${data.website}"> ${data.website}  </a> 
          </div>
      </div>
    </div>`;

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


let showLoader = () => {
  let html =
    `
    <div class="container" style="height:80vh"> 
        <div class="center">
          <div class="preloader-wrapper medium active">
            <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
                </div><div class="circle-clipper right">
                <div class="circle"></div>
                </div>
            </div>
          </div>
        </div>
    </div>`
  document.getElementById("loader").innerHTML = html;
}

let hideLoader = () => {
  document.getElementById("loader").innerHTML = '';
}
