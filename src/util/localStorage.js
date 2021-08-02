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
