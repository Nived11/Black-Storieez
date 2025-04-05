import React from "react";
import { FaCamera, FaArrowRight } from "react-icons/fa";
import "./Captures.css";
import  baby1 from "../assets/Captures/baby1.jpg"; // Import the CSS file for styling
import  baby2 from "../assets/Captures/baby 2.jpg"; 
import  baby3 from "../assets/Captures/baby 3.jpg"; // Import the CSS file for styling
import  baby4 from "../assets/Captures/baby4.jpg"; 
import  baby5 from "../assets/Captures/baby5.jpg"; // Import the CSS file for styling


function Captures() {
  // Sample image data - replace with your actual images
  const capturesData = [
    {
      id: 1,
      imageUrl: baby1, // Replace with your actual image
      title: "B'day Celebration",
      description: "Birthday celebration ",
      orientation: "horizontal"
    },
    {
      id: 2,
      imageUrl: baby3, // Replace with your actual image
      title: "B'day Celebration",
      description: "Birthday celebration ",
      orientation: "vertical"
    },
    {
      id: 3,
      imageUrl: baby4, // Replace with your actual image
      title: "B'day Celebration",
      description: "Birthday celebration ",
      orientation: "horizontal"
    },
    {
      id: 4,
      imageUrl: baby3, // Replace with your actual image
      title: "B'day Celebration",
      description: "Birthday celebration ",
      orientation: "vertical"
    },
    {
      id: 5,
      imageUrl: baby2, // Replace with your actual image
      title: "B'day Celebration",
      description: "Birthday celebration ",
      orientation: "horizontal"
    },
    {
      id: 6,
      imageUrl: baby5, // Replace with your actual image
      title: "B'day Celebration",
      description: "Birthday celebration ",
      orientation: "vertical"
    }
  ];

  return (
    <div className="section3">
      <div className="captures-header">
       
        <h1 className="captures-title">MOMENTS</h1>
        <FaCamera className="camera-icon" size={28} />
      </div>

      <div className="captures-gallery">
        {capturesData.map((item) => (
          <div
            key={item.id}
            className={`captures-card ${item.orientation}`}
          >
            <img src={item.imageUrl} alt={item.title} />
            <div className="captures-card-overlay">
              <h3 className="captures-card-title">{item.title}</h3>
              <p className="captures-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="view-more-btn">
        View More <FaArrowRight  />
      </button>
    </div>
  );
}

export default Captures;