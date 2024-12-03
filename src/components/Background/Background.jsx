import  { useEffect, useRef, useState } from "react";
import s from './Bacground.module.css'
import Card from "../Card/Card";

const Background = () => {
  const snowContainerRef = useRef(null);
  const [isTabActive, setIsTabActive] = useState(true);
  const snowflakes = useRef([]);
  const maxSnowflakes = 200;
  const particlesPerThousandPixels = 0.1;
  const fallSpeed = 1.25;

  // Reset a snowflake's position and animation
  const resetSnowflake = (snowflake) => {
    const size = Math.random() * 5 + 1;
    const viewportWidth = window.innerWidth - size;
    const viewportHeight = window.innerHeight;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * viewportWidth}px`;
    snowflake.style.top = `-${size}px`;

    const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.animationTimingFunction = "linear";
    snowflake.style.animationName =
      Math.random() < 0.5 ? s.fall : s.diagonalFall;

    // Remove snowflake after animation ends
    setTimeout(() => {
      const index = snowflakes.current.indexOf(snowflake);
      if (index !== -1) {
        snowflakes.current.splice(index, 1);
        snowflake.remove();
      }
    }, animationDuration * 1000);
  };

  // Create a new snowflake
  const createSnowflake = () => {
    if (snowContainerRef.current && snowflakes.current.length < maxSnowflakes) {
      const snowflake = document.createElement("div");
      snowflake.classList.add(s.snowflake);
      snowflakes.current.push(snowflake);
      snowContainerRef.current.appendChild(snowflake);
      resetSnowflake(snowflake);
    }
  };

  // Generate snowflakes at intervals
  const generateSnowflakes = () => {
    const numberOfParticles = Math.ceil(
      (window.innerWidth * window.innerHeight) / 1000
    ) * particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;

    const intervalId = setInterval(() => {
      if (isTabActive) createSnowflake();
    }, interval);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    // Start snowflake generation
    const cleanup = generateSnowflakes();

    // Handle visibility change
    const handleVisibilityChange = () => setIsTabActive(!document.hidden);

    // Handle window resize
    const handleResize = () => {
      cleanup();
      generateSnowflakes();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);

    return () => {
      cleanup();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTabActive]);

  return (
    <div className={s.container}>
      <Card></Card>
      <div className={s.snowContainer} ref={snowContainerRef}></div>
      <div style={{ height: "200vh" }}></div>
    </div>
    
  );
};

export default Background;
