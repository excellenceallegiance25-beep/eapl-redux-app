import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { Backdrop, Box, Typography, alpha } from "@mui/material";
import { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";

// Simplified animations using CSS transitions
const STAGE_COLORS = [
  "#3b82f6", // Stage 0: Blue
  "#8b5cf6", // Stage 1: Purple
  "#ec4899", // Stage 2: Pink
  "#f59e0b", // Stage 3: Amber
  "#10b981", // Success: Emerald
  "#ef4444", // Error: Red
];

const STAGES = [
  {
    icon: <AutoAwesomeRoundedIcon />,
    name: "Initializing",
    message: "Starting up analysis engine",
  },
  {
    icon: <RocketLaunchRoundedIcon />,
    name: "Processing",
    message: "Analyzing data patterns",
  },
  {
    icon: <Diversity3RoundedIcon />,
    name: "Optimizing",
    message: "Refining insights",
  },
  {
    icon: <AutoAwesomeRoundedIcon />,
    name: "Finalizing",
    message: "Preparing results",
  },
];

const APILoader = () => {
//   const theme = useTheme();
  const [progressValue, setProgressValue] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stageTransition, setStageTransition] = useState(false);
  const [immediateAnimation, setImmediateAnimation] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const {
    isLoading,
    gifUrl,
    imageUrl,
    message = "Processing your request",
    progress,
    status = "loading",
    subMessage = "Calculating insights",
  } = useSelector((state) => state.loading);

  // Immediate animation trigger
  useEffect(() => {
    if (isLoading) {
      setImmediateAnimation(true);
      startTimeRef.current = Date.now();
    } else {
      setImmediateAnimation(false);
    }
  }, [isLoading]);

  // Optimized stage calculation
  const currentStage = useMemo(() => {
    if (status !== "loading") return 0;
    if (progress !== undefined) {
      return Math.min(
        Math.floor((progress / 100) * STAGES.length),
        STAGES.length - 1,
      );
    }
    return Math.min(Math.floor(elapsedTime / 5), STAGES.length - 1);
  }, [elapsedTime, progress, status]);

  // Smooth stage transitions
  useEffect(() => {
    setStageTransition(true);
    const timer = setTimeout(() => setStageTransition(false), 300);
    return () => clearTimeout(timer);
  }, [currentStage]);

  // Current color with immediate update
  const currentColor = useMemo(() => {
    if (status === "success") return STAGE_COLORS[4];
    if (status === "error") return STAGE_COLORS[5];
    return STAGE_COLORS[currentStage];
  }, [currentStage, status]);

  // Optimized progress animation with immediate start
  useEffect(() => {
    if (progress === undefined) {
      setProgressValue(0);
      return;
    }

    // Start immediately with requestAnimationFrame
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const animationProgress = Math.min(elapsed / 300, 1); // 300ms animation

      setProgressValue((prev) => {
        const target = progress;
        const diff = target - prev;
        const newValue = prev + diff * animationProgress * 0.3;
        return Math.min(Math.max(newValue, 0), target);
      });

      if (animationProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [progress]);

  // Efficient elapsed time counter
  useEffect(() => {
    if (!isLoading) {
      setElapsedTime(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Optimized status icon with immediate rendering
  const StatusIcon = useMemo(() => {
    if (gifUrl) {
      return (
        <Box
          component="img"
          src={gifUrl}
          alt="Loading"
          loading="lazy"
          sx={{
            width: 100,
            height: 100,
            objectFit: "contain",
            borderRadius: "20%",
            animation: immediateAnimation
              ? "morph 8s ease-in-out infinite"
              : "none",
            boxShadow: immediateAnimation
              ? `0 0 40px ${alpha(currentColor, 0.5)},
                               0 0 80px ${alpha(currentColor, 0.3)},
                               inset 0 0 20px rgba(255, 255, 255, 0.2)`
              : "none",
            border: `2px solid ${alpha(currentColor, 0.6)}`,
            position: "relative",
            zIndex: 2,
            willChange: "transform, box-shadow",
          }}
        />
      );
    }

    if (imageUrl) {
      return (
        <Box
          component="img"
          src={imageUrl}
          alt="Loading"
          loading="lazy"
          sx={{
            width: 100,
            height: 100,
            objectFit: "contain",
            borderRadius: "50%",
            animation: immediateAnimation
              ? "neonPulse 2s ease-in-out infinite"
              : "none",
            boxShadow: immediateAnimation
              ? `0 0 40px ${alpha(currentColor, 0.6)},
                               0 0 80px ${alpha(currentColor, 0.3)}`
              : "none",
            position: "relative",
            zIndex: 2,
            willChange: "transform, box-shadow",
          }}
        />
      );
    }

    return (
      <Box
        sx={{
          fontSize: "3.5rem",
          color: currentColor,
          animation: immediateAnimation
            ? "neonPulse 2s ease-in-out infinite"
            : "none",
          position: "relative",
          zIndex: 2,
          transition: stageTransition ? "all 0.3s ease" : "none",
          willChange: "transform, color",
        }}
      >
        {STAGES[currentStage]?.icon || <AutoAwesomeRoundedIcon />}
      </Box>
    );
  }, [
    gifUrl,
    imageUrl,
    currentColor,
    currentStage,
    immediateAnimation,
    stageTransition,
  ]);

  // Dynamic message with immediate update
  const dynamicMessage = useMemo(() => {
    if (status !== "loading") return subMessage;

    const messages = [
      "Initializing systems...",
      "Analyzing data patterns",
      "Processing complex algorithms",
      "Optimizing results",
      "Generating insights",
      "Finalizing calculations",
    ];

    const index = Math.min(Math.floor(elapsedTime / 4), messages.length - 1);
    return messages[index];
  }, [elapsedTime, status, subMessage]);

  if (!isLoading) return null;

  return (
    <Backdrop
      open={isLoading}
      ref={containerRef}
      sx={{
        zIndex: 99999,
        backgroundColor: "rgba(10, 10, 15, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        p: 2,
        animation: immediateAnimation ? "fadeIn 0.2s ease-out" : "none",
        opacity: immediateAnimation ? 1 : 0,
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "@keyframes morph": {
          "0%, 100%": { borderRadius: "40% 60% 70% 30% / 40% 40% 60% 50%" },
          "34%": { borderRadius: "70% 30% 50% 50% / 30% 30% 70% 70%" },
          "67%": { borderRadius: "100% 60% 60% 100% / 100% 100% 60% 60%" },
        },
        "@keyframes neonPulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 5px currentColor) brightness(1)",
          },
          "50%": {
            filter: "drop-shadow(0 0 20px currentColor) brightness(1.3)",
          },
        },
        "@keyframes orbit": {
          "0%": { transform: "rotate(0deg) translateX(50px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(50px) rotate(-360deg)",
          },
        },
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      }}
    >
      {/* Main loader container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          maxWidth: 400,
          width: "100%",
          p: 4,
          position: "relative",
          opacity: immediateAnimation ? 1 : 0,
          transform: immediateAnimation ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          willChange: "opacity, transform",
        }}
      >
        {/* Central animation container */}
        <Box
          sx={{
            position: "relative",
            width: 220,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          {/* Stage indicator dots */}
          {status === "loading" && (
            <Box
              sx={{
                position: "absolute",
                top: -20,
                display: "flex",
                gap: 1,
                opacity: immediateAnimation ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {STAGES.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor:
                      index === currentStage
                        ? currentColor
                        : alpha(currentColor, 0.2),
                    transition: "all 0.3s ease",
                    animation:
                      index === currentStage && immediateAnimation
                        ? "pulse 1.5s ease-in-out infinite"
                        : "none",
                    "@keyframes pulse": {
                      "0%, 100%": {
                        opacity: 0.8,
                        transform: "scale(0.95)",
                      },
                      "50%": {
                        opacity: 1,
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Orbiting elements with immediate animation */}
          <Box
            sx={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: `1px dashed ${alpha(currentColor, 0.3)}`,
              animation: immediateAnimation
                ? "orbit 8s linear infinite"
                : "none",
              transition: "all 0.5s ease",
              opacity: immediateAnimation ? 1 : 0,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${currentColor}, ${alpha(currentColor, 0.5)})`,
              animation: immediateAnimation
                ? "orbit 3s linear infinite"
                : "none",
              opacity: immediateAnimation ? 0.6 : 0,
              filter: immediateAnimation
                ? `drop-shadow(0 0 6px ${currentColor})`
                : "none",
            }}
          />

          {/* Main icon container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: `linear-gradient(135deg, 
                                ${alpha(currentColor, 0.25)} 0%, 
                                ${alpha(currentColor, 0.1)} 100%)`,
              boxShadow: immediateAnimation
                ? `inset 0 0 30px ${alpha(currentColor, 0.3)},
                                   0 0 50px ${alpha(currentColor, 0.4)},
                                   0 0 100px ${alpha(currentColor, 0.2)}`
                : "none",
              border: `1.5px solid ${alpha(currentColor, 0.4)}`,
              animation: immediateAnimation
                ? "morph 12s ease-in-out infinite"
                : "none",
              backdropFilter: "blur(8px)",
              zIndex: 1,
              transition: "all 0.5s ease",
              opacity: immediateAnimation ? 1 : 0,
              transform: immediateAnimation ? "scale(1)" : "scale(0.9)",
            }}
          >
            {StatusIcon}
          </Box>
        </Box>

        {/* Text content */}
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            opacity: immediateAnimation ? 1 : 0,
            transition: "opacity 0.3s ease 0.1s",
          }}
        >
          {/* Main message with shimmer */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              background:
                status === "loading"
                  ? `linear-gradient(90deg, 
                                    #ffffff, 
                                    ${currentColor}, 
                                    #ffffff,
                                    ${alpha(currentColor, 0.7)})`
                  : "#ffffff",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation:
                immediateAnimation && status === "loading"
                  ? "shimmer 2.5s linear infinite"
                  : "none",
              letterSpacing: "-0.01em",
              transition: "all 0.5s ease",
            }}
          >
            {message}
          </Typography>

          {/* Sub message */}
          <Typography
            variant="body2"
            sx={{
              color: alpha("#ffffff", 0.75),
              mb: 2,
              minHeight: 20,
              fontWeight: 400,
              fontSize: "0.9rem",
              transition: "all 0.3s ease",
            }}
          >
            {dynamicMessage}
          </Typography>

          {/* Progress bar */}
          {progress !== undefined && (
            <Box
              sx={{
                width: "100%",
                mb: 2,
                opacity: immediateAnimation ? 1 : 0,
                transition: "opacity 0.3s ease 0.2s",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: alpha("#ffffff", 0.1),
                  overflow: "hidden",
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${progressValue}%`,
                    background: `linear-gradient(90deg, 
                                            ${currentColor}, 
                                            ${alpha(currentColor, 0.8)})`,
                    backgroundSize: "200% 100%",
                    animation: immediateAnimation
                      ? "shimmer 2s linear infinite"
                      : "none",
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: 1.5,
                    boxShadow: `0 0 10px ${alpha(currentColor, 0.5)}`,
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: alpha("#ffffff", 0.6),
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Progress</span>
                <span>{Math.round(progressValue)}%</span>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Bottom info text */}
      <Typography
        variant="caption"
        sx={{
          color: alpha("#ffffff", 0.5),
          fontSize: "0.7rem",
          textAlign: "center",
          maxWidth: 400,
          letterSpacing: "0.02em",
          opacity: immediateAnimation ? 1 : 0,
          transform: immediateAnimation ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s",
        }}
      >
        {status === "loading" && elapsedTime > 10
          ? "Still processing • This may take a moment longer..."
          : "Please wait while we process your request"}
      </Typography>
    </Backdrop>
  );
};

export default APILoader;
