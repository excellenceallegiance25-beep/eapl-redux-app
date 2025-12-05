import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useRef } from 'react';

// Move classes outside the component
class Dot {
  constructor(width, height, theme) {
    this.radius = Math.random() * 3 + 0;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.color = this.getRandomColor(theme);
    this.originalColor = this.color;
    this.highlight = false;
    this.connections = [];
  }

  getRandomColor(theme) {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.primary.light,
      theme.palette.secondary.light,
      'rgba(156, 39, 176, 0.8)',
      'rgba(76, 175, 80, 0.8)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(width, height, mouseX, mouseY, mouseRadius) {
    // Move dot
    this.x += this.vx;
    this.y += this.vy;

    // Mouse interaction
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If mouse is close, repel the dot with smooth force
      if (distance < mouseRadius) {
        const angle = Math.atan2(dy, dx);
        const force = Math.pow((mouseRadius - distance) / mouseRadius, 2);
        this.vx -= Math.cos(angle) * force * 2;
        this.vy -= Math.sin(angle) * force * 2;

        // Highlight dot
        this.highlight = true;
        this.color = 'rgba(255, 255, 255, 0.95)';
      } else {
        this.highlight = false;
        this.color = this.originalColor;
      }
    }

    // Bounce off walls with damping
    if (this.x < this.radius || this.x > width - this.radius) {
      this.vx *= -0.95;
      this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    }
    if (this.y < this.radius || this.y > height - this.radius) {
      this.vy *= -0.95;
      this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
    }

    // Add some random movement
    this.vx += (Math.random() - 0.5) * 0.1;
    this.vy += (Math.random() - 0.5) * 0.1;

    // Apply friction
    this.vx *= 0.995;
    this.vy *= 0.995;

    // Limit velocity
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed = 3;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Add glow effect for highlighted dots
    if (this.highlight) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        this.x, this.y, this.radius,
        this.x, this.y, this.radius + 8
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
}

class Connection {
  constructor(dot1, dot2, minConnectionDistance, maxConnectionDistance) {
    this.dot1 = dot1;
    this.dot2 = dot2;
    this.strength = 0;
    this.targetStrength = 0;
    this.id = `${Math.min(dot1.id, dot2.id)}-${Math.max(dot1.id, dot2.id)}`;
    this.minConnectionDistance = minConnectionDistance;
    this.maxConnectionDistance = maxConnectionDistance;
  }

  update(distance) {
    // Calculate target strength based on distance (continuous)
    this.targetStrength = Math.max(0, 1 - (distance - this.minConnectionDistance) / (this.maxConnectionDistance - this.minConnectionDistance));
    this.targetStrength = Math.min(1, Math.max(0, this.targetStrength));

    // Smoothly interpolate current strength toward target
    this.strength += (this.targetStrength - this.strength) * 0.1;
  }

  draw(ctx, theme) {
    if (this.strength > 0.01) {
      ctx.beginPath();
      ctx.moveTo(this.dot1.x, this.dot1.y);
      ctx.lineTo(this.dot2.x, this.dot2.y);

      // Line properties based on strength
      const opacity = this.strength * 0.7;
      const lineWidth = this.strength * 1;

      // Color based on theme and strength
      let lineColor;
      if (theme.palette.mode === 'dark') {
        lineColor = `rgba(255, 255, 255, ${opacity * 0.4})`;
      } else {
        lineColor = `rgba(100, 100, 100, ${opacity * 0.3})`;
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }
}

const DotsBackground = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const dotsRef = useRef([]);
  const connectionsRef = useRef([]);
  const mousePositionRef = useRef({ x: null, y: null });
  const theme = useTheme();

  // Configuration
  const dotCount = 60;
  const maxConnectionDistance = 180;
  const minConnectionDistance = 50;
  const mouseRadius = 150;

  // Initialize dots
  const initDots = useCallback((width, height) => {
    dotsRef.current = [];
    connectionsRef.current = [];

    for (let i = 0; i < dotCount; i++) {
      const dot = new Dot(width, height, theme);
      dot.id = i;
      dotsRef.current.push(dot);
    }

    // Pre-create connections between all dots
    for (let i = 0; i < dotsRef.current.length; i++) {
      for (let j = i + 1; j < dotsRef.current.length; j++) {
        connectionsRef.current.push(new Connection(
          dotsRef.current[i], 
          dotsRef.current[j], 
          minConnectionDistance, 
          maxConnectionDistance
        ));
      }
    }
  }, [dotCount, theme, maxConnectionDistance, minConnectionDistance]);

  // Update and draw connections
  const updateConnections = useCallback((ctx) => {
    const connections = connectionsRef.current;

    // Update all connections
    for (let connection of connections) {
      const dx = connection.dot1.x - connection.dot2.x;
      const dy = connection.dot1.y - connection.dot2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      connection.update(distance);

      // Only draw if connection has some strength
      if (connection.strength > 0.01) {
        connection.draw(ctx, theme);
      }
    }
  }, [theme]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas with slight fade effect for smooth trails
    ctx.fillStyle = theme.palette.mode === 'dark'
      ? 'rgba(18, 18, 18, 0.1)'
      : 'rgba(245, 245, 245, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw dots
    const dots = dotsRef.current;
    const mouseX = mousePositionRef.current.x;
    const mouseY = mousePositionRef.current.y;

    for (let dot of dots) {
      dot.update(width, height, mouseX, mouseY, mouseRadius);
    }

    // Update and draw connections (continuous)
    updateConnections(ctx);

    // Draw dots on top
    for (let dot of dots) {
      dot.draw(ctx);
    }

    // Continue animation
    requestRef.current = requestAnimationFrame(animate);
  }, [theme, updateConnections, mouseRadius]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Reinitialize dots with new dimensions
    initDots(rect.width, rect.height);
  }, [initDots]);

  // Mouse event handlers
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePositionRef.current = { x: null, y: null };
  }, []);

  // Effect for initialization and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial size
    handleResize();

    // Start animation
    requestRef.current = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animate, handleResize, handleMouseMove, handleMouseLeave]);

  // Add pattern variation with time
  useEffect(() => {
    const patternInterval = setInterval(() => {
      // Randomly adjust dot velocities to create organic movement patterns
      dotsRef.current.forEach(dot => {
        if (Math.random() > 0.95) {
          dot.vx += (Math.random() - 0.5) * 0.5;
          dot.vy += (Math.random() - 0.5) * 0.5;
        }
      });
    }, 2000);

    return () => clearInterval(patternInterval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: theme.palette.mode === 'dark' ? 0.7 : 0.5,
        pointerEvents: 'auto',
      }}
    />
  );
};

export default DotsBackground;