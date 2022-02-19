import React, { useState} from 'react';

const Signup = () => {
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

    fetch("http://localhost:3000/register",{
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((user) => {
        alert("Register");
        console.log(user);
        localStorage.setItem("human.__session", true);
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
        <h1>Signup</h1>
        <form onSubmit={signupUser}>
          <div><label htmlFor="uname">Email</label></div>
          <div><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input></div>
          <div><label htmlFor="psw">Password</label></div>
          <div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input></div>
          <div><label htmlFor="cpsw">Confirmation Password</label></div>
          <div><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input></div>
          <div><button type="submit">Signup</button></div>
        </form>
      </div>
    </div>
)};
export default Signup;
