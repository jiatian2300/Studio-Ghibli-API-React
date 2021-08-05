import React from "react";

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
