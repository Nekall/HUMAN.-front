import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { useAlert } from "react-alert";

const Signup = () => {
  const {toggleSession, session} = useContext(SessionContext);
  const history = useHistory();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const data = {
    email: email,
    password: password,
    passwordConfirm: confirmPassword
  };

  const signupUser = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_DOMAIN}register`,{
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((user) => {
        alert.success("Register");
        toggleSession(true);
        history.push("/login");
      })
    .catch((err) => {
      alert.error(err);
      toggleSession(false);
    });
  };

  return(
    <div className="container login">
      <div>
        <h1>Signup</h1>
        <form onSubmit={signupUser}>
          <div><label htmlFor="email">Email</label></div>
          <div><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input></div>
          <div><label htmlFor="psw">Password</label></div>
          <div><input id="psw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input></div>
          <div><label htmlFor="cpsw">Confirmation Password</label></div>
          <div><input id="cpsw" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input></div>
          <div><button className="stylized-btn" type="submit">Signup</button></div>
        </form>
      </div>
    </div>
)};
export default Signup;
