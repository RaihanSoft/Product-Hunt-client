import Home from '../Components/Pages/Home/Home';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Components/MainLayout/MainLayout';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import Products from '../Components/Pages/Products/Products';
import AboutUs from '../Components/Pages/AboutUs/AboutUs';
import ContactUs from '../Components/Pages/ContactUs/ContactUs';
import { Helmet } from 'react-helmet-async';
import Dashboard from '../Components/DashboardLayout/Dashboard';
import MyProfile from '../Components/DashboardLayout/MyProfile';
import AddProduct from '../Components/DashboardLayout/AddProduct';
import MyProducts from '../Components/DashboardLayout/MyProducts';
import ErrorPage from '../Components/Common/Error/ErrorPage';
import ProductDetails from '../Components/Pages/ProductDetails/ProductDetails';

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout />
        ),
        children: [
            {
                path: "/",
                element: (
                    <>
                        <Home />
                    </>
                )
            },
            {
                path: '/products',
                element: (
                    <>
                        <Products />
                    </>
                )
            },
            
            {

                path: "/product/:id",
                element: (
                    <>

                        <ProductDetails />
                    </>

                ),

            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: '/dashboard/my-profile',
                        element: <MyProfile />

                    },
                    {
                        path: '/dashboard/add-product',
                        element: <AddProduct />

                    },
                    {
                        path: '/dashboard/my-products',
                        element: <MyProducts />

                    }
                ]

            }
            ,


            {
                path: '/',
                element: (
                    <PrivateRoute>

                        
                    </PrivateRoute>
                )
            },
            {
                path: '/about-us',
                element: (
                    <>


                        <AboutUs />

                    </>
                )
            },
            {
                path: '/contact-us',
                element: (
                    <>

                        <ContactUs />
                    </>
                )
            },
            {
                path: '/login',
                element: (
                    <>
                        <Helmet>
                            <title>Login </title>
                        </Helmet>
                        <Login />
                    </>
                )
            },
            {
                path: "/forgot-password",
                element: (
                    <>
                        <Helmet>
                            <title>Forgot Password r</title>
                        </Helmet>
                        <ForgotPassword />
                    </>
                )
            },
            {
                path: '/register',
                element: (
                    <>
                        <Helmet>
                            <title>Register </title>
                        </Helmet>
                        <Register />
                    </>
                )
            },

        ]
    },
    {
        path: "*",
        element: (
            <>
                <ErrorPage />
                <Helmet>
                    <title>404 Not Found </title>
                    <meta name="description" content="The page you are looking for does not exist. Return to the homepage." />
                </Helmet>
            </>
        )
    },
]);


