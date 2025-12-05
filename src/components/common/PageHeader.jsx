import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PageHeader = ({ backgroundImage, title, subtitle, breadcrumbs = [] }) => {
  return (
    <Box
      sx={{
        background: backgroundImage || 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: 6,
        mb: 4,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: 400, md: 500, lg: 400, xl: 400 },
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            {subtitle}
          </Typography>
        )}

        {/* {breadcrumbs.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: 'white' }} />}
            sx={{ justifyContent: 'center', mt: 2 }}
          >
            <Link component={RouterLink} to="/" color="inherit" underline="hover">
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <Link
                key={index}
                component={RouterLink}
                to={crumb.path}
                color="inherit"
                underline="hover"
              >
                {crumb.label}
              </Link>
            ))}
            <Typography color="primary.light">{title}</Typography>
          </Breadcrumbs>
        )} */}
      </Box>
    </Box>
  );
};

export default PageHeader;