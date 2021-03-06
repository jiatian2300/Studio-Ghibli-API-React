import duck from "../images/duck.png";
import bath from "../images/bath.png";
import tots from "../images/tots.png";
import arrow from "../images/curly_arrow.svg";
import ToWatchItem from "../components/to-watch-item";
import WatchedItem from "../components/watched-item";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function WatchList({ toWatch, setToWatch, watched, setWatched }) {
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const list = Array.from(toWatch);
        const [reorderedItem] = list.splice(result.source.index, 1);
        list.splice(result.destination.index, 0, reorderedItem);

        setToWatch(list);
    }

    return (
        <div>
            <Navbar />
            <div className="container watch-list-wrapper">
                <div className="to-watch">
                    <header>
                        <div className="list-title">
                            To Watch <span>List</span>
                        </div>
                        <img className="duck" src={duck} alt="Duck" />
                        <div className="drag">
                            Drag to <br />
                            Rearrange
                            <img src={arrow} alt="curly arrow" />
                        </div>
                    </header>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="List">
                            {(provided) => (
                                <div
                                    className="to-watch-list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {toWatch.map((movie, index) => (
                                        <Draggable
                                            key={movie}
                                            draggableId={movie}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <ToWatchItem
                                                    provided={provided}
                                                    snapshot={snapshot}
                                                    key={movie}
                                                    movie={movie}
                                                    toWatch={toWatch}
                                                    setToWatch={setToWatch}
                                                    watched={watched}
                                                    setWatched={setWatched}
                                                ></ToWatchItem>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <p
                                        className={`${
                                            toWatch.length === 0
                                                ? "none_msg"
                                                : "hidden"
                                        }`}
                                    >
                                        - Add some movies to watch! -
                                    </p>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div className="watched">
                    <header>
                        <img src={bath} alt="Bath" />
                        <div className="list-title">
                            Watched <span>List</span>
                        </div>
                    </header>
                    <div className="watched-list">
                        {watched.map((movie) => (
                            <WatchedItem
                                key={movie}
                                movie={movie}
                                toWatch={toWatch}
                                setToWatch={setToWatch}
                                watched={watched}
                                setWatched={setWatched}
                            ></WatchedItem>
                        ))}
                        <p
                            style={{ color: "white" }}
                            className={`${
                                watched.length === 0 ? "none_msg" : "hidden"
                            }`}
                        >
                            - Go watch a new movie! -
                        </p>
                    </div>
                </div>
                <img className="toters" src={tots} alt="small white Totoros" />
                <div className="bg"></div>
            </div>
            <Footer />
        </div>
    );
}

export default WatchList;
