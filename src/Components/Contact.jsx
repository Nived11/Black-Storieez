import React from 'react';
import { FaInstagram, FaEnvelope, FaTwitter } from 'react-icons/fa';
import "./Contact.css";
import emailjs from 'emailjs-com';
import {ToastContainer, toast} from 'react-toastify';

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
      
        emailjs.sendForm(
          'nived11',   // from EmailJS
          'template_z2m5b7f',  // from EmailJS
          e.target,
          '156D1ZevOJfFfZN3H'    // from EmailJS account
        ).then(
          (result) => {
            toast.success('Message sent successfully!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
                theme: "dark",
            });

            e.target.reset();
          },
          (error) => {
            alert('Failed to send message. Try again later.');
            console.log(error.text);
          }
        );
      };

  return (
    <div className="section4" id="contact">
      <div className="contact-header">
        <h1>Get In Touch</h1>
      </div>
      <div className="contact-container">
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Me</h2>
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea name='message' placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="contact-info">
          <div className="social-links">
            <h2>Connect With Me</h2>
            <a href="https://www.instagram.com/blackstorieez?igsh=MXZxZnhwZWV3cmZ0Mg==" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram className="social-icon" />
              <span >Instagram</span>
            </a>
            <a href="mailto:blackstorieez@gmail.com" className="social-link">
              <FaEnvelope className="social-icon" />
              <span >Email</span>
            </a>
            <a href="https://twitter.com/blackstorieez" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter className="social-icon" />
              <span >Twitter</span>
            </a>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Contact;