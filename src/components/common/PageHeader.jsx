import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import React from 'react';
// Animation keyframes for text
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const PageHeader = ({ backgroundImage, title, subtitle, breadcrumbs = [], animation = 'fadeInUp' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Responsive configuration object
  const responsive = {
    // Padding values
    paddingY: 10,
    paddingX: 4,
    
    // Height values
    minHeight: {
      xs: 350,      // Mobile portrait
      sm: 400,      // Mobile landscape / Small tablet
      md: 450,      // Tablet
      lg: 500,      // Desktop
      xl: 650       // Large desktop
    },
    
    // Width values
    contentWidth: {
      xs: '98%',    // Mobile
      sm: '95%',    // Small tablet
      md: '90%',    // Tablet
      lg: '85%',    // Desktop
      xl: '80%'     // Large desktop
    },
    
    // Title font sizes (in rem)
    titleSize: {
      xs: 1.8,      // Mobile
      sm: 2.2,      // Small tablet
      md: 2.6,      // Tablet
      lg: 3,        // Desktop
      xl: 3.5       // Large desktop
    },
    
    // Subtitle font sizes (in rem)
    subtitleSize: {
      xs: 0.9,      // Mobile
      sm: 1.1,      // Small tablet
      md: 1.3,      // Tablet
      lg: 1.5,      // Desktop
      xl: 1.7       // Large desktop
    },
    
    // Spacing
    marginBottom: {
      title: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
      subtitle: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 4 },
      decorative: { xs: 2, sm: 2.5, md: 3, lg: 4, xl: 5 }
    },
    
    // Decorative dots
    dotSize: {
      xs: 4,        // Mobile
      sm: 5,        // Small tablet
      md: 6,        // Tablet
      lg: 8,        // Desktop
      xl: 10        // Large desktop
    }
  };

  // Get animation based on prop or device
  const getAnimation = () => {
    if (animation) return animation;
    
    // Default animations based on device
    if (isMobile) return 'fadeIn';
    if (isTablet) return 'slideInLeft';
    return 'fadeInUp';
  };

  // Animation style based on type
  const getAnimationStyle = (animationType, delay = 0) => {
    let animationName;
    
    switch(animationType) {
      case 'fadeInUp':
        animationName = fadeInUp;
        break;
      case 'fadeIn':
        animationName = fadeIn;
        break;
      case 'slideInLeft':
        animationName = slideInLeft;
        break;
      case 'slideInRight':
        animationName = slideInRight;
        break;
      case 'scaleIn':
        animationName = scaleIn;
        break;
      default:
        animationName = fadeInUp;
    }
    
    return {
      animation: `${animationName} 0.8s ease-out ${delay}s forwards`,
      opacity: 0,
      willChange: 'transform, opacity', // Performance optimization
    };
  };

  const currentAnimation = getAnimation();

  return (
    <Box
      sx={{
        background: backgroundImage || 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        top: 30, // Responsive top spacing
        mb: { xs: 1.5, sm: 1.8, md: 2 },
        
        // Overlay
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1,
        },
        
        // Responsive padding
        py: responsive.paddingY,
        px: responsive.paddingX,
        
        // Responsive height
        minHeight: responsive.minHeight,
        
        // Center content
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        
        // Ensure content fits on very small screens
        '@media (max-width: 360px)': {
          minHeight: 200,
          py: 2,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '100%',
          width: responsive.contentWidth,
          
          // Additional responsive adjustments
          '@media (min-width: 2000px)': {
            width: '70%',
          },
        }}
      >
        {/* Title */}
        <Typography
          variant={isMobile ? "h3" : isTablet ? "h2" : "h1"}
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: {
              xs: `${responsive.titleSize.xs}rem`,
              sm: `${responsive.titleSize.sm}rem`,
              md: `${responsive.titleSize.md}rem`,
              lg: `${responsive.titleSize.lg}rem`,
              xl: `${responsive.titleSize.xl}rem`,
            },
            lineHeight: {
              xs: 1.2,
              sm: 1.25,
              md: 1.3,
              lg: 1.35,
              xl: 1.4
            },
            mb: responsive.marginBottom.title,
            textShadow: {
              xs: '1px 1px 2px rgba(0,0,0,0.5)',
              sm: '1.5px 1.5px 3px rgba(0,0,0,0.5)',
              md: '2px 2px 4px rgba(0,0,0,0.5)',
              lg: '2.5px 2.5px 5px rgba(0,0,0,0.5)'
            },
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            maxWidth: '100%',
            paddingLeft: { xs: 0.5, sm: 1 },
            paddingRight: { xs: 0.5, sm: 1 },
            ...getAnimationStyle(currentAnimation, 0.2),
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            variant={isMobile ? "body1" : isTablet ? "h6" : "h5"}
            sx={{
              opacity: 0.95,
              fontSize: {
                xs: `${responsive.subtitleSize.xs}rem`,
                sm: `${responsive.subtitleSize.sm}rem`,
                md: `${responsive.subtitleSize.md}rem`,
                lg: `${responsive.subtitleSize.lg}rem`,
                xl: `${responsive.subtitleSize.xl}rem`,
              },
              lineHeight: {
                xs: 1.4,
                sm: 1.45,
                md: 1.5,
                lg: 1.55,
                xl: 1.6
              },
              mb: responsive.marginBottom.subtitle,
              textShadow: {
                xs: '1px 1px 2px rgba(0,0,0,0.5)',
                sm: '1px 1px 3px rgba(0,0,0,0.5)',
                md: '1px 1px 3px rgba(0,0,0,0.5)',
                lg: '1.5px 1.5px 4px rgba(0,0,0,0.5)'
              },
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              maxWidth: {
                xs: '100%',
                sm: '95%',
                md: '90%',
                lg: '85%',
                xl: '80%'
              },
              mx: 'auto',
              paddingLeft: { xs: 1, sm: 2 },
              paddingRight: { xs: 1, sm: 2 },
              ...getAnimationStyle(currentAnimation, 0.4),
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Decorative elements with animation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: responsive.marginBottom.decorative,
            gap: {
              xs: 0.8,
              sm: 1,
              md: 1.5,
              lg: 1.8,
              xl: 2
            },
            ...getAnimationStyle(currentAnimation, 0.6),
            
            // Hide on very small screens if needed
            '@media (max-width: 360px)': {
              display: 'none'
            },
          }}
        >
          {/* Animated decorative dots */}
          {[1, 2, 3].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: responsive.dotSize,
                height: responsive.dotSize,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                animation: 'pulse 2s infinite',
                animationDelay: `${dot * 0.3}s`,
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 1,
                    transform: 'scale(1)'
                  },
                  '50%': {
                    opacity: 0.5,
                    transform: 'scale(1.1)'
                  }
                },
                
                // Larger dots on hover
                '&:hover': {
                  transform: 'scale(1.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease'
                }
              }}
            />
          ))}
        </Box>
        
        {/* Fixed breadcrumbs section */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Box
            sx={{
              mt: responsive.marginBottom.decorative,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 0.5,
              ...getAnimationStyle(currentAnimation, 0.8),
            }}
          >
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {/* Render the crumb properly based on its type */}
                {typeof crumb === 'string' ? (
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: {
                        xs: '0.65rem',
                        sm: '0.7rem',
                        md: '0.75rem',
                        lg: '0.8rem'
                      },
                    }}
                  >
                    {crumb}
                  </Typography>
                ) : (
                  // If crumb is an object with label property
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: {
                        xs: '0.65rem',
                        sm: '0.7rem',
                        md: '0.75rem',
                        lg: '0.8rem'
                      },
                    }}
                  >
                    {crumb.label || crumb.name || JSON.stringify(crumb)}
                  </Typography>
                )}
                
                {/* Add separator if not the last item */}
                {index < breadcrumbs.length - 1 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: {
                        xs: '0.65rem',
                        sm: '0.7rem',
                        md: '0.75rem',
                        lg: '0.8rem'
                      },
                      mx: 0.5,
                    }}
                  >
                    /
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;