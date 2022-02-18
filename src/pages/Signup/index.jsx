const Signup = () => {

  return(
    <div className="container signup">
      <div>
        <h1>Signup</h1>
        <form method="post">
          <div><label htmlFor="uname">Email</label></div>
          <div><input type="text" placeholder="Enter Email" name="email" required/></div>
          <div><label htmlFor="psw">Password</label></div>
          <div><input type="password" placeholder="Enter Password" name="psw" required/></div>
          <div><label htmlFor="cpsw">Confirm Password</label></div>
          <div><input type="password" placeholder="Enter Password Again" name="cpsw" required/></div>
          <div><button type="submit">Login</button></div>
        </form>
      </div>
    </div>
)};
export default Signup;
