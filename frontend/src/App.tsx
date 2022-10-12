import { useState } from "react"
import reactLogo from "./assets/react.svg"

function App() {
    const [count, setCount] = useState(0)

    return (
        <h1 className="text-3xl font-bold underline text-center">
            Hello world!
        </h1>
    )
}

export default App
