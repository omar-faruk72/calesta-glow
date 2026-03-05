import {
    createBrowserRouter,
} from "react-router";
import Home from "../page/Home";
import HomeLayOut from "../layout/HomeLayOut";
import Error from "../page/Error";
import Register from "../page/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayOut></HomeLayOut>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
])