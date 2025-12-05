import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { store } from './redux/store';

// Layout
import Layout from './components/layout/Layout';

// Pages
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Services from './pages/Services';

// Auth Components
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from './components/auth/Register';
import AppNotification from './components/common/AppNotification';
import FaqSection from './components/common/FaqSection';
import Ourteam from './components/common/Ourteam';
import CareerSection from './components/home/CareerSection';
import PartnersSection from './components/home/PartnersSection';
import AppContainer from './components/common/AppContainer';
import ServiceDetails from './components/common/ServiceDetails';
// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      dark: '#115293',
      light: '#42a5f5',
    },
    secondary: {
      main: '#dc004e',
      dark: '#9a0036',
      light: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContainer>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              {/* <Route path="/services" element={<Layout><Services /></Layout>} /> */}
              {/* Services Routes - Make sure these match your navigation */}
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/services/:serviceId" element={
                <ProtectedRoute>
                  <Layout><ServiceDetails /></Layout>
                </ProtectedRoute>
              } />



              <Route path="/products" element={<Layout><Products /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/faq" element={<Layout><FaqSection /></Layout>} />
              <Route path="/careers" element={<Layout><CareerSection /></Layout>} />
              <Route path="/team" element={<Layout><Ourteam /></Layout>} />
              <Route path="/partnerships" element={<Layout><PartnersSection /></Layout>} />



              {/* Auth Routes */}
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/register" element={<Layout><Register /></Layout>} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout><Profile /></Layout>
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={<Layout><div>404 - Page Not Found</div></Layout>} />
            </Routes>
            <AppNotification />
          </AppContainer>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;