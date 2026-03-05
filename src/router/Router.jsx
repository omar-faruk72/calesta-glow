import {
    createBrowserRouter,
} from "react-router";
import Home from "../page/Home";
import HomeLayOut from "../layout/HomeLayOut";
import Error from "../page/Error";
import Register from "../page/Register";
import Login from "../page/Login";

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
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
])