import { useContext } from "react";
import { MyContext } from "../context/MyContext";

export default function useContextPro() {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useContextPro must be used within a CreateContextPro");
    }
    return context;
}