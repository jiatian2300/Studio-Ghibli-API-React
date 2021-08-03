import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noface from "../images/noface.png";

function Quiz({ match, quizCat, setQuizCat }) {
    const [questions, setQuestions] = useState([]);

    // const [start, setStart] = useState(false);
    const [start, setStart] = useState(true);

    useEffect(() => {
        setQuizCat(match.params.category);
    }, [match, setQuizCat]);

    useEffect(() => {
        processQns();
    }, []);

    const fetchItems = async (target) => {
        const data = await fetch(target);
        const items = await data.json();
        return items;
    };

    const processQns = async () => {
        const films = await fetchItems(`https://ghibliapi.herokuapp.com/films`);

        const items = await fetchItems(
            `https://ghibliapi.herokuapp.com/${quizCat}`
        );

        items.map((item) => {
            const question = `${item.name} is a character from the movie, ${
                films[getRandomInt(films.length)].title
            }`;

            setQuestions((questions) => [...questions, question]); // MUST PASS questions AS A PARAMETER??
        });
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    return (
        <div className={`container ${start ? "quiz_screen" : "start_screen"}`}>
            <div className="start">
                <h1>{quizCat}</h1>
                <button
                    className="btn-3d start_btn"
                    onClick={() => {
                        setStart(true);
                    }}
                >
                    START
                </button>
                <p>High Score: 10</p>
            </div>
            <div className="quiz">
                <header>
                    <div className="quiz_title">{quizCat}</div>
                    <Link to="../../quizzes" className="quit_btn">
                        <u>Quit</u> ✕
                    </Link>
                </header>
                <div className="stats">
                    <div className="stat_txt">
                        Q<u>n</u>1<span>/10</span>
                    </div>
                    <div className="score">
                        <div className="stat_txt score_txt">Score</div>
                        <div className="score_value">8</div>
                    </div>
                </div>
                <div className="question">
                    <div className="question_txt">
                        {questions[getRandomInt(questions.length)]}
                    </div>
                    <img
                        src={noface}
                        alt="No Face Character"
                        className="noface"
                    />
                </div>
                <div className="options">
                    <button className="true option_btn">TRUE</button>
                    <button className="false option_btn">FALSE</button>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
