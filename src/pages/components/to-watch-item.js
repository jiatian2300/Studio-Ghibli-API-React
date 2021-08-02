import React from "react";

function ToWatchItem({ movie, toWatch, setToWatch, watched, setWatched }) {
    const addWatched = () => {
        setWatched([...watched, movie]);
        if (toWatch.includes(movie)) {
            setToWatch(toWatch.filter((e) => e !== movie));
        }
    };

    const removeToWatch = () => {
        setToWatch(toWatch.filter((e) => e !== movie));
    };

    return (
        <div className="row">
            <div>
                <p className="icon tick" onClick={addWatched}>
                    ✔️
                </p>
                <p className="watch_txt">{movie}</p>
            </div>
            <p className="icon cross" onClick={removeToWatch}>
                ✕
            </p>
        </div>
    );
}

export default ToWatchItem;
