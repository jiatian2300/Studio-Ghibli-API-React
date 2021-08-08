import React, { useEffect, useState } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
//Pages
import Home from "./pages/home";
import AllMovies from "./pages/all-movies";
import Details from "./pages/details";
import WatchList from "./pages/watchlist";
import Quiz from "./pages/quiz";
import QuizLanding from "./pages/quiz-landing";
import notFound from "./pages/notFound";
//Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";
//Utils
import {
    getLocalToWatch,
    getLocalWatched,
    saveToLocalStorage,
} from "./util/localStorage";

function App() {
    // find the current pathname and add it as a class to App to render the correct background
    const path = useLocation().pathname;
    const location = path.split("/")[1];

    const [toWatch, setToWatch] = useState([]);
    const [watched, setWatched] = useState([]);

    const [quizCat, setQuizCat] = useState("people");

    /* ===========================================
        Handle save and load from local storage
    =============================================*/
    useEffect(() => {
        setToWatch(getLocalToWatch());
        setWatched(getLocalWatched());
    }, []);

    useEffect(() => {
        saveToLocalStorage(toWatch, watched);
    }, [toWatch, watched]);

    return (
        <div className={`App ${location} ${quizCat}`}>
            <Navbar />
            <Switch>
                <Redirect from="/" exact to="/home" />
                <Route path="/home" exact component={Home}></Route>
                <Route path="/all-movies" exact component={AllMovies}></Route>
                <Redirect from="/all-movies/:id" to="/movie-details/:id" />
                <Route
                    path="/movie-details/:id"
                    render={({ match }) => (
                        <Details
                            match={match}
                            toWatch={toWatch}
                            setToWatch={setToWatch}
                            watched={watched}
                            setWatched={setWatched}
                        ></Details>
                    )}
                ></Route>
                <Route path="/watch-list">
                    <WatchList
                        toWatch={toWatch}
                        setToWatch={setToWatch}
                        watched={watched}
                        setWatched={setWatched}
                    ></WatchList>
                </Route>
                <Route path="/quizzes">
                    <QuizLanding setQuizCat={setQuizCat}></QuizLanding>
                </Route>
                <Route
                    path="/quiz-start/:category"
                    render={({ match }) => (
                        <Quiz
                            quizCat={quizCat}
                            setQuizCat={setQuizCat}
                            match={match}
                        ></Quiz>
                    )}
                ></Route>
                <Route component={notFound}></Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
