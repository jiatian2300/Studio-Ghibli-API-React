import React from "react";
import rewatch from "../images/reload.svg";

function WatchedItem({ movie, toWatch, setToWatch, watched, setWatched }) {
    const watchAgain = () => {
        setWatched(watched.filter((e) => e !== movie));
        setToWatch([...toWatch, movie]);
    };

    return (
        <div className="row">
            <div className="watchedItem">
                <img
                    src={rewatch}
                    className="icon rewatch"
                    onClick={watchAgain}
                    alt="rewatch"
                ></img>
                <p className="rewatch_txt">{movie}</p>
            </div>
        </div>
    );
}

export default WatchedItem;
