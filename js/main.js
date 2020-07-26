let pathImagesTopScorer = ["../assets/first-top-scorer.png", "../assets/second-top-scorer.png", "../assets/third-top-scorer.png"]


let renderStandings = () => {
    showLoader();
    let standings = getStandings();
    standings.then(data => {
        let tableStanding =
            `<table class="responsive-table highlight" >
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Matches</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody id="data-standing">
            </tbody>
        </table>`;


        let standingHTML = "";
        data.standings[0].table.forEach(function (club) {
            standingHTML += `
          <tr class="team-info" data-aos="fade-down" data-aos-delay ="300">
            <td style="padding:.5rem">
              <img src="${club.team.crestUrl}" width=32 height=32 class="team-logo" alt="${club.team.name}"/>
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
          `
        });
        // Sisipkan komponen card ke dalam elemen dengan id #standings

        document.getElementById("standings").innerHTML = tableStanding;
        document.getElementById("data-standing").innerHTML = standingHTML;
    });
    hideLoader();
}

let renderTopScorers = () => {
    showLoader();

    let scorersHTML = "";
    let duration = 0;
    let rank = 0;

    let scorers = getTopScorers();

    scorers.then(raw => {
        raw.scorers.forEach(function (data) {
            rank++;
            duration += 200;

            scorersHTML += `
             <div class = "col s12 m4 l4" data-aos="fade-left" data-aos-duration= ${duration}>
              <div class="card">
                <div class="row">
                  <div class="col s6 m12 l12 card-image" >
                    <img src="${pathImagesTopScorer[rank - 1]}" width=50% class="center-align" style="height:auto" alt="player ${rank - 1}">
                  </div>                  
                  <div class="col s6 m12 l12">
                    <div class="card-content">
                      <b> <p class="center-align" style="font-size:12px"> ${data.player.name} </p> </b>
                      <hr>
                      ${data.numberOfGoals} Goals Scored
                      <hr>
                      <!-- Default shirt number --> 
                      Shirt Number : ${data.player.shirtNumber !== null ? data.player.shirtNumber : 0} <br>
                      Nationality  ${data.player.nationality}   <br>
                      ${data.player.position} in <b> ${data.team.name} </b><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #top-scorers
        document.getElementById("top-scorers").innerHTML = scorersHTML;
    });
    hideLoader();
}

let renderTeams = () => {
    showLoader();
    var page = window.location.hash.substr(1);
    let teams = page === 'saved' ? getFavTeams() : getStandings();
    teams.then(data => {
        let teamHTML = "";
        let delayAnimation = 200;
        console.log(data);

        if (page === 'saved') {
            teamHTML = `<h3> My Favorite Teams </h3>`;
            // If the user added any favorite team
            data.length > 0 ?
                data.forEach(club => {
                    teamHTML += `
                        <div class="col s12 m6 l4" data-aos="fade-left">
                            <div class="card small center-align">
                                <div class = "card-content grey lighten-4" style="height:100px"></div>
                                <div class="card-content" style="height:150px">
                                    <a href="./team.html?id=${club.id}">
                                        <div class="top-space" style="font-size:1.2em;">${club.name}</div>
                                    </a>
                                </div>
                                <img src="${club.crestUrl}" alt="${club.name} logo" class="team-preview "/>
                                <div class="card-action right-align">
                                    <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${club.id})"><i class="material-icons left">delete</i>Delete</a>
                                </div>
                            </div>
                        </div>
                    `;
                })
                // If the user hasn't added any fav team
                : teamHTML = `<div class="container" style="height:80vh"> 
                                <div class="center">
                                <img src="../assets/soccer-standing.png" width=128 alt="no-fav-team"> <br>
                                    No favorite teams added
                                </div>
                            </div>`;
        } else {
            data.standings[0].table.forEach(club => {
                teamHTML += `
                <div class="col s12 m6 l4" data-aos="fade-left">
                    <div class="card center-align" style="height:300px">
                        <div class="card-content grey lighten-4" style="height:100px"></div>
                        <div class="card-content" style="height:150px">
                            <a href="./team.html?id=${club.team.id}">
                                <br>
                                <div class="top-space" style="font-size:1.2em">${club.team.name}</div>
                            </a>
                        </div>

                        <img src="${club.team.crestUrl}" alt="${club.team.name} logo" class="team-preview " />
                    </div>
                </div>`;
            });
        }
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("team-list").innerHTML = teamHTML;
    })

    hideLoader();
}

let renderTeamById = () => {
    showLoader();

    let team = getTeamById();
    team.then(data => {
        // Menyusun komponen card artikel secara dinamis
        let teamHTML = `
        <div class="card top-space">
            <div class="row card-content">
                <div class="col s12 m4 l4 center-align">
                    <img src="${data.crestUrl}" alt="${data.shortName}" width=128px height=128px/>
                </div>
            <div class="col s12 m8 l8">
                <div class="center-align" style="padding:8px"> <b> ${data.name} </b> </div>
                <i class="material-icons" style="font-size:.8rem"> sports_soccer </i>  ${data.venue} <br><br>
                    <i class="material-icons" style="font-size:.8rem"> location_on </i>  ${data.address}  <br><br>
                        <i class="material-icons" style="font-size:.8rem"> phone </i> ${data.phone !== null ? data.phone : 'No contact'}  <br><br>
                            <b> Official Website : </b> <a href="${data.website}"> ${data.website}  </a> 
                    </div>
                </div>
            </div>
        </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
    });
    hideLoader();
}

let renderPlayers = () => {
    showLoader();

    let players = getTeamById();
    players.then(data => {
        // Menyusun komponen card artikel secara dinamis
        var playerHTML = "";
        let delayAnimation = 200;
        data.squad.forEach(function (player) {
            playerHTML += player.position !== null && player.nationality.length < 8 ?
                `<div class="col s12 m3 l3">              
                    <div class="card text-black">
                        <div class="card-content blue lighten-5 details">
                            <b> ${player.name.substr(0, 20)} </b><br>
                            ${player.position}<br> 
                        </div>
                        <div class="card-content details row">
                            <div class="col s6 m6 l6">Nationality</div>
                            <div class="col s6 m6 l6 right-align">
                                ${player.nationality}
                            </div>
                        </div>
                    </div>
                </div>
            ` : '';
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("player-list").innerHTML = playerHTML;
    })
    hideLoader();
}

let renderMatches = () => {
    showLoader();

    let matchesPerTeam = getMatchesByTeam();
    matchesPerTeam.then(response => {
        let matchHTML;
        response.matches.forEach((data) => {
            console.log(data);
            matchHTML +=
                `<div class="container">
                        <div class="row card">
                            <div class="card-content center-align">
                                <div class="col s5"> ${data.homeTeam.name} </div>
                                <div class="col s1" style="padding:0"> VS </div>
                                <div class="col s5"> ${data.awayTeam.name} </div>
                            </div>
                            <div class="card-content right-align">
                                <!-- Only get the date -->
                            ${data.utcDate.substr(0, 10)}
                            </div>
                        </div>
                    </div>
            `
        });
        // Sisipkan komponen card ke dalam elemen dengan id #next-match-list
        document.getElementById("next-match-list").innerHTML = matchHTML;
    });
    hideLoader();
}

var deleteTeamListener = teamId => {
    var c = confirm("Delete this team?")
    if (c == true) {
        deleteTeam(teamId);
    }
}