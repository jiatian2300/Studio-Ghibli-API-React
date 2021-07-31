import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import kodama from "../images/kodama.png";

function Details({ match }) {
    const [toWatch, setToWatch] = useState([]);
    const [watched, setWatched] = useState([]);

    const [movie, setMovie] = useState({});
    const [poster, setPoster] = useState(require("../posters/placeholder.jpg"));
    const [error, setError] = useState(false);

    /* ===========================================
        Handle save and load from local storage
    =============================================*/

    useEffect(() => {
        function getLocalStorage() {
            if (localStorage.getItem("toWatch") === null) {
                localStorage.setItem("toWatch", JSON.stringify([]));
            } else {
                let local = JSON.parse(localStorage.getItem("toWatch"));
                setToWatch(local);
            }

            if (localStorage.getItem("watched") === null) {
                localStorage.setItem("watched", JSON.stringify([]));
            } else {
                let local = JSON.parse(localStorage.getItem("watched"));
                setWatched(local);
            }
        }
        getLocalStorage();
    }, []);

    useEffect(() => {
        function saveToLocalStorage() {
            localStorage.setItem("toWatch", JSON.stringify(toWatch));
            localStorage.setItem("watched", JSON.stringify(watched));
        }

        saveToLocalStorage();
    }, [toWatch, watched]);

    const addToWatch = () => {
        setToWatch([...toWatch, movie.title]);
    };

    const addWatched = () => {
        setWatched([...watched, movie.title]);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await fetch(
                `https://ghibliapi.herokuapp.com/films/${match.params.id}`
            );
            const item = await data.json();
            try {
                setPoster(require(`../posters/${item.title}.jpg`));
            } catch (e) {
                setError(true);
            }
            setMovie(item);
        };

        fetchMovie();
    }, [match]);

    // if trying to load a page with a invalid id, redirect
    if (error) {
        return <Redirect to="/page-not-found" />;
    }

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
                        <button
                            className="want basic_btn_dark"
                            onClick={addToWatch}
                        >
                            Want to Watch <span>🍿</span>
                        </button>
                        <button
                            className="add basic_btn_light"
                            onClick={addWatched}
                        >
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
