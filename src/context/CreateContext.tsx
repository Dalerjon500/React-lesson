import { createContext, ReactNode, useState, useEffect } from "react";

interface ContexType {
    id?: number;
    name: string;
    dataTime: string;
}

export const MyContext = createContext<{
    data: ContexType[];
    deleteItem: (id: number) => void;
    addData: (name: string) => void;
    search: string;
    setSearch: (data: string) => void;
    darkMode: boolean;
    toggleDarkMode: () => void;
}>({
    data: [],
    deleteItem: () => {},
    addData: () => {},
    search: "",
    setSearch: () => {},
    darkMode: false,
    toggleDarkMode: () => {},
});

function CreateContext({ children }: { children: ReactNode }) {
    const [search, setSearch] = useState("");

    // 📌 LocalStorage'dan Dark Mode holatini olish
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    // 📌 LocalStorage'dan ma'lumotlarni olish
    const [data, setData] = useState<ContexType[]>(() => {
        const savedData = localStorage.getItem("notesData");
        return savedData ? JSON.parse(savedData) : [
            { id: 1, name: "your text", dataTime: new Date().toLocaleDateString("en-US") }
        ];
    });

    // 🗑️ Eslatmani o‘chirish
    const deleteItem = (id: number) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        localStorage.setItem("notesData", JSON.stringify(updatedData)); // ⬅️ Saqlash
    };

    // ✍️ Yangi eslatma qo‘shish
    const addData = (name: string) => {
        if (name) {
            const newData: ContexType = {
                id: data.length + 1,
                name,
                dataTime: new Date().toLocaleDateString("en-US"),
            };
            const updatedData = [...data, newData];
            setData(updatedData);
            localStorage.setItem("notesData", JSON.stringify(updatedData)); // ⬅️ Saqlash
        }
    };

    // 🌙 Dark Mode'ni o‘zgartirish
    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", String(newMode)); // ⬅️ Saqlash
            return newMode;
        });
    };

    // 🌓 Dark Mode uchun class qo‘shish/o‘chirish
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("bg-dark", "text-white");
        } else {
            document.body.classList.remove("bg-dark", "text-white");
        }
    }, [darkMode]);

    return (
        <MyContext.Provider value={{ data, deleteItem, addData, search, setSearch, darkMode, toggleDarkMode }}>
            <div className={darkMode ? "bg-dark text-white" : ""}>{children}</div>
        </MyContext.Provider>
    );
}

export default CreateContext;
