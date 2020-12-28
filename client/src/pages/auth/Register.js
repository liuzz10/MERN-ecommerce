import React, { useState, useEffect } from "react";
import { auth } from "../../firebase"; // https://console.firebase.google.com/u/0/project/ecommerce-ff653/settings/general/web:MDE3MjAwYzgtYjA2Zi00ZjZlLTgzMzQtNTA0N2NmNzExOGI2
import { toast } from "react-toastify"; // https://github.com/fkhadra/react-toastify#readme
import { useDispatch, useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  // Don't allow login users to access this page
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  // After submission, do this:
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent reload the page after clicking
    // console.log('ENV:', process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL, // the page where user click the link in email will land on
      handleCodeInApp: true, // due to the doc this had to be true
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear the state out and make it empty
    setEmail("");
  };

  // Style
  //  To simplify the structure, use a function to wrap the style of form
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your email"
        autoFocus
      />

      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
