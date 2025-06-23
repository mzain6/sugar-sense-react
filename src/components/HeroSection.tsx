
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToPrediction = () => {
    const element = document.getElementById('prediction');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-health-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight font-inter">
                Predict Your
                <span className="bg-gradient-to-r from-medical-600 to-health-600 bg-clip-text text-transparent"> Diabetes Risk </span>
                with AI
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Get an instant, AI-powered assessment of your diabetes risk. Take control of your health with our advanced prediction tool.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToPrediction}
                size="lg"
                className="bg-medical-600 hover:bg-medical-700 text-white px-8 py-4 text-lg font-medium"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-medical-300 text-medical-700 hover:bg-medical-50 px-8 py-4 text-lg font-medium"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-600">95%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-600">10K+</div>
                <div className="text-sm text-gray-600">Assessments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-600">5 min</div>
                <div className="text-sm text-gray-600">Quick Test</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6 animate-slide-up">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-medical-100 rounded-lg">
                  <Zap className="h-6 w-6 text-medical-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
                  <p className="text-gray-600">Get your diabetes risk assessment in under 5 minutes with our advanced AI algorithm.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-health-100 rounded-lg">
                  <Shield className="h-6 w-6 text-health-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Medically Validated</h3>
                  <p className="text-gray-600">Our model is trained on validated medical data and approved risk factors.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-medical-100 rounded-lg">
                  <Users className="h-6 w-6 text-medical-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted by Thousands</h3>
                  <p className="text-gray-600">Join thousands of users who have taken control of their health with our tool.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
