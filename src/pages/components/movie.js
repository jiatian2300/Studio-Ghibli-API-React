import React from "react";

function Movie() {
    let poster = require("../../posters/kiki.jpg");

    return (
        <div className="movie">
            <img className="poster" src={poster.default} alt="Poster" />
            <div className="text">
                <h3 className="title">Kiki's Delivery Service</h3>
                <p>(1989)</p>
                <a href="#" className="rounded_btn">
                    More Info ➞
                </a>
            </div>
        </div>
    );
}

export default Movie;
