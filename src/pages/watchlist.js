import React, { useEffect, useState } from "react";
import duck from "../images/duck.png";
import bath from "../images/bath.png";
import tots from "../images/tots.png";
import ToWatchItem from "./components/to-watch-item";
import WatchedItem from "./components/watched-item";

function WatchList() {
    const [toWatch, setToWatch] = useState([]);
    const [watched, setWatched] = useState([]);

    useEffect(() => {
        getLocalStorage();
    });

    useEffect(() => {
        saveToLocalStorage();
    }, [toWatch, watched]);

    function getLocalStorage() {
        if (localStorage.getItem("toWatch") === null) {
            localStorage.setItem("toWatch", JSON.stringify([]));
        } else {
            let local = JSON.parse(localStorage.getItem("toWatch"));
            setToWatch(local);
        }

        if (localStorage.getItem("watched") === null) {
            localStorage.setItem("watched", JSON.stringify([]));
        } else {
            let local = JSON.parse(localStorage.getItem("watched"));
            setWatched(local);
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem("toWatch", JSON.stringify(toWatch));
        localStorage.setItem("watched", JSON.stringify(watched));
    }

    return (
        <div className="container watch-list-wrapper">
            <div className="to-watch">
                <header>
                    <div className="list-title">
                        To Watch <span>List</span>
                    </div>
                    <img className="duck" src={duck} alt="Duck" />
                </header>
                <div className="to-watch-list">
                    {toWatch.map((movie) => (
                        <ToWatchItem movie={movie}></ToWatchItem>
                    ))}
                </div>
            </div>
            <div className="watched">
                <header>
                    <img src={bath} alt="Bath" />
                    <div className="list-title">
                        Watched <span>List</span>
                    </div>
                </header>
                <div className="watched-list">
                    {watched.map((movie) => (
                        <WatchedItem movie={movie}></WatchedItem>
                    ))}
                </div>
            </div>
            <img className="toters" src={tots} alt="small white Totoros" />
            <div className="bg"></div>
        </div>
    );
}

export default WatchList;
