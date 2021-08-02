import React from "react";

function WatchedItem({ movie, toWatch, setToWatch, watched, setWatched }) {
    const watchAgain = () => {
        setWatched(watched.filter((e) => e !== movie));
        setToWatch([...toWatch, movie]);
    };

    return (
        <div className="row">
            <div className="watchedItem">
                <p className="icon rewatch" onClick={watchAgain}>
                    ⭮
                </p>
                <p className="rewatch_txt">{movie}</p>
            </div>
        </div>
    );
}

export default WatchedItem;
