import React, { useState, useEffect } from "react";
import { auth } from "../../firebase"; // https://console.firebase.google.com/u/0/project/ecommerce-ff653/settings/general/web:MDE3MjAwYzgtYjA2Zi00ZjZlLTgzMzQtNTA0N2NmNzExOGI2
import { toast, ToastContainer } from "react-toastify"; // https://github.com/fkhadra/react-toastify#readme
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem('emailForRegistration'))
  }, []);

  //  PWless Authentication
  //  After creating the PW, do this:
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent reload the page after clicking
    // validation
    if (!email || !password) {
      toast.error("Email or password is required");
      return; // don't continue
    }

    if (password.length < 6) {
      toast.error("PW must be at least 6 characters long");
      return; // don't continue
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      ); // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemaillink
      // console.log("RESULT", result);

      // update this user with the PW
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // console.log('user', user, 'idTokenResult', idTokenResult)
        // redux store

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
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //  Styling
  //  To simplify the structure, use a function to
  const completeRegistionForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        disabled // can't change the input field
      />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <button type="submit" className="btn btn-raised">
        Complete Registeration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistionForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
