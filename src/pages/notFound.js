import React from "react";
import turtle from "../images/turtle.png";

function notFound() {
    return (
        <div className="notFound">
            <img src={turtle} alt="Sad Turtle" />
            <div className="shadow"></div>
            PAGE NOT FOUND
        </div>
    );
}

export default notFound;
