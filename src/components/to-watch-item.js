import React from "react";
import tick from "../images/check.svg";

function ToWatchItem({
    movie,
    toWatch,
    setToWatch,
    watched,
    setWatched,
    provided,
    snapshot,
}) {
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
        <div
            className={`row ${snapshot.isDragging && "dragging"}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            <div>
                <img
                    src={tick}
                    className="icon tick"
                    onClick={addWatched}
                    alt="tick"
                ></img>
                <p className="watch_txt">{movie}</p>
            </div>
            <div className="icon cross" onClick={removeToWatch}>
                <p>✕</p>
            </div>
        </div>
    );
}

export default ToWatchItem;
