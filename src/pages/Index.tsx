
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PredictionForm from '@/components/PredictionForm';
import EducationSection from '@/components/EducationSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen font-inter">
      <Header />
      <HeroSection />
      <AboutSection />
      <PredictionForm />
      <EducationSection />
      <Footer />
    </div>
  );
};

export default Index;
