import React, { useState } from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import chu_totoro from "../../images/chu_totoro.png";
import jiji from "../../images/jiji.png";

function Navbar() {
    const [openNav, setOpenNav] = useState(false);
    const [btnDark, setBtnDark] = useState(
        window.innerWidth < 900 ? true : false
    );

    window.onresize = () => {
        if (window.innerWidth < 900) {
            setBtnDark(true);
        } else {
            setBtnDark(false);
        }
    };

    return (
        <nav className={`container ${openNav ? "nav_visible" : null}`}>
            <div className="triangle"></div>
            <div className="nav_links">
                <a className="underline_btn" href="./all-movies">
                    All Movies
                </a>
                <a className="underline_btn" href="./quiz">
                    Quizzes
                </a>
                <a
                    className={btnDark ? "outline_btn_dark" : "outline_btn"}
                    href="./watch-list"
                >
                    My Watch List
                </a>
                <img className="jiji" src={jiji} alt="Black Cat" />
                <img className="chu" src={chu_totoro} alt="chu totoro" />
            </div>
            <a href="../" className="logo_wrapper">
                <Logo className="logo" />
            </a>
            <button className="nav_toggle" onClick={toggle_nav}>
                <div className="hamburger"></div>
            </button>
        </nav>
    );

    function toggle_nav() {
        setOpenNav(!openNav);
    }
}

export default Navbar;
