import React, { useEffect, useState } from "react";
import Movie from "./components/movie";

function AllMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await fetch("https://ghibliapi.herokuapp.com/films");
            const items = await data.json();
            console.log(items);
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
        </div>
    );
}

export default AllMovies;
