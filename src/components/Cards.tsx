import { useContext, useState } from "react";
import { MyContext } from "../context/CreateContext";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";

function Cards() {
    const { data, deleteItem, addData, search, darkMode } = useContext(MyContext);
    const [text, setText] = useState("");

    const filteredData =
        search.trim() === ""
            ? data
            : data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    const pushData = () => {
        if (text.trim()) {
            addData(text);
            setText("");
        }
    };

    const reset = () => {
        setText("");
    };

    return (
        <div className="containers">

            <div className={`card ${darkMode ? "bg-secondary text-white" : "bg-light"}`}>
                <h5 className="mb-2">💡 Motivatsiya</h5>
                <p className="mb-0">
                    “Harakat qil, xatodan qo‘rqma. Har bir urinish — bu o‘sishga qadam.”
                </p>
            </div>

            {filteredData.map((item) => (
                <div key={item.id} className={`card ${darkMode ? "bg-dark text-white" : "bg-warning"}`}>
                    <p>{item.name}</p>
                    <p className="buton">
                        {item.dataTime}
                        <button className="del btn btn-danger" onClick={() => deleteItem(Number(item.id))}>
                            <AiOutlineDelete />
                        </button>
                    </p>
                </div>

            ))}

            <div className={`card ${darkMode ? "bg-dark text-white" : "bg-primary text-white"}`}>
        <textarea
            style={{ backgroundColor: darkMode ? "#fff" : "#f0f8ff" }}
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text"
        ></textarea>

                <div className="buton2">
                    <p>200 remaining</p>
                    <div>
                        <button onClick={reset} className="ref btn btn-success">
                            <IoMdRefresh />
                        </button>
                        <button onClick={pushData} className="btn btn-success">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
