
import { Heart, Brain, TrendingUp, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">
            Understanding Diabetes Risk
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diabetes affects millions worldwide. Early detection and risk assessment can help prevent or delay the onset of Type 2 diabetes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-medical-50 to-white p-8 rounded-2xl border border-medical-100">
            <div className="p-3 bg-medical-600 rounded-lg w-fit mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk Factors</h3>
            <p className="text-gray-600 mb-4">
              Age, family history, weight, and lifestyle factors all contribute to diabetes risk. Understanding these helps in prevention.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Family history assessment
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                BMI calculation
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Lifestyle evaluation
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-health-50 to-white p-8 rounded-2xl border border-health-100">
            <div className="p-3 bg-health-600 rounded-lg w-fit mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Technology</h3>
            <p className="text-gray-600 mb-4">
              Our machine learning model analyzes multiple factors to provide accurate risk predictions based on medical research.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Advanced algorithms
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Medical data training
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Continuous improvement
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-medical-50 to-white p-8 rounded-2xl border border-medical-100 md:col-span-2 lg:col-span-1">
            <div className="p-3 bg-medical-600 rounded-lg w-fit mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Prevention</h3>
            <p className="text-gray-600 mb-4">
              Early detection enables lifestyle changes that can prevent or delay Type 2 diabetes development.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Dietary recommendations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Exercise planning
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-health-600 mr-2" />
                Regular monitoring
              </li>
            </ul>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-medical-600 to-health-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">463M</div>
              <div className="text-medical-100">People with diabetes worldwide</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">90%</div>
              <div className="text-medical-100">Have Type 2 diabetes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50%</div>
              <div className="text-medical-100">Cases are preventable</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5-10%</div>
              <div className="text-medical-100">Weight loss reduces risk</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
