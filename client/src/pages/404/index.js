import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export const NotFoundPage = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [cartPosition, setCartPosition] = useState(50);
  const [fallingItems, setFallingItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const gameAreaRef = useRef(null);
  const cartRef = useRef(null);
  const gameAreaWidth = 800;
  const cartWidth = 100;
  
  // Handle keyboard and mouse/touch movement
  useEffect(() => {
    if (!gameStarted) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCartPosition(prev => Math.max(0, prev - 20));
      } else if (e.key === 'ArrowRight') {
        setCartPosition(prev => Math.min(gameAreaWidth - cartWidth, prev + 20));
      }
    };
    
    const handleMouseMove = (e) => {
      if (!gameAreaRef.current) return;
      
      const rect = gameAreaRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      setCartPosition(Math.min(Math.max(0, relativeX - cartWidth / 2), gameAreaWidth - cartWidth));
    };
    
    // Store a reference to the current DOM element to use in cleanup
    const currentGameAreaRef = gameAreaRef.current;
    
    window.addEventListener('keydown', handleKeyDown);
    currentGameAreaRef?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      currentGameAreaRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameStarted, gameAreaWidth, cartWidth]);
  
  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);
  
  // Generate falling items
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const itemInterval = setInterval(() => {
      const newItem = {
        id: Date.now(),
        position: Math.random() * (gameAreaWidth - 50),
        speed: Math.random() * 3 + 2, // 2-5 seconds to fall
        caught: false
      };
      
      setFallingItems(prev => [...prev, newItem]);
    }, 1000);
    
    return () => clearInterval(itemInterval);
  }, [gameStarted, gameOver]);
  
  // Check for collisions and cleanup
  useEffect(() => {
    if (!gameStarted || gameOver || !cartRef.current) return;
    
    const collisionInterval = setInterval(() => {
      const cartRect = cartRef.current.getBoundingClientRect();
      
      setFallingItems(prev => {
        const updated = prev.map(item => {
          const itemElement = document.getElementById(`item-${item.id}`);
          if (!itemElement || item.caught) return item;
          
          const itemRect = itemElement.getBoundingClientRect();
          
          // Check if item is at bottom of screen
          if (itemRect.bottom >= window.innerHeight) {
            return { ...item, remove: true };
          }
          
          // Check for collision with cart
          if (
            itemRect.bottom >= cartRect.top &&
            itemRect.right >= cartRect.left &&
            itemRect.left <= cartRect.right &&
            !item.caught
          ) {
            setScore(prev => prev + 10);
            return { ...item, caught: true };
          }
          
          return item;
        });
        
        // Remove items that are caught or offscreen
        return updated.filter(item => !item.remove);
      });
    }, 100);
    
    return () => clearInterval(collisionInterval);
  }, [gameStarted, gameOver]);
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setFallingItems([]);
  };
  
  return (
    <div className="not-found-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      
      <div className="content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Oops! Page Not Found</h2>
        <p className="error-description">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {!gameStarted ? (
          <div className="game-intro">
            <h3>While you're here...</h3>
            <p>Try our shopping cart game! Catch falling products to score points.</p>
            <button className="start-button" onClick={startGame}>Start Game</button>
          </div>
        ) : (
          <div className="game-area" ref={gameAreaRef}>
            <div className="game-stats">
              <div className="score">Score: {score}</div>
              <div className="timer">Time: {timeLeft}s</div>
            </div>
            
            {fallingItems.map(item => (
              <div 
                id={`item-${item.id}`}
                key={item.id} 
                className={`falling-item ${item.caught ? 'caught' : ''}`}
                style={{ 
                  left: `${item.position}px`, 
                  animationDuration: `${item.speed}s`
                }}
              >
                <img src="gift.png" alt="Product" />
              </div>
            ))}
            
            <div 
              className="cart" 
              ref={cartRef}
              style={{ left: `${cartPosition}px` }}
            >
              <img src="shopping-cart.png" alt="Shopping Cart" />
            </div>
            
            {gameOver && (
              <div className="game-over">
                <h3>Game Over!</h3>
                <p>Your Score: {score}</p>
                <button onClick={startGame}>Play Again</button>
              </div>
            )}
          </div>
        )}
        
        <div className="navigation">
          <a href="/" className="home-button">Return to Home</a>
          <a href="/products" className="shop-button">Continue Shopping</a>
        </div>
      </div>
    </div>
  );
};
