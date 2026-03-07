import {
    createBrowserRouter,
} from "react-router";
import Home from "../page/Home";
import HomeLayOut from "../layout/HomeLayOut";
import Error from "../page/Error";
import Register from "../page/Register";
import Login from "../page/Login";
import About from "../page/About";
import Contact from "../page/Contact";
import Product from "../page/Product";
import ProductDetails from "../page/ProductDetails";
import CartPage from "../page/CartPage";
import CheckoutPage from "../page/CheckoutPage";
import PaymentSuccess from "../page/PaymentSuccess";
import PaymentFail from "../page/PaymentFail";

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
                path: '/product',
                element: <Product></Product>,
            },
             {
                path: '/product/:id',
                element: <ProductDetails></ProductDetails>,
            },
            {
                path: '/about',
                element: <About></About>,
            },
             {
                path: '/contact',
                element: <Contact></Contact>,
            },
            {
                path: "/cart",
                element: <CartPage></CartPage>
            },
            {
                path: "/checkout",
                element: <CheckoutPage></CheckoutPage>
            },
            {
                path: "/payment/success/:tranId", 
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: "/payment/fail",
                element: <PaymentFail></PaymentFail>
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