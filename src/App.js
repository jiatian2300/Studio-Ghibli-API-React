import React, { useEffect, useState } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
//Pages
import Home from "./pages/home";
import AllMovies from "./pages/all-movies";
import Details from "./pages/details";
import WatchList from "./pages/watchlist";
import Quiz from "./pages/quiz";
import notFound from "./pages/notFound";
//Components
import Navbar from "./pages/components/navbar";
import Footer from "./pages/components/footer";

function App() {
    // find the current pathname and add it as a class to App to render the correct background
    const path = useLocation().pathname;
    const location = path.split("/")[1];

    /* ===========================================
        Handle save and load from local storage
    =============================================*/

    const [toWatch, setToWatch] = useState([]);
    const [watched, setWatched] = useState([]);

    useEffect(() => {
        function getLocalStorage() {
            if (localStorage.getItem("toWatch") === null) {
                localStorage.setItem("toWatch", JSON.stringify([]));
            } else {
                let local = JSON.parse(localStorage.getItem("toWatch"));
                setToWatch(local);
            }

            if (localStorage.getItem("watched") === null) {
                localStorage.setItem("watched", JSON.stringify([]));
            } else {
                let local = JSON.parse(localStorage.getItem("watched"));
                setWatched(local);
            }
        }
        getLocalStorage();
    }, []);

    useEffect(() => {
        function saveToLocalStorage() {
            localStorage.setItem("toWatch", JSON.stringify(toWatch));
            localStorage.setItem("watched", JSON.stringify(watched));
        }

        saveToLocalStorage();
    }, [toWatch, watched]);

    return (
        <div className={`App ${location}`}>
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
                <Route path="/quiz" component={Quiz}></Route>
                <Route component={notFound}></Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
