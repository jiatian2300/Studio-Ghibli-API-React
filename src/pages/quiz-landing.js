import React from "react";
import train from "../images/train.gif";

function QuizLanding() {
    return (
        <div className="container wrapper">
            <h1>TRIVIA QUIZ</h1>
            <div className="gif-wrapper">
                <img src={train} alt="train arriving at station" />
            </div>
            <div className="categories">
                <a href="./quiz-start" className="btn-3d people-1">
                    People
                </a>
                <a href="./quiz-start" className="btn-3d location-2">
                    Locations
                </a>
                <a href="./quiz-start" className="btn-3d species-3">
                    Species
                </a>
                <a href="./quiz-start" className="btn-3d vehicle-4">
                    Vehicle
                </a>
            </div>
        </div>
    );
}

export default QuizLanding;
