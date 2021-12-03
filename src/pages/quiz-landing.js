import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import train from "../images/train.gif";
import cloud1 from "../images/cloud_1.png";
import cloud2 from "../images/cloud_2.png";
import Navbar from "../components/navbar";

function QuizLanding({ setQuizCat }) {
    useEffect(() => {
        setQuizCat("");
    }, [setQuizCat]);

    return (
        <div>
            <Navbar />
            <div className="container landing-wrapper">
                <h1>TRIVIA QUIZ</h1>
                <div className="quiz_clouds">
                    <img src={cloud1} alt="cloud" className="cloud1" />
                    <img src={cloud2} alt="cloud" className="cloud2" />
                </div>
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
                </div>
            </div>
        </div>
    );
}

export default QuizLanding;
