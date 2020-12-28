import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // https://github.com/fkhadra/react-toastify#readme
import "react-toastify/dist/ReactToastify.css"; // the style of the toast remains the same on all pages

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import Product from "./pages/Product";
import Shop from "./pages/Shop";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase with state
  // Anytime we have the login user, run the function and update the state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        console.log("idTokenResult", idTokenResult);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              // show the following information on Redux panel
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    // cleanup
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      {/* wrap the entire app with the toast container */}
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        {/* we created the UserRoute component to protect the route */}
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/shop" component={Shop} />
      </Switch>
    </>
  );
};

export default App;
