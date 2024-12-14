 

import React, { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("Home"); 

  useEffect(() => {
    fetch("http://localhost:5001/user/profile", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching user profile");
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);

   const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <p>Welcome to the Home Page!</p>;
      case "About":
        return <p>About the Thutmose Football Academy.</p>;
      case "Booking":
        return <p>Book your next training session here.</p>;
      case "FYP":
        return <p>Final Year Projects are displayed here.</p>;
      case "Reviews":
        return <p>See what others are saying about us!</p>;
      default:
        return <p>Invalid tab selected.</p>;
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        {userData?.PICTURE ? (
          <img src={userData.PICTURE} alt="User" className="profile-picture" />
        ) : (
          <img src="/images/user.jpg" alt="Default User" className="profile-picture" />
        )}
        <h2 className="user-name">{userData?.NAME || "Name"}</h2>
        <div className="attribute-card">
          <h4>SPEED</h4>
          <p>{userData?.SPEED || 0}</p>
        </div>
        <div className="attribute-card">
          <h4>DRIBBLING</h4>
          <p>{userData?.DRIBBLING || 0}</p>
        </div>
        <div className="attribute-card">
          <h4>PASSING</h4>
          <p>{userData?.PASSING || 0}</p>
        </div>
        <div className="attribute-card">
          <h4>SHOOTING</h4>
          <p>{userData?.SHOOTING || 0}</p>
        </div>
      </div>

       <div className="main-content">
         <div className="navbar">
          <h1>Thutmose Football Academy</h1>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
         <div className="tabs">
          <button
            className={`tab ${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </button>
          <button
            className={`tab ${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </button>
          <button
            className={`tab ${activeTab === "Booking" ? "active" : ""}`}
            onClick={() => setActiveTab("Booking")}
          >
            Booking
          </button>
          <button
            className={`tab ${activeTab === "FYP" ? "active" : ""}`}
            onClick={() => setActiveTab("FYP")}
          >
            FYP
          </button>
          <button
            className={`tab ${activeTab === "Reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("Reviews")}
          >
            Reviews
          </button>
        </div>
         <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default HomePage;
