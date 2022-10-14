import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./Pages/Home"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
        </Route>
    )
)

function App() {
    return <RouterProvider router={router} />
}

export default App
