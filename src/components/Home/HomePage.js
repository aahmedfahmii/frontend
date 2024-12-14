 

import React, { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("Home"); 
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState('');
  const [fields, setFields] = useState([]);
  const [timings, setTimings] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    fieldId: "",
    timingId: "",
    coachId: "",
    bookingDate: "",
  });
  const [filteredTimings, setFilteredTimings] = useState([]);

  const filterTimingsByField = (fieldId) => {
    const filtered = timings.filter((timing) => timing.FIELD_ID === parseInt(fieldId));
    setFilteredTimings(filtered);
  };
  
  useEffect(() => {
    // Fetch Fields
    fetch("http://localhost:5001/fields", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => setFields(data))
      .catch((err) => console.error(err));

    // Fetch Timings
    fetch("http://localhost:5001/timings", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => setTimings(data))
      .catch((err) => console.error(err));

    // Fetch Coaches
    fetch("http://localhost:5001/coaches", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCoaches(data))
      .catch((err) => console.error(err));

    // Fetch User's Previous Bookings
    fetch("http://localhost:5001/user/bookings", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5001/bookings/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error creating booking");
        alert("Booking created successfully!");
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    fetch("http://localhost:5001/reviews", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching reviews");
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => console.error(error));
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:5001/user/profile", {
      method: "GET",
      credentials: "include", 
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching user profile");
        return response.json();
      })
      
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      setError('Review content cannot be empty');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5001/reviews/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: newReview }),
      });
  
      if (response.ok) {
        setNewReview('');
        setError('');
        const updatedReviews = await fetch('http://localhost:5001/reviews', {
          method: 'GET',
          credentials: 'include',
        }).then((res) => res.json());
        setReviews(updatedReviews);
      } else {
        setError('Error adding review');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };
  
   const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return  <div className="home">
      <div className="grid-item top-left">
        <h1>All Fields</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>PRICE</th>
              <th>PICTURE</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.ID}>
                <td>{field.ID}</td>
                <td>{field.NAME}</td>
                <td>{field.LOCATION}</td>
                <td>{field.PRICE}</td>
                <td><img 
            src={field.PICTURE} 
            alt={`${field.NAME} Picture`} 
            style={{ width: "100px", height: "100px", objectFit: "cover" }} 
          /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


   
      <div className="grid-item top-right">
        <h1>All Bookings</h1>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Timing</th>
              <th>Coach</th>
              <th>Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.BookingID}>
                  <td>{booking.FieldName}</td>
                  <td>{booking.Timing}</td>
                  <td>{booking.CoachName || "No Coach"}</td>
                  <td>{booking.BookingDate}</td>
                  <td>${booking.TOTAL_PRICE}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="grid-item bottom-left " style={{textAlign:"center"}}>
        <h1>Contact Us</h1>
        <p>Email: contact@thutmose.com</p>
        <p>Phone: +20-011-192-874-00</p>
        <p>Address: 123 Madinaty Road, New Cairo</p>
        <img src="https://images.stockcake.com/public/4/7/5/4755d8d4-26c3-41ec-bef7-86bfe4470a7b_large/sunset-soccer-game-stockcake.jpg"
        
        
        style={{width:"300", height: "500px", objectFit: "cover",textAlign:"center" }} />
      </div>
      <div className="grid-item bottom-right">
        <h1>All Reviews</h1>
        <table>
                <thead>
                  <tr>
                    <th>#</th> 
                    <th>Content</th> 
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={review.ID}>
                      <td>{index + 1}</td> 
                      <td>{review.CONTENT}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
      </div>
    </div>;
      case "About":
        return <div>
          <h1>About Us</h1>
          <img src="https://www.rhsmith.umd.edu/sites/default/files//featured/2022/11/soccer-player.jpg" />
          <div>

Welcome to Thutmose Football Academy, your ultimate destination for booking premier football fields. Founded by enthusiasts deeply rooted in the love of the game, we are dedicated to offering top-notch facilities that cater to football players of all skill levels.

At Thutmose Football Academy, we streamline the field booking process, making it easy and convenient for you. Our platform features detailed information on each field, including availability, pricing, amenities, and precise locations. Whether you’re planning a friendly match, organizing a community tournament, or setting up corporate league games, we provide the perfect setting.

Our mission is to enhance the football community by promoting sportsmanship, health, and passion for the game. We collaborate with trusted field owners to ensure the highest quality standards, guaranteeing that each venue meets your needs and expectations.

Thank you for choosing Thutmose Football Academy. We are excited to support your football adventures and are committed to delivering outstanding service and convenience. Book your next game with us and discover the best way to secure your ideal football pitch!</div>;
          
           
            
            
            </div>
      case "Booking":
        return  <div className="booking-page">
        <h2>Create New Booking</h2>
        <form className="booking-form" onSubmit={handleBookingSubmit}>
  <div className="form-group">
    <label>Field:</label>
    <select
      required
      value={formData.fieldId}
      onChange={(e) => {
        const selectedFieldId = e.target.value;
        setFormData({ ...formData, fieldId: selectedFieldId });
        filterTimingsByField(selectedFieldId); 
      }}
    >
      <option value="">Select Field</option>
      {fields.map((field) => (
        <option key={field.ID} value={field.ID}>
          {field.NAME} - {field.LOCATION}
        </option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label>Timing:</label>
    <select
      required
      value={formData.timingId}
      onChange={(e) => setFormData({ ...formData, timingId: e.target.value })}
    >
      <option value="">Select Timing</option>
      {filteredTimings.map((timing) => (
        <option key={timing.ID} value={timing.ID}>
          {timing.TIME_SLOT}
        </option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label>Coach (Optional):</label>
    <select
      value={formData.coachId}
      onChange={(e) => setFormData({ ...formData, coachId: e.target.value })}
    >
      <option value="">No Coach</option>
      {coaches.map((coach) => (
        <option key={coach.ID} value={coach.ID}>
          {coach.CoachName} - {coach.SPECIALTY} (${coach.PRICE})
        </option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label>Date:</label>
    <input
      type="date"
      required
      value={formData.bookingDate}
      onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
    />
  </div>

  <button type="submit" className="submit-button">Add Booking</button>
</form>

        <h3>Previous Bookings</h3>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Timing</th>
              <th>Coach</th>
              <th>Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.BookingID}>
                  <td>{booking.FieldName}</td>
                  <td>{booking.Timing}</td>
                  <td>{booking.CoachName || "No Coach"}</td>
                  <td>{booking.BookingDate}</td>
                  <td>${booking.TOTAL_PRICE}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>;
      case "FYP":
        return <p>Pictures and videos uploaded by users.</p>;
        case "Reviews":
          return (
            <div>
              <h2>Reviews</h2>
              <div>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review..."
                ></textarea>
                <button onClick={handleAddReview}>Add Review</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
              <table>
                <thead>
                  <tr>
                    <th>#</th> 
                    <th>Content</th> 
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={review.ID}>
                      <td>{index + 1}</td> 
                      <td>{review.CONTENT}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
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

       <div classNamresearche="main-content">
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