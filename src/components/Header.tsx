import { useContext } from "react";
import { MyContext } from "../context/CreateContext";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            transform: "translateX(28px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#a1c4fd",
                opacity: 1,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        width: 26,
        height: 26,
        backgroundColor: theme.palette.mode === "dark" ? "#f5dd42" : "#001e3c",
    },
    "& .MuiSwitch-track": {
        borderRadius: 20,
        backgroundColor: "#a1c4fd",
        opacity: 1,
    },
}));

function Header() {
    const { search, setSearch, darkMode, toggleDarkMode } = useContext(MyContext);

    return (
        <div>
            <div className="d-flex justify-content-between my-3 align-items-center">
                <h1>Notes</h1>
                <MaterialUISwitch checked={darkMode} onChange={toggleDarkMode} />
            </div>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                className="form-control my-3"
                placeholder="Search"
            />
        </div>
    );
}

export default Header;
