import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import "./About.css";
import adarsh from "../assets/adarsh.jpg";
import vishag from "../assets/vishag.jpg";
import sharon from "../assets/sharon.jpg";

function About() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    // Preload images
    const teamImages = [adarsh];
    let loadedCount = 0;
    
    teamImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === teamImages.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === teamImages.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "ADARSH P",
      role: "Video Editor",
      description: "Creative video editor with expertise in motion graphics and storytelling.",
      image: adarsh,
    },
    {
      id: 2,
      name: "VISHAK C",
      role: "Content Creator",
      description: "Innovative content creator specialized in developing unique digital experiences.",
      image: vishag, // Using adarsh as placeholder - replace with actual image imports
    },
    {
      id: 3,
      name: "SHARON ",
      role: "Digital Marketer",
      description: "Strategic digital marketer with a passion for brand storytelling and audience engagement.",
      image: sharon, // Using adarsh as placeholder - replace with actual image imports
    }
  ];

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const logoVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="aboutsection">
      <div className="header-section">
        <motion.div 
          className="logo-container"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <img src={logo} alt="Logo" className="logo-image" />
        </motion.div>
        
        <motion.div 
          className="back-home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link to="/" className="back-link">
            <FaArrowLeft className="back-icon" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="team-cards-container"
        variants={containerVariants}
        initial="hidden"
        animate={imagesLoaded ? "visible" : "hidden"}
      >
        {teamMembers.map((member) => (
          <motion.div 
            key={member.id} 
            className="team-card"
            variants={cardVariants}
          >
            <div className="card-image-container">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="card-image" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('placeholder-image');
                  }}
                />
              ) : (
                <div className="placeholder-image"></div>
              )}
            </div>
            <div className="card-content">
              <h3 className="member-name">{member.name}</h3>
              <h4 className="member-role">{member.role}</h4>
              <p className="member-description">{member.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default About;