import React from "react";
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

    return (
        <div className={`App ${location}`}>
            <Navbar />
            <Switch>
                <Redirect from="/" exact to="/home" />
                <Route path="/home" exact component={Home}></Route>
                <Route path="/all-movies" exact component={AllMovies}></Route>
                <Redirect from="/all-movies/:id" to="/movie-details/:id" />
                <Route path="/movie-details/:id" component={Details}></Route>
                <Route path="/watch-list" component={WatchList}></Route>
                <Route path="/quiz" component={Quiz}></Route>
                <Route component={notFound}></Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
