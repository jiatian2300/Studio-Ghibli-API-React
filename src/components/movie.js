import React, { useState, createRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ColorThief from "colorthief";
import { rgbToHex, hexToLuma } from "../util/color_generator";

function Movie({ movie }) {
    let poster = require(`../images/posters/${movie.title}.jpg`);
    const imgRef = createRef();

    const [theme, setTheme] = useState("black");
    const [bg, setBg] = useState("white");

    // generate the suitable background colour based on text colour of theme
    useEffect(() => {
        setBg(hexToLuma(theme));
    }, [theme]);

    return (
        <div className="movie" style={{ "--theme": theme, "--bg": bg }}>
            <img
                className="poster"
                ref={imgRef}
                alt="Poster"
                src={poster.default}
                onLoad={() => {
                    // use ColorTheif to obtain a dominant colour from the movie poster
                    const colorThief = new ColorThief();
                    const img = imgRef.current;
                    const result = colorThief.getColor(img, 35);
                    setTheme(rgbToHex(result[0], result[1], result[2]));
                }}
            />
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
