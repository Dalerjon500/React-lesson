import TipsList from "./components/TipsList"
import TipsForm from "./components/TipsForm.tsx";


function App() {
    return (
        <div
            className="container py-5 px-4"
        >

            <h1
                className="text-center mb-5 position-relative"

            >
            </h1>
            <TipsForm/>
            <TipsList />

        </div>
    )
}

export default App