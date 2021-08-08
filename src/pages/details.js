import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import kodama from "../images/kodama.png";
import loader from "../images/music.gif";

function Details({ match, toWatch, setToWatch, watched, setWatched }) {
    const [currentIndex, setCurrentIndex] = useState("");
    const [movie, setMovie] = useState({});
    const [poster, setPoster] = useState(
        require("../images/posters/placeholder.jpg")
    );
    const [target, setTarget] = useState([]);
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
        window.scrollTo(0, 0);
    }, [target]);

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
            const all_data = await fetch(
                `https://ghibliapi.herokuapp.com/films`
            );
            const all_movie = await all_data.json();
            try {
                setPoster(require(`../images/posters/${item.title}.jpg`));
            } catch (e) {
                setError(true);
            }
            setMovie(item);
            moveOn(all_movie);
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

    async function moveOn(all_movie) {
        const currentIndex = await all_movie.findIndex(
            (item) => item.id === match.params.id
        );
        if (currentIndex === 0) {
            setTarget([
                `/movie-details/${all_movie[currentIndex].id}`,
                `/movie-details/${all_movie[currentIndex + 1].id}`,
            ]);
            setCurrentIndex("first");
        } else if (currentIndex === all_movie.length - 1) {
            setTarget([
                `/movie-details/${all_movie[currentIndex - 1].id}`,
                `/movie-details/${all_movie[currentIndex].id}`,
            ]);
            setCurrentIndex("last");
        } else {
            setTarget([
                `/movie-details/${all_movie[currentIndex - 1].id}`,
                `/movie-details/${all_movie[currentIndex + 1].id}`,
            ]);
            setCurrentIndex("");
        }
    }

    return (
        <div className="container details-wrapper">
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
            <div className={`move_on ${loading ? "hidden" : ""}`}>
                <Link
                    className={`quit_btn ${
                        currentIndex === "first" ? "hidden" : ""
                    }`}
                    to={target[0]}
                >
                    ← Previous Movie
                </Link>
                <Link
                    className={`quit_btn ${
                        currentIndex === "last" ? "hidden" : ""
                    }`}
                    to={target[1]}
                >
                    Next Movie →
                </Link>
            </div>
        </div>
    );
}

export default Details;
