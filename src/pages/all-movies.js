import React, { useEffect, useState } from "react";
import Movie from "./components/movie";
import bush1 from "../images/bush1.png";
import bush2 from "../images/bush2.png";

function AllMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await fetch("https://ghibliapi.herokuapp.com/films");
            const items = await data.json();
            setMovies(items);
        };

        fetchItems();
    }, []);

    return (
        <div className="container">
            <div className="movies_list">
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
