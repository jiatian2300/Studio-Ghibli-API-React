import React from "react";
import { Link } from "react-router-dom";
import train from "../images/train.gif";

function QuizLanding({ setQuizCat }) {
    return (
        <div className="container landing-wrapper">
            <h1>TRIVIA QUIZ</h1>
            <div className="gif-wrapper">
                <img src={train} alt="train arriving at station" />
            </div>
            <div className="categories">
                <Link
                    to="./quiz-start/people"
                    className="btn-3d people-1"
                    onClick={() => {
                        setQuizCat("people");
                    }}
                >
                    People
                </Link>
                <Link
                    to="./quiz-start/locations"
                    className="btn-3d location-2"
                    onClick={() => {
                        setQuizCat("locations");
                    }}
                >
                    Locations
                </Link>
                <Link
                    to="./quiz-start/species"
                    className="btn-3d species-3"
                    onClick={() => {
                        setQuizCat("species");
                    }}
                >
                    Species
                </Link>
                <Link
                    to="./quiz-start/vehicles"
                    className="btn-3d vehicle-4"
                    onClick={() => {
                        setQuizCat("vehicle");
                    }}
                >
                    Vehicle
                </Link>
            </div>
        </div>
    );
}

export default QuizLanding;
