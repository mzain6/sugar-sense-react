
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-medical-600" />
            <span className="text-xl font-bold text-gray-900 font-inter">DiabetesPredict</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-600 hover:text-medical-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-medical-600 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('prediction')}
              className="text-gray-600 hover:text-medical-600 transition-colors font-medium"
            >
              Prediction
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className="text-gray-600 hover:text-medical-600 transition-colors font-medium"
            >
              Learn More
            </button>
            <Button
              onClick={() => scrollToSection('prediction')}
              className="bg-medical-600 hover:bg-medical-700 text-white"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-medical-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-600 hover:text-medical-600 transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-600 hover:text-medical-600 transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('prediction')}
                className="text-left text-gray-600 hover:text-medical-600 transition-colors font-medium"
              >
                Prediction
              </button>
              <button
                onClick={() => scrollToSection('education')}
                className="text-left text-gray-600 hover:text-medical-600 transition-colors font-medium"
              >
                Learn More
              </button>
              <Button
                onClick={() => scrollToSection('prediction')}
                className="bg-medical-600 hover:bg-medical-700 text-white w-fit"
              >
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
