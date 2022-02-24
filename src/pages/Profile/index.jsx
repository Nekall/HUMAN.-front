import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../context/SessionContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const {toggleSession, session} = useContext(SessionContext);
  if(!session){history.push("/")};
  let userId = localStorage.getItem("human.__userId");
  const history = useHistory();
  const [userData, setUserData] = useState();


  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}user/${userId}`,{
      method:"GET",
    })
    .then((response) => response.json())
    .then((user) => {
        setUserData(user);
      })
    .catch(err => console.error(err));
  }, [])

return(
  <div className="container profile">
    {userData?
      <div>
        <h1>Profile</h1>
        <h2>User Informations</h2>
        <p>{userData.data.firstName} {userData.data.lastName}</p>
        <p>{userData.data.email}</p>
        <p>{userData.data.streetAddress}</p>
        <p>{userData.data.city} {userData.data.zipCode}</p>
        <p>{userData.data.state}</p>
        <p>{userData.data.country}</p>
        <p>{userData.data.phone}</p>
        <Link className="" to="/profile/edit">Edit your profile</Link>
        <h2>Order History</h2>
        {userData.data.tickets === null?
        <p>You have not placed any orders yet.</p>
        :<p>Process in tickets...</p>
        }
      </div>
    : <p>Loading. . .</p>}
  </div>
)};
export default Profile;
