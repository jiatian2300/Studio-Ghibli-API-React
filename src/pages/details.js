import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import kodama from "../images/kodama.png";
import loader from "../images/music.gif";

function Details({ match, toWatch, setToWatch, watched, setWatched }) {
    const [movie, setMovie] = useState({});
    const [poster, setPoster] = useState(require("../posters/placeholder.jpg"));
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [wantBtnState, setWantState] = useState("Want to Watch");
    const [watchedState, setWatchedState] = useState(false);

    useEffect(() => {
        //display loader for 1s
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (toWatch.includes(movie.title)) {
            setWantState("Remove from Watch");
        } else {
            setWantState("Want to Watch");
        }
        if (watched.includes(movie.title)) {
            setWatchedState(true);
        } else {
            setWatchedState(false);
        }
    }, [movie, toWatch, watched]);

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

    // if trying to load a page with a invalid id, a error will be thrown when
    // trying to load the poster. Hence, need to redirect to error page
    if (error) {
        return <Redirect to="/page-not-found" />;
    }

    const addToWatch = () => {
        if (!toWatch.includes(movie.title)) {
            setToWatch([...toWatch, movie.title]);
        } else {
            setToWatch(toWatch.filter((e) => e !== movie.title));
        }
    };

    const addWatched = () => {
        setWatched([...watched, movie.title]);
        if (toWatch.includes(movie.title)) {
            setToWatch(toWatch.filter((e) => e !== movie.title));
        }
    };

    const watchAgain = () => {
        setWatched(watched.filter((e) => e !== movie.title));
        setToWatch([...toWatch, movie.title]);
    };

    return (
        <div className="container wrapper">
            <div className={`loader ${loading ? "" : "hidden"}`}>
                <img src={loader} alt="Loading..." />
                Loading...
            </div>
            <div className={`details_wrapper ${loading ? "hidden" : ""}`}>
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
                            className={`basic_btn_dark ${
                                watchedState ? "none" : ""
                            }`}
                            onClick={addToWatch}
                        >
                            {wantBtnState} <span>🍿</span>
                        </button>
                        <button
                            className={`basic_btn_light ${
                                watchedState ? "none" : ""
                            }`}
                            onClick={addWatched}
                        >
                            Add to Watched <span>🎬</span>
                        </button>
                        <p className={` ${watchedState ? "" : "none"}`}>
                            Finshed Watching ✔️
                        </p>
                        <button
                            className={`basic_btn_light ${
                                watchedState ? "" : "none"
                            }`}
                            onClick={watchAgain}
                        >
                            Watch Again 💖
                        </button>
                    </div>
                </div>
            </div>
            <div className={`description ${loading ? "hidden" : ""}`}>
                <img src={kodama} alt="kodama" className="kodama" />
                {movie.description}
            </div>
        </div>
    );
}

export default Details;
