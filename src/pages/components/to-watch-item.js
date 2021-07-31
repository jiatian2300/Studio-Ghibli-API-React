import React from "react";

function ToWatchItem({ movie }) {
    return (
        <div className="row">
            <div>
                {/* <p className="icon">▢</p> */}
                <p className="icon tick">✔️</p>
                <p>{movie}</p>
            </div>
            <p className="cross">✕</p>
        </div>
    );
}

export default ToWatchItem;
