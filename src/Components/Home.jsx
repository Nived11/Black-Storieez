import React, { useRef, useState, useEffect } from 'react';
import "../Components/Home.css";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Importing your images
import img1 from "../assets/s1.png";
import img2 from "../assets/s2.png";
import img3 from "../assets/s3.png";
import img4 from "../assets/s4.png";

import Stories from "./Stories";
import Captures from "./Captures";
import Contact from "./Contact";

function Home() {
  // Add state for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Create refs for scroll sections
  const storiesRef = useRef(null);
  const capturesRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const topRef = useRef(null);

  // Function to handle scroll to section with offset for navbar
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const yOffset = -80; // Height of your fixed navbar
      const element = ref.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      
      // Close menu after clicking a nav item on mobile
      setIsMenuOpen(false);
    }
  };

  // Add intersection observer to track active section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px' // Account for navbar height
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = [
      { ref: topRef, id: 'home' },
      { ref: storiesRef, id: 'stories' },
      { ref: capturesRef, id: 'captures' },
      { ref: contactRef, id: 'contact' }
    ];

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-section', id);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Quote content
  const quoteLine1 = "Every frame has a story";
  const quoteLine2 = "we capture the soul behind every shot";
  const author = "~Black Storieez";

  // Navigation items with corresponding refs
  const navItems = [
    { name: "Stories", ref: storiesRef, id: "stories" },
    { name: "Captures", ref: capturesRef, id: "captures" },
    { name: "About Us", link: "/about", id: "about" },
    { name: "Contact Us", ref: contactRef, id: "contact" }
  ];

  // Refined animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const authorVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 0.7,
      transition: { 
        delay: 1.6, 
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        delay: 2, 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Navigation items animation variants
  const navListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      x: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      color: "#f5f5f5",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Add mobile menu button animation variants
  const menuButtonVariants = {
    open: {
      transition: { duration: 0.3 }
    },
    closed: {
      transition: { duration: 0.3 }
    }
  };

  const menuBarVariants = {
    open: (index) => {
      const variants = [
        { rotate: 45, y: 8, transition: { duration: 0.3 } }, // first bar
        { opacity: 0, transition: { duration: 0.3 } },      // middle bar
        { rotate: -45, y: -8, transition: { duration: 0.3 } } // last bar
      ];
      return variants[index];
    },
    closed: {
      rotate: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Section animation variants with better mobile support
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logos" onClick={() => scrollToSection(topRef)} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Logo" />
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          variants={menuButtonVariants}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <motion.span 
            variants={menuBarVariants}
            custom={0}
            animate={isMenuOpen ? "open" : "closed"}
          ></motion.span>
          <motion.span 
            variants={menuBarVariants}
            custom={1}
            animate={isMenuOpen ? "open" : "closed"}
          ></motion.span>
          <motion.span 
            variants={menuBarVariants}
            custom={2}
            animate={isMenuOpen ? "open" : "closed"}
          ></motion.span>
        </motion.button>
        
        {/* Navigation Links */}
        <motion.ul 
          className={`navlists ${isMenuOpen ? 'open' : ''}`}
          variants={navListVariants}
          initial="hidden"
          animate="visible"
        >
         {navItems.map((item, index) => (
           <motion.li 
            key={index} 
            className={`navitem ${activeSection === item.id ? 'active' : ''}`}
            variants={navItemVariants}
            whileHover="hover"
            onClick={() => {
              if (item.ref) scrollToSection(item.ref);
              if (isMenuOpen) setIsMenuOpen(false); // Close menu
            }}
          >
            {item.link ? (
              <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </motion.li>
        ))}
        </motion.ul>
      </nav>
      
      <div className="section1" ref={topRef} data-section="home">
        <div className="s1lft">
          <motion.div 
            className="quote-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* First line of quote - animated as whole line */}
            <motion.div
              className="quote-line line1"
              variants={lineVariants}
            >
              {quoteLine1}
            </motion.div>
            
            {/* Second line of quote - animated as whole line */}
            <motion.div
              className="quote-line line2"
              variants={lineVariants}
            >
              {quoteLine2}
            </motion.div>
            
            {/* Author name */}
            <motion.div
              className="author"
              variants={authorVariants}
            >
              {author}
            </motion.div>
          </motion.div>
        </div>
        <div className="s1rgt">
          <div className="cube-container">
            <div className="cube">
              <div className="face front" style={{ backgroundImage: `url(${img1})` }}></div>
              <div className="face back" style={{ backgroundImage: `url(${img2})` }}></div>
              <div className="face left" style={{ backgroundImage: `url(${img3})` }}></div>
              <div className="face right" style={{ backgroundImage: `url(${img4})` }}></div>
              <div className="face top" style={{ backgroundImage: `url(${img2})` }}></div>
              <div className="face bottom" style={{ backgroundImage: `url(${img1})` }}></div>
            </div>
          </div>
        </div>
        
        {/* Book Events Button */}
        <Link to="/bookevents" >
          <motion.button 
            className="book-events-btn"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            Book Events
          </motion.button>
        </Link>
      </div>

      {/* Section 2 - Stories */}
      <motion.div 
        className="section2" 
        ref={storiesRef}
        data-section="stories"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
      >
        <Stories />
      </motion.div>
      
      <motion.div 
        className="section-captures" 
        ref={capturesRef}
        data-section="captures"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
      >
        <Captures />
      </motion.div>
      
      <motion.div 
        className="section-contact" 
        ref={contactRef}
        data-section="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
      >
        <Contact />
      </motion.div>
    </>
  );
}

export default Home;