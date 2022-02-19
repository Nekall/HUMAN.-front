import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    email: email,
    password: password
  };

  const logUser = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/login",{
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((user) => {
        if(user.data.email){
          alert("Connected");
          localStorage.setItem("human.__session", true);
          localStorage.setItem("human.__token", user.token);
          history.push("/");
        }else{
          alert(user.message)
          localStorage.setItem("human.__session", false);
          console.log("error");
        }
      })
    .catch((err) => {
      alert(err)
      console.log(err);
      localStorage.setItem("human.__session", false);
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
          <div><button type="submit">Login</button></div>
        </form>
      </div>
    </div>
)};
export default Login;
