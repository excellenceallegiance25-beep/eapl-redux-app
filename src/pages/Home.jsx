import { Box } from '@mui/material';
import AchievementsSection from '../components/home/AchievementsSection';
import CareerSection from '../components/home/CareerSection';
import CTASection from '../components/home/CTASection';
import HeroSection from '../components/home/HeroSection';
import PartnersSection from '../components/home/PartnersSection';
import ReviewsSection from '../components/home/ReviewsSection';
import ServicesSection from '../components/home/ServicesSection';

const Home = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <HeroSection />
      <ServicesSection />
      <AchievementsSection />
      <PartnersSection />
      <ReviewsSection />
      <CareerSection />
      <CTASection />
    </Box>
  );
};

export default Home;