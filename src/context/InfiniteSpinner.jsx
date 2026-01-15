import React from 'react';
import { Box, keyframes, useTheme } from '@mui/material';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
`;

const InfiniteSpinner = ({
  size = 64,
  thickness = 4,
  color = 'primary',
  speed = 'normal',
  variant = 'circular', // 'circular' | 'dots' | 'pulse'
}) => {
  const theme = useTheme();

  const speedMap = {
    slow: '2s',
    normal: '1.5s',
    fast: '1s',
    veryfast: '0.7s'
  };

  const getColor = () => {
    if (color.startsWith('#')) return color;
    return theme.palette[color]?.main || theme.palette.primary.main;
  };

  // Variant 1: Circular Spinner (Material-UI style)
  const renderCircularSpinner = () => (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          display: 'block',
          position: 'absolute',
          width: size,
          height: size,
          border: `${thickness}px solid ${theme.palette.grey[200]}`,
          borderRadius: '50%',
          animation: `${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        }}
      />
      <Box
        sx={{
          boxSizing: 'border-box',
          display: 'block',
          position: 'absolute',
          width: size,
          height: size,
          border: `${thickness}px solid ${getColor()}`,
          borderRadius: '50%',
          borderColor: `${getColor()} transparent transparent transparent`,
          animation: `${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        }}
      />
    </Box>
  );

  // Variant 2: SVG Circular Spinner (Smooth professional)
  const renderSVGSpinner = () => (
    <Box
      sx={{
        display: 'inline-block',
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{
          animation: `${rotate} ${speedMap[speed]} linear infinite`,
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={theme.palette.grey[200]}
          strokeWidth="4"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={getColor()}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1, 200"
          strokeDashoffset="0"
          style={{
            animation: `${dash} 1.5s ease-in-out infinite`,
          }}
        />
      </svg>
    </Box>
  );

  // Variant 3: Dots Spinner
  const renderDotsSpinner = () => {
    const dotSize = size / 5;
    const bounce = keyframes`
      0%, 100% {
        transform: scale(0);
      }
      50% {
        transform: scale(1);
      }
    `;

    return (
      <Box
        sx={{
          display: 'inline-block',
          position: 'relative',
          width: size,
          height: size,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: getColor(),
              animation: `${bounce} ${speedMap[speed]} ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </Box>
    );
  };

  // Variant 4: Pulse Spinner
  const renderPulseSpinner = () => {
    const pulse = keyframes`
      0% {
        transform: scale(0.8);
        opacity: 0.7;
      }
      50% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.8);
        opacity: 0.7;
      }
    `;

    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
        }}
      >
        <Box
          sx={{
            width: size * 0.8,
            height: size * 0.8,
            borderRadius: '50%',
            backgroundColor: getColor(),
            animation: `${pulse} ${speedMap[speed]} ease-in-out infinite`,
            opacity: 0.7,
          }}
        />
      </Box>
    );
  };

  switch (variant) {
    case 'dots':
      return renderDotsSpinner();
    case 'pulse':
      return renderPulseSpinner();
    case 'svg':
      return renderSVGSpinner();
    default:
      return renderCircularSpinner();
  }
};

export default InfiniteSpinner;