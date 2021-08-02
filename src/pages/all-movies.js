import React, { useEffect, useState } from "react";
import Movie from "../components/movie";
import bush1 from "../images/bush1.png";
import bush2 from "../images/bush2.png";
import loader from "../images/walking.gif";

function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await fetch("https://ghibliapi.herokuapp.com/films");
            const items = await data.json();
            setMovies(items);
        };

        //display loader for 1s
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        fetchItems();
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container">
            <div className={`loader ${loading ? "" : "hidden"}`}>
                <img src={loader} alt="Loading..." />
                Loading...
            </div>
            <div className={`movies_list ${loading ? "hidden" : ""}`}>
                {movies.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </div>
            <div className="bushes">
                <img className="bush1" src={bush1} alt="bush" />
                <img className="bush2" src={bush2} alt="bush" />
            </div>
        </div>
    );
}

export default AllMovies;
