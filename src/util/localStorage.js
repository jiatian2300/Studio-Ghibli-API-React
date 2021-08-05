export function getLocalToWatch() {
    if (localStorage.getItem("toWatch") === null) {
        localStorage.setItem("toWatch", JSON.stringify([]));
    } else {
        let local = JSON.parse(localStorage.getItem("toWatch"));
        return local;
    }
}

export function getLocalWatched() {
    if (localStorage.getItem("watched") === null) {
        localStorage.setItem("watched", JSON.stringify([]));
    } else {
        let local = JSON.parse(localStorage.getItem("watched"));
        return local;
    }
}

export function saveToLocalStorage(toWatch, watched) {
    localStorage.setItem("toWatch", JSON.stringify(toWatch));
    localStorage.setItem("watched", JSON.stringify(watched));
}

export function getHighScore(cat) {
    if (localStorage.getItem("highscore") === null) {
        localStorage.setItem(
            "highscore",
            JSON.stringify([
                { category: "people", score: 0 },
                { category: "locations", score: 0 },
                { category: "species", score: 0 },
            ])
        );
    }
    let local = JSON.parse(localStorage.getItem("highscore"));
    const catIndex = local.findIndex((obj) => obj.category === cat);
    return local[catIndex].score;
}

export function saveHighScore(highscore, cat) {
    let local = JSON.parse(localStorage.getItem("highscore"));
    const catIndex = local.findIndex((obj) => obj.category === cat);
    local[catIndex].score = highscore;
    localStorage.setItem("highscore", JSON.stringify(local));
}
