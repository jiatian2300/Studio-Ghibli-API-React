import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home";
import Movie from "./pages/movie";
import Details from "./pages/details";
import WatchList from "./pages/watchlist";
import Quiz from "./pages/quiz";
import Navbar from "./pages/components/navbar";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/all-movies" component={Movie}></Route>
                    <Route path="/all-movies/:id" component={Details}></Route>
                    <Route path="/watch-list" component={WatchList}></Route>
                    <Route path="/quiz" component={Quiz}></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
