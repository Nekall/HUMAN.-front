const Login = () => {

  return(
    <div className="container login">
      <div>
        <h1>Login</h1>
        <form method="post">
          <div><label htmlFor="uname">Email</label></div>
          <div><input type="text" placeholder="Enter Email" name="email" required/></div>
          <div><label htmlFor="psw">Password</label></div>
          <div><input type="password" placeholder="Enter Password" name="psw" required/></div>
          <div><button type="submit">Login</button></div>
        </form>
      </div>
    </div>
)};
export default Login;
