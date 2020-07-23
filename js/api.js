var base_url = "https://api.football-data.org/v2/";

let pathImagesTopScorer = ["../assets/first-top-scorer.png", "../assets/second-top-scorer.png", "../assets/third-top-scorer.png"]

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
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
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var standingHTML = "";
          data.standings[0].table.forEach(function (club) {
            standingHTML += `
            <tr class="team-info" data-aos="fade-down" data-aos-delay ="300">
              <td style="padding:.5rem">
                <img src="${club.team.crestUrl}" width=32 height=32 class="team-logo"/>
                <span style="font-weight:bold;padding-bottom:.25rem"> ${club.team.name} </span>
              </td>
              <td>${club.playedGames}</td>
              <td>${club.won}</td>
              <td>${club.draw}</td>
              <td>${club.lost}</td>
              <td>${club.goalsFor}</td>
              <td>${club.goalsAgainst}</td>
              <td>${club.goalDifference}</td>
              <td>${club.points}</td>
            </tr>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = standingHTML;
        });
      }
    });
  } else {

    fetch(base_url + "competitions/2021/standings", {
      headers: {
        'X-Auth-Token': '47e21f74b233433f9424263bcf49c5b7'
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.

        // Menyusun komponen card artikel secara dinamis
        var standingHTML = "";
        data.standings[0].table.forEach(function (club) {
          standingHTML += `
          <tr class="team-info" data-aos="fade-down" data-aos-duration ="300">
            <td>
              <img src="${club.team.crestUrl}" width=32 height=32 />
              <span style="font-weight:bold;padding-bottom:.25rem"> ${club.team.name} </span>
            </td>
            <td>${club.playedGames}</td>
            <td>${club.won}</td>
            <td>${club.draw}</td>
            <td>${club.lost}</td>
            <td>${club.goalsFor}</td>
            <td>${club.goalsAgainst}</td>
            <td>${club.goalDifference}</td>
            <td>${club.points}</td>
          </tr>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("standings").innerHTML = standingHTML;
      })
      .catch(error);
  }
}

function getTopScorers() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/PL/scorers?limit=3").then(function (response) {
      if (response) {
        response.json().then(function (raw) {
          var scorersHTML = "";
          let rank = 0;
          raw.scorers.forEach(function (data) {
            rank++;
            scorersHTML += `
            <div class = "col s12 m4 l4"  data-aos="fade-left" data-aos-delay = "1500">
              <div class="card">
                <div class="row">
                  <div class="col s6 m12 l12 card-image" >
                    <img src="${pathImagesTopScorer[rank - 1]}" width=50% class="center" style="height:auto">
                  </div>                  
                  <div class="col s6 m12 l12">
                    <div class="card-content">
                      <b> ${data.player.name} </b>
                      <hr>
                      ${data.numberOfGoals} Goals Scored
                      <hr>
                      <!-- Default shirt number --> 
                      Shirt Number : ${data.player.shirtNumber !== null ? data.player.shirtNumber : 0} <br>
                      Nationality :  ${data.player.nationality}   <br>
                      ${data.player.position} in <b> ${data.team.name} </b><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            rank = 0;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("top-scorers").innerHTML = scorersHTML;
        });
      }
    });
  }
  fetch(base_url + "competitions/PL/scorers?limit=3", {
    headers: {
      'X-Auth-Token': '47e21f74b233433f9424263bcf49c5b7'
    }
  })
    .then(status)
    .then(json)
    .then(function (raw) {
      var scorersHTML = "";
      let rank = 0;
      let duration = 200;

      raw.scorers.forEach(function (data) {
        rank++;
        duration += 500;
        scorersHTML += `
            <div class = "col s12 m4 l4" data-aos="fade-left" data-aos-duration= ${duration}>
              <div class="card">
                <div class="row">
                  <div class="col s6 m12 l12 card-image" >
                    <img src="${pathImagesTopScorer[rank - 1]}" width=50% class="center" style="height:auto">
                  </div>                  
                  <div class="col s6 m12 l12">
                    <div class="card-content">
                      <b> ${data.player.name} </b>
                      <hr>
                      ${data.numberOfGoals} Goals Scored
                      <hr>
                      <!-- Default shirt number --> 
                      Shirt Number : ${data.player.shirtNumber !== null ? data.player.shirtNumber : 0} <br>
                      Nationality :  ${data.player.nationality}   <br>
                      ${data.player.position} in <b> ${data.team.name} </b><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;

      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("top-scorers").innerHTML = scorersHTML;
    })
    .catch(error);

}

function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var teamHTML = "";
          data.standings[0].table.forEach(function (club) {
            teamHTML += `
            <div class="col s12 m6 l4" data-aos="fade-left" data-aos-delay="1000">
              <div class="card">
                <div class = "row">
                  <div class="col s4 m4 l4 top-space">
                    <img src="${club.team.crestUrl}" alt="${club.team.name} logo" width=100 height=100 style="padding-left:5px"/>
                  </div>
                  <div class="col s8 m8 l8 top-space">
                    <a href="./team.html?id=${club.team.id}" >
                      <span class="center top-space" style="font-size:1.2em;" >${club.team.name}</span>
                    </a>
                  </div>
                </div>
                <div class="card-content stats">
                  <table class="centered">
                    <thead>
                      <tr>
                        <th> Win  </th>
                        <th> Draw </th>
                        <th> Lost </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> ${club.won} </td>
                        <td> ${club.draw} </td>
                        <td> ${club.lost} </td>
                      <tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("team-list").innerHTML = teamHTML;
        });
      }
    });
  }
  fetch(base_url + "competitions/2021/standings", {
    headers: {
      'X-Auth-Token': '47e21f74b233433f9424263bcf49c5b7'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var teamHTML = "";
      console.log(data)
      let delayAnimation = 200;
      data.standings[0].table.forEach(function (club) {
        teamHTML += `
          <div class="col s12 m6 l4" data-aos="fade-left">
            <div class="card ">
              <div class = "row">
                <div class="col s4 m4 l4 top-space">
                  <img src="${club.team.crestUrl}" alt="${club.team.name} logo" width=100 height=100 style="padding-left:5px"/>
                </div>
                <div class="col s8 m8 l8 top-space">
                  <a href="./team.html?id=${club.team.id}">
                    <span class="center top-space" style="font-size:1.2em;">${club.team.name}</span>
                  </a>
                </div>
              </div>
              <div class="card-content stats">
                <table class="centered">
                  <thead>
                    <tr>
                      <th> Win  </th>
                      <th> Draw </th>
                      <th> Lost </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> ${club.won} </td>
                      <td> ${club.draw} </td>
                      <td> ${club.lost} </td>
                    <tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
              `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("team-list").innerHTML = teamHTML;
    })
    .catch(error);

}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "article/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var clubHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = clubHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "article/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var clubHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.result.cover}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.result.post_title}</span>
              ${snarkdown(data.result.post_content)}
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = clubHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function (article) {
      var description = article.post_content.substring(0, 100);
      articlesHTML += `
                  <div class="card">
                    <a href="./team.html?id=${article.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.cover}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (article) {
    clubHTML = '';
    var clubHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${article.cover}" />
      </div>
      <div class="card-content">
        <span class="card-title">${article.post_title}</span>
        ${snarkdown(article.post_content)}
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
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.get(id);
      })
      .then(function (article) {
        resolve(article);
      });
  });
}
