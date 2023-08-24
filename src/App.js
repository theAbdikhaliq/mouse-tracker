import './App.css';
import { useState, useEffect } from 'react';

// Higher-Order Component (HOC) that adds mouse position tracking to a component
const withMousePosition = (WrappedComponent) => {
  return (props) => {
    // State to store the mouse position
    const [mousePosition, setMousePosition] = useState({
      x: 0,
      y: 0,
    });

    useEffect(() => {
      // Event handler to update mouse position
      const handleMousePositionChange = (e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      };

      // Add event listener to track mouse movement
      window.addEventListener('mousemove', handleMousePositionChange);

      // Cleanup function to remove event listener when component unmounts
      return () => {
        window.removeEventListener('mousemove', handleMousePositionChange);
      };
    }, []);

    // Render the wrapped component with the mouse position as a prop
    return <WrappedComponent {...props} mousePosition={mousePosition} />;
  };
};

// Component that logs the mouse position in a panel
const PanelMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <div className="BasicTracker">
      <p>Mouse position:</p>
      <div className="Row">
        <span>x: {mousePosition.x}</span>
        <span>y: {mousePosition.y}</span>
      </div>
    </div>
  );
};

// Component that logs the mouse position as a point
const PointMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <p>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  );
};

// Components with mouse position tracking
const PanelMouseTracker = withMousePosition(PanelMouseLogger);
const PointMouseTracker = withMousePosition(PointMouseLogger);

// App component
function App() {
  return (
    <div className="App">
      <header className="Header">Little Lemon Restaurant 🍕</header>
      {/* Render the panel mouse tracker */}
      <PanelMouseTracker />
      {/* Render the point mouse tracker */}
      <PointMouseTracker />
    </div>
  );
}

export default App;