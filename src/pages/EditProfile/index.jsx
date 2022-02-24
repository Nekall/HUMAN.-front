import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../context/SessionContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const EditProfile = () => {
  const {toggleSession, session} = useContext(SessionContext);
  if(!session){history.push("/")};
  let userId = localStorage.getItem("human.__userId");
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [zipCode, setZipCode] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const alert = useAlert();

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    zipCode: zipCode,
    streetAddress: streetAddress,
    state: state,
    country: country,
    city: city,
    phone: phone
  };

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

  const editUser = (e) =>{
    e.preventDefault();

    fetch(`${process.env.REACT_APP_DOMAIN}user/${userId}`,{
      method:"PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((user) => {
        alert.success("Profile updated");
        history.push("/profile");
      })
    .catch((err) => {
      alert.error(err);
    });
  }

return(
  <div className="container edit-profile center-text">
    {userData?
      <div>
        <form onSubmit={editUser}>
          <h2>Edit your informations</h2>
          <div><label htmlFor="firstName">Firstname</label></div>
          <div><input placeholder={userData.data.firstName} id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input></div>
          <div><label htmlFor="lastName">Lastname</label></div>
          <div><input placeholder={userData.data.lastName} id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input></div>
          <div><label htmlFor="email">Email</label></div>
          <div><input placeholder={userData.data.email} id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input></div>
          <div><label htmlFor="streetAddress">Street Address</label></div>
          <div><input placeholder={userData.data.streetAddress} id="streetAddress" type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}></input></div>
          <div><label htmlFor="city">City</label></div>
          <div><input placeholder={userData.data.city} id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input></div>
          <div><label htmlFor="zipCode">ZipCode</label></div>
          <div><input placeholder={userData.data.zipCode} id="zipCode" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)}></input></div>
          <div><label htmlFor="state">State</label></div>
          <div><input placeholder={userData.data.state} id="state" type="text" value={state} onChange={(e) => setState(e.target.value)}></input></div>
          <div><label htmlFor="country">Country</label></div>
          <div><input placeholder={userData.data.country} id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input></div>
          <div><label htmlFor="phone">Phone number</label></div>
          <div><input placeholder={userData.data.phone} id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input></div>
          <div><button className="stylized-btn" type="submit">Edit</button></div>
        </form>
      </div>
    : <p>Loading. . .</p>}
  </div>
)};
export default EditProfile;
