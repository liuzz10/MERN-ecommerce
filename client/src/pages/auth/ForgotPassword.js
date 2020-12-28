import React, { useState, useEffect } from "react";
import { auth } from "../../firebase"; // https://console.firebase.google.com/u/0/project/ecommerce-ff653/settings/general/web:MDE3MjAwYzgtYjA2Zi00ZjZlLTgzMzQtNTA0N2NmNzExOGI2
import { toast, ToastContainer } from "react-toastify"; // https://github.com/fkhadra/react-toastify#readme
import { Button } from "antd";
import { useSelector } from "react-redux"; // if users are log in, disable them to access to this page

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Don't allow login users to access this page
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT, // the page where user click the link in email will land on
      handleCodeInApp: true, // due to the doc this had to be true
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("check your email and pw reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("error message", error);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading</h4> : <h4>Forgot Password</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <button className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
