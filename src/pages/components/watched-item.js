import React from "react";

function WatchedItem({ movie }) {
    return (
        <div className="row">
            <div className="watchedItem">
                <p className="icon">⭮</p>
                <p>{movie}</p>
            </div>
        </div>
    );
}

export default WatchedItem;
