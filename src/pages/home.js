import React from "react";
import totoro from "../images/totoro.png";
import cloud from "../images/cloud.png";
import kiki from "../images/kiki_broom.gif";
// import kiki from "../images/kiki.png";
import soot from "../images/soot.png";
import fire from "../images/fire.png";
import scarecrow from "../images/scarecrow.png";

function Home() {
    return (
        <div className="container">
            <section className="hero">
                <div className="hero_img">
                    <img src={totoro} alt="Totoro" />
                </div>
                <div className="title">
                    <h1 className="studio_txt">Studio</h1>
                    <h1 className="ghibli_txt">Ghibli</h1>
                </div>
            </section>

            <section className="intro">
                <img className="cloud cloud_one" src={cloud} alt="cloud" />
                <h4>
                    Find out more about all Studio Glibli movies, save movies to
                    your own watch list and test your Ghibli knowledge through
                    the trivia quizzes!
                </h4>
                <img className="cloud cloud_two" src={cloud} alt="cloud" />
                <img className="kiki" src={kiki} alt="girl flying on broom" />
            </section>

            <main>
                <div className="about">
                    <header>
                        <img src={soot} alt="soot character" />
                        <h2>About</h2>
                    </header>
                    <p>
                        <u>Studio Ghibli Inc.</u> (株式会社スタジオジブリ) is a
                        Japanese animation film studio. The studio is best known
                        for its animated feature films, and has also produced
                        several short subjects, television commercials, and one
                        television film.
                    </p>
                </div>
                <div className="ghibli">
                    <header>
                        <h2>Ghibli</h2>
                        <img src={fire} alt="soot character" />
                    </header>
                    <p>
                        The name <u>"Ghibli"</u> was chosen by Miyazaki from the
                        Italian noun ghibli, based on the Libyan Arabic name for
                        hot desert wind, the idea being the studio would "blow a
                        new wind through the anime industry".
                    </p>
                </div>
                <img src={scarecrow} alt="scarecrow" className="scarecrow" />
            </main>
        </div>
    );
}

export default Home;
