import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import chu_totoro from "../../images/chu_totoro.png";

function Navbar() {
    return (
        <nav class="nav_visibl">
            <div class="nav_left">
                <a href="./all-movies">All Movies</a>
                <a href="./quiz">Quizzes</a>
            </div>
            <a href="../" className="logo_wrapper">
                <Logo class="logo" fill="white" />
            </a>
            <div class="nav_right">
                <a class="cta_btn outline_btn" href="./watch-list">
                    My Watch List
                </a>
                <img src={chu_totoro} alt="chu totoro" />
            </div>
            <button class="nav_toggle">hi</button>
        </nav>
    );
}

export default Navbar;
