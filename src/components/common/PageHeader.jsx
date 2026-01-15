import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const PageHeader = ({ backgroundImage, title, subtitle, breadcrumbs = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text readability
          zIndex: 1,
        },
        py: { xs: 4, sm: 5, md: 6, lg: 7 },
        px: { xs: 2, sm: 3, md: 4 },
        minHeight: {
          xs: 250,   // Mobile
          sm: 300,   // Small tablet
          md: 350,   // Tablet
          lg: 400,   // Desktop
          xl: 450    // Large desktop
        },
        maxHeight: {
          xs: 400,
          md: 500,
          lg: 600
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '100%',
          width: {
            xs: '100%',     // Full width on mobile
            sm: '90%',      // 90% on tablet
            md: '85%',      // 85% on desktop
            lg: '80%',      // 80% on large desktop
            xl: '75%'       // 75% on extra large
          }
        }}
      >
        <Typography
          variant={isMobile ? "h3" : isTablet ? "h2" : "h1"}
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: {
              xs: '2rem',    // Mobile
              sm: '2.5rem',  // Small tablet
              md: '3rem',    // Tablet
              lg: '3.5rem',  // Desktop
              xl: '4rem'     // Large desktop
            },
            lineHeight: {
              xs: 1.2,
              sm: 1.3,
              md: 1.3,
              lg: 1.4
            },
            mb: {
              xs: 1.5,
              sm: 2,
              md: 2.5,
              lg: 3
            },
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto'
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
            sx={{
              opacity: 0.95,
              fontSize: {
                xs: '1rem',
                sm: '1.25rem',
                md: '1.5rem',
                lg: '1.75rem',
                xl: '2rem'
              },
              lineHeight: {
                xs: 1.4,
                sm: 1.5,
                md: 1.5,
                lg: 1.6
              },
              mb: {
                xs: 2,
                sm: 3,
                md: 4,
                lg: 5
              },
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              maxWidth: {
                xs: '100%',
                sm: '90%',
                md: '85%',
                lg: '80%'
              },
              mx: 'auto'
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* {breadcrumbs.length > 0 && (
          <Box
            sx={{
              mt: { xs: 2, sm: 3, md: 4 },
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />}
              sx={{
                justifyContent: 'center',
                '& .MuiBreadcrumbs-ol': {
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                },
                '& .MuiBreadcrumbs-li': {
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
              maxItems={isMobile ? 3 : breadcrumbs.length + 2}
              itemsAfterCollapse={2}
              itemsBeforeCollapse={1}
            >
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
                sx={{
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.875rem',
                    md: '1rem'
                  }
                }}
              >
                Home
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={crumb.path}
                  color="inherit"
                  underline="hover"
                  sx={{
                    fontSize: {
                      xs: '0.75rem',
                      sm: '0.875rem',
                      md: '1rem'
                    }
                  }}
                >
                  {crumb.label}
                </Link>
              ))}
              <Typography
                color="primary.light"
                sx={{
                  fontWeight: 'bold',
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.875rem',
                    md: '1rem'
                  }
                }}
              >
                {title}
              </Typography>
            </Breadcrumbs>
          </Box>
        )} */}

        {/* Optional decorative elements */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: 3, sm: 4, md: 5 },
            gap: { xs: 1, sm: 2 }
          }}
        >
          {/* Decorative dots or indicators if needed */}
          {[1, 2, 3].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: { xs: 6, sm: 8, md: 10 },
                height: { xs: 6, sm: 8, md: 10 },
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
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader;