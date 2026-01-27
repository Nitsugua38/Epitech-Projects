import { useState, useEffect } from 'react';
import "./Home.css";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className={`outer-card ${isVisible ? 'fade-in' : ''}`}>
        <div className="inner-content">
          <p>Outer section content</p>
          <div className="inner-card">
            <p>Inner section content</p>
          </div>
          <div className="inner-card">
            <p>Second inner section</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;   
