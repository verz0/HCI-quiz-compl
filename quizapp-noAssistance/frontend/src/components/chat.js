import React, { useState, useEffect } from "react";
import "./chat.css";
const Chat = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setShowCursor(true);
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const typingTimeout = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setShowCursor(false);
        }
      }, 15);

      return () => {
        clearTimeout(typingTimeout);
      };
    }
  }, [text, currentIndex, isLoading]);

  return (
    <div className={`chat ${isLoading ? "loading" : "typing"}`}>
      {isLoading ? (
        <div className="loading">
          Loading<span className="dot1">.</span>
          <span className="dot2">.</span>
          <span className="dot3">.</span>
        </div>
      ) : (
        displayedText
      )}
      {showCursor && <span className="cursor">█</span>}
    </div>
  );
};

export default Chat;
