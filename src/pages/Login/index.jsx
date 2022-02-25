import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { useAlert } from "react-alert";

const Login = () => {
  const {toggleSession, session} = useContext(SessionContext);
  const history = useHistory();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    email: email,
    password: password
  };

  if(session){
    history.push("/");
  }

  const logUser = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_DOMAIN}login`,{
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
        if(user.data){
          alert.success("Connected");
          toggleSession(true);
          localStorage.setItem("human.__token", user.token);
          localStorage.setItem("human.__userId", user.data.id);
          window.location.reload(false);
          //history.push("/");
        }else{
          alert.error(user.message);
          toggleSession(false);
        }
      })
    .catch((err) => {
      alert.error(err);
      toggleSession(false);
    });
  };

  return(
    <div className="container login">
      <div>
        <h1>Login</h1>
        <form onSubmit={logUser}>
          <div><label htmlFor="uname">Email</label></div>
          <div><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input></div>
          <div><label htmlFor="psw">Password</label></div>
          <div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input></div>
          <div><button className="stylized-btn" type="submit">Login</button></div>
        </form>
      </div>
    </div>
)};
export default Login;
