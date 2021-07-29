import React from "react";

function Details() {
    let poster = require("../posters/kiki.jpg");

    return (
        <div className="container">
            <div className="details">
                <img className="poster" src={poster.default} alt="Poster" />
                <div className="content">
                    <p className="movie-title">Castle in the Sky</p>
                    <p className="jap-title">天空の城ラピュタ</p>
                    <p className="year">(1986)</p>
                    <p className="staff">
                        Director: <span className="name">Hayao Miyazaki</span>
                    </p>
                    <p className="staff">
                        Producer: <span className="name">Isao Takahata</span>
                    </p>
                    <div className="buttons">
                        <button className="want basic_btn">
                            Want to Watch 🍿
                        </button>
                        <button className="add basic_btn">
                            Add to Watched 🎬
                        </button>
                        <button className="watched basic_btn">
                            Finshed Watching ✔️
                        </button>
                    </div>
                </div>
            </div>
            <div className="description">
                The orphan Sheeta inherited a mysterious crystal that links her
                to the mythical sky-kingdom of Laputa. With the help of
                resourceful Pazu and a rollicking band of sky pirates, she makes
                her way to the ruins of the once-great civilization. Sheeta and
                Pazu must outwit the evil Muska, who plans to use Laputa's
                science to make himself ruler of the world.
            </div>
        </div>
    );
}

export default Details;
