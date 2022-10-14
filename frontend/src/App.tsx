import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import Layout from "./components/Layout"
import NotFound from "./Pages/404"
import Forms from "./Pages/Forms"
import Home from "./Pages/Home"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<NotFound />}>
            <Route index element={<Home />} />
            <Route path="/forms" element={<Forms />} />
        </Route>
    )
)

function App() {
    return <RouterProvider router={router} />
}

export default App
