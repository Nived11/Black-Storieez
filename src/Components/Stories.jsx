import React, { useState, useRef, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import "./Stories.css";
import theyyam from "../assets/videos/theyyam.mp4";

function Stories() {
  // Sample video data - replace with your actual videos
  const [videos, setVideos] = useState([
    { id: 1, url: theyyam, title: "Video 1" },
    { id: 2, url: "https://videos.pexels.com/video-files/4865389/4865389-sd_506_960_25fps.mp4", title: "Video 2" },
    { id: 3, url: "https://videos.pexels.com/video-files/5532765/5532765-uhd_1440_2732_25fps.mp4", title: "Video 3" },
    { id: 4, url: "https://videos.pexels.com/video-files/9116154/9116154-hd_1080_1920_25fps.mp4", title: "Video 4" },
    { id: 5, url: "https://videos.pexels.com/video-files/5532765/5532765-uhd_1440_2732_25fps.mp4", title: "Video 5" },
    { id: 6, url: "https://videos.pexels.com/video-files/5532765/5532765-uhd_1440_2732_25fps.mp4", title: "Video 6" },
    { id: 7, url: "https://videos.pexels.com/video-files/5532765/5532765-uhd_1440_2732_25fps.mp4", title: "Video 7" },
  ]);
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const videoRefs = useRef([]);
  
  // Handle next video
  const handleNextVideo = () => {
    pauseAllVideos();
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(true);
  };
  
  // Handle previous video
  const handlePrevVideo = () => {
    pauseAllVideos();
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };
  
  // Pause all videos
  const pauseAllVideos = () => {
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.pause();
      }
    });
  };
  
  // Toggle play/pause when clicked on video
  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Toggle mute/unmute
  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent triggering the video click handler
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      const newMutedState = !isMuted;
      currentVideo.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting, set volume to last known volume
      if (!newMutedState && volume === 0) {
        setVolume(0.5);
        currentVideo.volume = 0.5;
      }
    }
  };
  
  // Play current video when index changes
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      }
      
      // Apply current volume and mute settings
      currentVideo.volume = volume;
      currentVideo.muted = isMuted;
    }
  }, [currentVideoIndex, isPlaying, isMuted, volume]);
  
  // Get indices for cards to display
  const getDisplayIndices = () => {
    // We'll show 5 cards total (2 left, 1 center, 2 right)
    const indices = [];
    const totalVideos = videos.length;
    
    // Current video index
    indices.push(currentVideoIndex);
    
    // Two videos to the left
    for (let i = 1; i <= 2; i++) {
      indices.push((currentVideoIndex - i + totalVideos) % totalVideos);
    }
    
    // Two videos to the right
    for (let i = 1; i <= 2; i++) {
      indices.push((currentVideoIndex + i) % totalVideos);
    }
    
    return indices;
  };
  
  const displayIndices = getDisplayIndices();
  
  // Function to determine position class based on relative index
  const getPositionClass = (index) => {
    const position = displayIndices.indexOf(index);
    
    if (position === 0) return "center-card";
    if (position === 1) return "left-card-1";
    if (position === 2) return "left-card-2";
    if (position === 3) return "right-card-1";
    if (position === 4) return "right-card-2";
    
    return "hidden-card";
  };

  return (
    <div className="stories-stack-section">
      <h1 className="stories-stack-title">STORIES</h1>
      <div className="stories-stack-container">
        {/* Navigation buttons */}
        <button className="stack-arrow-btn prev-btn" onClick={handlePrevVideo}>
          <FaAngleLeft style={{ color: "white", background: "transparent" }} />
        </button>
        
        {/* All video cards */}
        <div className="video-cards-stack">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className={`video-card ${getPositionClass(index)}`}
            >
              <video 
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.url}
                loop
                muted={isMuted || index !== currentVideoIndex}
                playsInline
                onClick={index === currentVideoIndex ? togglePlayPause : null}
              />
              {index === currentVideoIndex && (
                <div className="video-controls-overlay" onClick={(e) => e.stopPropagation()}>
                  <div className="video-progress">
                    <div className="progress-bar">
                      <div className="progress"></div>
                    </div>
                  </div>
                  
                  <div className="video-control-buttons">
                    <div className="volume-control">
                      <button 
                        className="volume-btn" 
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <FaVolumeMute style={{ color: "white", background: "transparent" }} /> : <FaVolumeUp style={{ color: "white", background: "transparent" }} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button className="stack-arrow-btn next-btn" onClick={handleNextVideo}>
          <FaAngleRight style={{ color: "white", background: "transparent" }} />
        </button>
      </div>
    </div>
  );
}

export default Stories;