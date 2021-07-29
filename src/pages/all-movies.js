import React from "react";
import Movie from "./components/movie";

function AllMovies() {
    return (
        <div className="container">
            <div className="movies_list">
                <Movie />
                <Movie />
                <Movie />
                <Movie />
                <Movie />
                <Movie />
                <Movie />
                <Movie />
                <Movie />
            </div>
        </div>
    );
}

export default AllMovies;
