var dbPromised = idb.open("premier-league", 1, (upgradeDb) => {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id", autoIncrement: true
    });
    teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
});

let addFavorite = team => {
    dbPromised
        .then(db => {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(team);
            store.put(team);
            return tx.complete;
        })
        .then(() => {
            console.log("New Favorite team added");
        });
}

var deleteTeam = teamId => {
    dbPromised.then(db => {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(teamId);
        return tx.complete;
    }).then(() => {
        M.toast({ html: 'Team has been deleted!' });
        renderTeams();
    }).catch(err => {
        console.error('Error: ', err);
    });
}


let getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then((teams) => {
                resolve(teams);
            });
    });
}