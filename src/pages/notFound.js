import React from "react";
import turtle from "../images/turtle.png";
import Navbar from "../components/navbar";

function notFound() {
    return (
        <div>
            <Navbar />
            <div className="notFound">
                <img src={turtle} alt="Sad Turtle" />
                <div className="shadow"></div>
                PAGE NOT FOUND
            </div>
        </div>
    );
}

export default notFound;
