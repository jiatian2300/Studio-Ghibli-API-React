import React, { useState } from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";
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
                <Link
                    className="underline_btn"
                    to="/all-movies"
                    onClick={close_nav}
                >
                    All Movies
                </Link>
                <Link className="underline_btn" to="/quiz" onClick={close_nav}>
                    Quizzes
                </Link>
                <Link
                    className={btnDark ? "outline_btn_dark" : "outline_btn"}
                    to="/watch-list"
                    onClick={close_nav}
                >
                    My Watch List
                </Link>
                <img className="jiji" src={jiji} alt="Black Cat" />
                <img className="chu" src={chu_totoro} alt="chu totoro" />
            </div>
            <Link to="/" className="logo_wrapper" onClick={close_nav}>
                <Logo className="logo" />
            </Link>
            <button className="nav_toggle" onClick={toggle_nav}>
                <div className="hamburger"></div>
            </button>
        </nav>
    );

    function toggle_nav() {
        setOpenNav(!openNav);
    }

    function close_nav() {
        setOpenNav(false);
    }
}

export default Navbar;
