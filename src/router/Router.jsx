import {
    createBrowserRouter,
} from "react-router";

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
                path: '/membership',
                element: <PrivateRoute>
                    <Membership></Membership>
                </PrivateRoute>
            },
            {
                path: '/postDetails/:id',
                element: <PostDetails></PostDetails>
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'privacy',
                element: <Privacy></Privacy>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/forbidden',
                element: <Forbidden></Forbidden>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
])