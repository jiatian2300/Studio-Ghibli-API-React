import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noface from "../images/noface.png";
import { ReactComponent as Brush } from "../images/brush.svg";
import { generateQns, randomUniqueNum } from "../util/generateQuizQns";
import { getHighScore, saveHighScore } from "../util/localStorage";

function Quiz({ match, quizCat, setQuizCat }) {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [qnNo, setQnNo] = useState(1);
    const [currentQn, setCurrentQn] = useState({});
    const [highScore, setHighScore] = useState(0);

    const [startPage, setStart] = useState(false);
    const [endPage, setEnd] = useState(false);

    useEffect(() => {
        setQuizCat(match.params.category);
    }, [match, setQuizCat]);

    useEffect(() => {
        async function getQuestions() {
            const questions = await generateQns(quizCat);
            setQuestions(questions);
        }
        getQuestions();
        setHighScore(getHighScore(quizCat));
        setQuestions([]);
    }, [quizCat]);

    useEffect(() => {
        getNextQn();
    }, [questions]);

    useEffect(() => {
        // setQuestions([]);
    }, []);

    function getNextQn() {
        if (questions.length > 0) {
            const randomArray = randomUniqueNum(questions.length);
            const randomQnNo = randomArray[qnNo];
            setCurrentQn(questions[randomQnNo]);
        }
    }

    function checkAns(choice) {
        const correct = currentQn.option === currentQn.answer ? true : false;
        if (choice === correct) {
            setScore(score + 1);
        }

        if (qnNo === 10) {
            setEnd(true);
            if (score > highScore) {
                saveHighScore(score, quizCat);
                setHighScore(score);
            }
        }

        const timer = setTimeout(() => {
            setQnNo(qnNo + 1);
            getNextQn();
        }, 1000);

        return () => clearTimeout(timer);
    }

    function restart() {
        setQnNo(1);
        setScore(0);
        setStart(false);
        setEnd(false);
    }

    return (
        <div
            className={`container ${
                endPage
                    ? "end_screen"
                    : startPage
                    ? "quiz_screen"
                    : "start_screen"
            }`}
        >
            <div className="start">
                <Brush className="brush" />
                <h1>{quizCat}</h1>
                <button
                    className="btn-3d start_btn"
                    onClick={() => {
                        setStart(true);
                    }}
                >
                    START
                </button>
                <p>
                    High Score: <span>{highScore}</span>
                </p>
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
                        Q<u>n</u>
                        {qnNo}
                        <span>/10</span>
                    </div>
                    <div className="score">
                        <div className="stat_txt score_txt">Score</div>
                        <div className="score_value">{score}</div>
                    </div>
                </div>
                <div className="question">
                    <div className="question_txt">{currentQn.question}</div>
                    <img
                        src={noface}
                        alt="No Face Character"
                        className="noface"
                    />
                </div>
                <div className="options">
                    <button
                        className="true option_btn"
                        onClick={() => checkAns(true)}
                    >
                        TRUE
                    </button>
                    <button
                        className="false option_btn"
                        onClick={() => checkAns(false)}
                    >
                        FALSE
                    </button>
                </div>
            </div>
            <div className="end">
                <h1>Score: {score}</h1>
                <p>High Score: {highScore}</p>
                <button className="btn-3d" onClick={restart}>
                    Play Again
                </button>
                <Link to="../../quizzes" className="quit_btn">
                    ⇦ Categories
                </Link>
            </div>
        </div>
    );
}

export default Quiz;
