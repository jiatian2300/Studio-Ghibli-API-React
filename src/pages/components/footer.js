import React from "react";

function Footer() {
    return (
        <footer>
            <div className="container">
                <a className="outline_btn" href="./watch-list">
                    🌟 My Watch List
                </a>
                <a className="underline_btn" href="./">
                    Home 🏠
                </a>
                <a className="underline_btn" href="./all-movies">
                    All Movies 🎬
                </a>
                <a className="underline_btn" href="./quiz">
                    Quizzes 📝
                </a>
                <button className="up" onClick={scrollToTop}>
                    <u>Back to Top</u>
                    <span>🠕</span>
                </button>
            </div>
        </footer>
    );

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

export default Footer;
