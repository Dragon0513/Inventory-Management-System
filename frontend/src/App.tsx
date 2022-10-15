import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import Layout from "./components/Layout"
import NotFound from "./Pages/404"
import Buttons from "./Pages/Buttons"
import Cards from "./Pages/Cards"
import Charts from "./Pages/Charts"
import CreateAccount from "./Pages/CreateAccount"
import ForgotPassword from "./Pages/ForgotPassword"
import Forms from "./Pages/Forms"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Modals from "./Pages/Modals"
import Tables from "./Pages/Tables"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />} errorElement={<NotFound />}>
                <Route index element={<Home />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/modals" element={<Modals />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </>
    )
)

function App() {
    return <RouterProvider router={router} />
}

export default App
