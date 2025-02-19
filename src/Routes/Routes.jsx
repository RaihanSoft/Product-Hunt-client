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
import UpdateMyProduct from '../Components/DashboardLayout/UpdateMyProduct';
import AllUsers from '../Components/Admin/AllUsers';
import ReviewQueue from '../Components/Moderator/ReviewQueue';
import ReportedContents from '../Components/Moderator/ReportedContents';
import ManageCoupons from '../Components/Admin/ManageCoupons';
import SiteStatistics from '../Components/Admin/SiteStatistics';
import PaymentPage from '../Components/DashboardLayout/PaymentPage';
import News from '../Components/Pages/News/News';

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
                        <Helmet>
                            <title>Home-Product Hunt</title>
                        </Helmet>
                        <Home />
                    </>
                )
            },
            {
                path: '/products',
                element: (
                    <>

                        <Helmet>
                            <title>Products</title>
                        </Helmet>
                        <Products />
                    </>
                )
            },            
            {
                path: '/news',
                element: (
                    <>

                        <Helmet>
                            <title>News</title>
                        </Helmet>
                        <News />
                    </>
                )
            },

            {

                path: "/product/:id",
                element: (
                    <>

                        <>
                            <Helmet>
                                <title>Details</title>
                            </Helmet>
                        </>
                        <ProductDetails />
                    </>

                ),

            },
            {
                path: '/dashboard',
                element:
                    <>
                        <Helmet>
                            <title>Dashboard</title>
                        </Helmet>
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    </>,
                children: [
                    {
                        path: '/dashboard/my-profile',
                        element:

                            <>
                                <Helmet>
                                    <title>Profile</title>
                                </Helmet>
                                <MyProfile />
                            </>


                    },
                    {
                        path: '/dashboard/add-product',
                        element:

                            <>
                                <Helmet>
                                    <title>Add Products</title>
                                </Helmet>
                                <AddProduct />
                            </>


                    },
                    {
                        path: '/dashboard/my-products',
                        element:
                            <>
                                <Helmet>
                                    <title>My Products</title>
                                </Helmet>
                                <MyProducts />
                            </>


                    },
                    {
                        path: '/dashboard/payment',
                        element:

                            <>
                                <Helmet>
                                    <title>Payment Page</title>
                                </Helmet>
                                <PaymentPage />
                            </>


                    }
                    , {
                        path: '/dashboard/edit-product/:productId',
                        element:

                            <>
                                <Helmet>
                                    <title>Update Products</title>
                                </Helmet>
                                <UpdateMyProduct />
                            </>



                    },
                    {
                        path: '/dashboard/manage-users',
                        element:
                            <>
                                <Helmet>
                                    <title>All Users</title>
                                </Helmet>
                                <AllUsers />
                            </>
                    },
                    {
                        path: '/dashboard/review-queue',
                        element:
                            <>
                                <ReviewQueue />
                                <Helmet>
                                    <title>Review Queue</title>
                                </Helmet>
                            </>

                    },
                    {
                        path: '/dashboard/reported-content',
                        element:
                            <>
                                <ReportedContents />
                                <Helmet>
                                    <title>Reported Contents </title>
                                </Helmet>
                            </>

                    },
                    {
                        path: '/dashboard/manage-coupons',
                        element:
                            <>
                                <ManageCoupons />
                                <Helmet>
                                    <title>Manage Coupons </title>
                                </Helmet>
                            </>
                    },
                    {
                        path: '/dashboard/site-stats',
                        element:
                            <>
                                <SiteStatistics />
                                <Helmet>
                                    <title>Statistics </title>
                                </Helmet>
                            </>
                    },

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

                        <Helmet>
                            <title>AboutUs </title>
                        </Helmet>
                        <AboutUs />

                    </>
                )
            },
            {
                path: '/contact-us',
                element: (
                    <>
                        <Helmet>
                            <title>ContactUs </title>
                        </Helmet>

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


