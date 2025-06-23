import React, { useState, useEffect, useRef } from "react";
import { FaCamera, FaArrowRight } from "react-icons/fa";
import "./Captures.css";
import baby1 from "../assets/Captures/baby1.jpg";
import baby2 from "../assets/Captures/baby 2.jpg";
import baby3 from "../assets/Captures/baby 3.jpg";
import baby4 from "../assets/Captures/baby4.jpg";
import baby5 from "../assets/Captures/baby5.jpg";

function Captures() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Sample image data - replace with your actual images
  const capturesData = [
    {
      id: 1,
      imageUrl: baby1,
      title: "B'day Celebration",
      description: "Birthday celebration",
      orientation: "horizontal"
    },
    {
      id: 2,
      imageUrl: baby3,
      title: "B'day Celebration",
      description: "Birthday celebration",
      orientation: "vertical"
    },
    {
      id: 3,
      imageUrl: baby4,
      title: "B'day Celebration",
      description: "Birthday celebration",
      orientation: "horizontal"
    },
    {
      id: 4,
      imageUrl: baby2,
      title: "B'day Celebration",
      description: "Birthday celebration",
      orientation: "vertical"
    },
    {
      id: 5,
      imageUrl: baby5,
      title: "B'day Celebration",
      description: "Birthday celebration",
      orientation: "horizontal"
    },
    {
      id: 6,
      imageUrl: baby1,
      title: "B'day Celebration",
      description: "Birthday celebration",
      orientation: "vertical"
    }
  ];

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle image loading
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(imageId);
      
      // Check if all images are loaded
      if (newSet.size === capturesData.length) {
        setImagesLoaded(true);
      }
      
      return newSet;
    });
  };

  const handleImageError = (imageId) => {
    console.warn(`Failed to load image with id: ${imageId}`);
    // Still mark as "loaded" to prevent blocking
    handleImageLoad(imageId);
  };

  // Preload images when section becomes visible
  useEffect(() => {
    if (isVisible) {
      capturesData.forEach((item) => {
        const img = new Image();
        img.onload = () => handleImageLoad(item.id);
        img.onerror = () => handleImageError(item.id);
        img.src = item.imageUrl;
      });
    }
  }, [isVisible]);

  return (
    <div className="section3" ref={sectionRef}>
      <div className="captures-header">
        <h1 className="captures-title">MOMENTS</h1>
        <FaCamera className="camera-icon" size={28} />
      </div>

      <div className="captures-gallery">
        {capturesData.map((item) => (
          <div
            key={item.id}
            className={`captures-card ${item.orientation}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          >
            {/* Loading placeholder */}
            {!loadedImages.has(item.id) && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #333',
                    borderTop: '3px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
              </div>
            )}
            
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              onLoad={() => handleImageLoad(item.id)}
              onError={() => handleImageError(item.id)}
              style={{
                opacity: loadedImages.has(item.id) ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
            
            <div className="captures-card-overlay">
              <h3 className="captures-card-title">{item.title}</h3>
              <p className="captures-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="view-more-btn"
        style={{
          opacity: imagesLoaded ? 1 : 0.5,
          transition: 'opacity 0.3s ease'
        }}
      >
        View More <FaArrowRight />
      </button>

      {/* Add spinner keyframes */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Captures;