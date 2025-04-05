import React, { useState } from "react";
import "./Bookevents.css";
import logo from '../assets/logo.png';
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bookevents() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(
      'nived11',   // Replace with your EmailJS service ID
      'template_7ctfgfk',  // Replace with your EmailJS template ID
      e.target,
      '156D1ZevOJfFfZN3H'       // Replace with your EmailJS user ID
    ).then(
      (result) => {
        toast.success('Booking request sent successfully!', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: ""
        });
      },
      (error) => {
        toast.error('Failed to send booking request. Please try again later.', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error.text);
      }
    );
  };

  return (
    <div className="bookevents-container">
      <div className="navigation">
        <Link to="/" className="home-link">
          <Home size={20} />
          <span>Home</span>
        </Link>
      </div>
      
      <div className="bookevents">
        <div className="logo-container">
          <img className="evlogo" src={logo} alt="Events Logo" />
        </div>
        
        <h1>Book Your Events</h1>
        <p>Book your events with us and make them memorable.</p>
        
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="eventType">Event Type</label>
            <select 
              id="eventType" 
              name="eventType" 
              value={formData.eventType} 
              onChange={handleChange} 
              required
            >
              <option value="" disabled>Select an event</option>
              <option value="marriage">Marriage</option>
              <option value="birthday">Birthday</option>
              <option value="bridetobe">Bride to Be</option>
              <option value="college">College</option>
              <option value="temple">Temple</option>
              <option value="theyyam">Theyyam</option>
            </select>
          </div>
          
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Bookevents;