import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noface from "../images/noface.png";

function Quiz({ match, quizCat, setQuizCat }) {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [qnNo, setQnNo] = useState(1);
    const [currentQn, setCurrentQn] = useState({});

    // const [start, setStart] = useState(false);
    const [startPage, setStart] = useState(true);

    useEffect(() => {
        setQuizCat(match.params.category);
    }, [match, setQuizCat]);

    useEffect(() => {
        getNextQn();
    }, [questions]);

    useEffect(() => {
        generateQns();
    }, []);

    const fetchItems = async (target) => {
        const data = await fetch(target);
        const items = await data.json();
        return items;
    };

    const generateQns = async () => {
        const films = await fetchItems(`https://ghibliapi.herokuapp.com/films`);
        const items = await fetchItems(
            `https://ghibliapi.herokuapp.com/${quizCat}`
        );

        items.map((item) => {
            const film_url = item.films[0].split("/");
            const film_ans = films.filter(
                (x) => x.id === film_url[film_url.length - 1]
            );
            //ensure that there is always a 50% chance of each of the options being correct
            const film_option =
                Math.random() < 0.5
                    ? films[getRandomInt(films.length)]
                    : film_ans[0];

            const question = `${item.name} is a character from the movie, ${film_option.title}`;

            setQuestions((questions) => [
                ...questions,
                {
                    question: question,
                    option: film_option.id,
                    answer: film_ans[0].id,
                },
            ]); // MUST PASS questions AS A PARAMETER??
            return true;
        });
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getNextQn() {
        if (questions.length > 0) {
            setCurrentQn(questions[getRandomInt(questions.length)]);
        }
    }

    function checkAns(choice) {
        const correct = currentQn.option === currentQn.answer ? true : false;
        if (choice === correct) {
            setScore(score + 1);
        }
        setQnNo(qnNo + 1);
        getNextQn();
    }

    return (
        <div
            className={`container ${
                startPage ? "quiz_screen" : "start_screen"
            }`}
        >
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
        </div>
    );
}

export default Quiz;
