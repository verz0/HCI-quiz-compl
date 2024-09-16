import React, { useState, useEffect, useRef } from "react";
import "./chat.css";

const Chat = ({ text, resetHint }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);
  const prevText = useRef("");

  useEffect(() => {
    setIsLoading(true);
    setShowCursor(false);
    setDisplayedText("");
    setCurrentIndex(0);
    prevText.current = text;

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setShowCursor(true);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [text, resetHint]);

  useEffect(() => {
    if (!isLoading && text !== prevText.current) {
      setIsLoading(true);
      setShowCursor(false);
      setDisplayedText("");
      setCurrentIndex(0);
      prevText.current = text;

      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
        setShowCursor(true);
      }, 5000);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [text, isLoading, resetHint]);

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
