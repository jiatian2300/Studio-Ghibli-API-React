import React, { useEffect, useState } from "react";
import kodama from "../images/kodama.png";

function Details({ match }) {
    const [movie, setMovie] = useState({});
    const [poster, setPoster] = useState(require("../posters/placeholder.jpg"));

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await fetch(
                `https://ghibliapi.herokuapp.com/films/${match.params.id}`
            );
            const item = await data.json();
            setPoster(require(`../posters/${item.title}.jpg`));
            setMovie(item);
        };

        fetchMovie();
    }, []);

    return (
        <div className="container wrapper">
            <div className="details_wrapper">
                <div className="poster_wrapper">
                    <img className="poster" src={poster.default} alt="Poster" />
                </div>
                <div className="content">
                    <p className="movie-title">{movie.title}</p>
                    <p className="jap-title">{movie.original_title}</p>
                    <p className="year">({movie.release_date})</p>
                    <p className="staff">
                        Director: <span className="name">{movie.director}</span>
                    </p>
                    <p className="staff">
                        Producer: <span className="name">{movie.producer}</span>
                    </p>
                    <div className="buttons">
                        <button className="want basic_btn_dark">
                            Want to Watch <span>🍿</span>
                        </button>
                        <button className="add basic_btn_light">
                            Add to Watched <span>🎬</span>
                        </button>
                        <button className="watched basic_btn_light">
                            Finshed Watching ✔️
                        </button>
                    </div>
                </div>
            </div>
            <div className="description">
                <img src={kodama} alt="kodama" className="kodama" />
                {movie.description}
            </div>
        </div>
    );
}

export default Details;
