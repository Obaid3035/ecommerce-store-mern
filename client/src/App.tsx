import React from 'react';
import Header from "./Container/Pages/Header/Header";
import Footer from "./Container/Pages/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

import { customerRoutes, RoutesLink } from "./Container/Customer/Navbar/routes";
import CustomerNavbar from "./Container/Customer/Navbar/Navbar";

import { adminRoutes } from "./Container/Admin/Navbar/routes";
import AdminNavBar from "./Container/Admin/Navbar/Navbar";

import Home from "./Container/Pages/Home/Home";
import About from "./Container/Pages/About/About";
import Policy from "./Container/Pages/Policy/Policy";
import TermsCondition from "./Container/Pages/TermsCondition/TermsCondition";
import Career from "./Container/Pages/Career/Career"
import Contact from "./Container/Pages/Contact/Contact"
import Register from "./Container/Auth/Register/Register";
import Login from "./Container/Auth/Login/Login";
import ForgetPassword from "./Container/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./Container/Auth/ResetPassword/ResetPassword";
import Shop from './Container/Pages/Shop/Shop';
import ShopDescription from './Container/Pages/ShopDescription/ShopDescription';
import OrderSummary from './Container/Pages/OrderSummary/OrderSummary';
import ShippingAddress from './Container/Pages/ShippingAddress/ShippingAddress';
import Checkout from './Container/Pages/Checkout/Checkout';
import ThankYou from './Container/Pages/ThankYou/ThankYou';
import './App.scss';
import PrivateRoute from "./lib/PrivateRoute";
import WishList from "./Container/Pages/WishList/WishList";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Faq from "./Container/Pages/Faq/Faq";

export enum USER_ROLE {
    CUSTOMER = "customer",
    ADMIN = "admin"
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY!);


const App = () => {
    const customerLayout = (
        customerRoutes.map((item: RoutesLink, index) => (
            <Route key={index} path={item.path} element={
                <React.Fragment>
                    <Header isDashboard={true}/>
                    <CustomerNavbar />
                    <PrivateRoute role={USER_ROLE.CUSTOMER}>
                        <Elements stripe={stripePromise}>
                            {item.component}
                        </Elements>
                    </PrivateRoute>
                </React.Fragment>
            } />
        ))
    )
    const adminLayout = (
        adminRoutes.map((item: RoutesLink, index) => (
            <Route key={index} path={item.path} element={
                <React.Fragment>
                    <Header isDashboard={true}/>
                    <AdminNavBar />
                    <PrivateRoute role={USER_ROLE.ADMIN}>
                        {item.component}
                    </PrivateRoute>
                </React.Fragment>
            } />
        ))
    )

    return (
        <React.Fragment>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                transition={Slide}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Router>
                <Routes>
                    {customerLayout}
                    {adminLayout}
                    <Route path={'/'} element={
                        <React.Fragment>
                            <Header />
                            <Home />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path={'/about'} element={
                        <React.Fragment>
                            <Header />
                            <About />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path={'/policy'} element={
                        <React.Fragment>
                            <Header />
                            <Policy />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path={'/terms-condition'} element={
                        <React.Fragment>
                            <Header />
                            <TermsCondition />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path={'/careers'} element={
                        <React.Fragment>
                            <Header />
                            <Career />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path={'/contact'} element={
                        <React.Fragment>
                            <Header />
                            <Contact />
                            <Footer />
                        </React.Fragment>
                    } />

                    <Route path={'/shop'} element={
                        <React.Fragment>
                            <Header />
                            <Shop />
                            <Footer />
                        </React.Fragment>
                    } />


                    <Route path={'/shop-description/:id'} element={
                        <React.Fragment>
                            <Header />
                            <ShopDescription />
                            <Footer />
                        </React.Fragment>
                    } />

                    <Route path={'/order-summary'} element={
                        <React.Fragment>
                            <Header />
                            <OrderSummary />
                            <Footer />
                        </React.Fragment>
                    } />

                    <Route path={'/address-data'} element={
                        <React.Fragment>
                            <Header />
                            <ShippingAddress />
                            <Footer />
                        </React.Fragment>
                    } />

                    <Route path={'/payment-method'} element={
                        <React.Fragment>
                            <Header />
                            <Checkout />
                            <Footer />
                        </React.Fragment>
                    } />

                    <Route path={'/wishlist'} element={
                        <React.Fragment>
                            <Header />
                            <WishList />
                            <Footer />
                        </React.Fragment>
                    } />

                    <Route path={'/faq'} element={
                        <React.Fragment>
                            <Header />
                            <Faq />
                            <Footer />
                        </React.Fragment>
                    } />

                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/admin/login'} element={<Login />} />
                    <Route path={'/reset-password/:id'} element={<ResetPassword />} />
                    <Route path={'/forget-password'} element={<ForgetPassword />} />
                    <Route path={'/thankyou/:id'} element={<ThankYou />} />

                </Routes>
            </Router>
        </React.Fragment>
    );
};
export default App;
