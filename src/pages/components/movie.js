import React from "react";
import { Link } from "react-router-dom";

function Movie({ movie }) {
    // let poster = require(`../../posters/Whisper of the Heart.jpg`);
    let poster = require(`../../posters/${movie.title}.jpg`);

    return (
        <div className="movie">
            <img className="poster" src={poster.default} alt="Poster" />
            <div className="text">
                <h3 className="title">{movie.title}</h3>
                <p>({movie.release_date})</p>
                <Link className="rounded_btn" to={`/all-movies/${movie.id}`}>
                    More Info ➞
                </Link>
            </div>
        </div>
    );
}

export default Movie;
