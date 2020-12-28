import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase"; // https://console.firebase.google.com/u/0/project/ecommerce-ff653/settings/general/web:MDE3MjAwYzgtYjA2Zi00ZjZlLTgzMzQtNTA0N2NmNzExOGI2
import { toast } from "react-toastify"; // https://github.com/fkhadra/react-toastify#readme
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axios } from "axios";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("zhuozhuo530@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  // Don't allow login users to access this page
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);
  let dispatch = useDispatch();
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  // Log in with Email
  const handleSubmit = async (e) => {
    setLoading(true); // present "loading"
    e.preventDefault(); // prevent reload the page after clicking
    // console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password); // get user's information from firebase
      // console.log('result', result)
      const { user } = result; // .user: https://firebase.google.com/docs/reference/js/firebase.User#getidtokenresult
      const idTokenResult = await user.getIdTokenResult(); // .getIdTokenResult(): https://firebase.google.com/docs/reference/js/firebase.auth.IDTokenResult

      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  // Log in with Google
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  };

  // Style
  //  To simplify the structure, use a function to wrap the style of form
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="your PW"
        />
      </div>

      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block // spread out the full width
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Log in with Email
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h4>Login</h4> : <h4>Loading</h4>}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block // spread out the full width
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Log in with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
