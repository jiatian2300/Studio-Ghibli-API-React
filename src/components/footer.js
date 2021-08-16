import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container">
                <Link className="outline_btn" to="/watch-list">
                    🌟 My Watch List
                </Link>
                <Link className="underline_btn" to="/">
                    Home 🏠
                </Link>
                <Link className="underline_btn" to="/all-movies">
                    All Movies 🎬
                </Link>
                <Link className="underline_btn" to="/quizzes">
                    Quizzes 📝
                </Link>
                <button className="up" onClick={scrollToTop}>
                    <u>Back to Top</u>
                    <span>↑</span>
                </button>
            </div>
        </footer>
    );

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

export default Footer;
