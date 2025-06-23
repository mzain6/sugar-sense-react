
import { Book, Apple, Dumbbell, Clock, AlertTriangle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">
            Learn About Diabetes Prevention
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Knowledge is power when it comes to preventing diabetes. Learn about risk factors, lifestyle changes, and prevention strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="p-3 bg-red-100 rounded-full w-fit mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Risk Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Age (45+)</p>
                    <p className="text-sm text-gray-600">Risk increases with age, especially after 45</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Family History</p>
                    <p className="text-sm text-gray-600">Having relatives with diabetes increases risk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Obesity</p>
                    <p className="text-sm text-gray-600">BMI over 25 significantly increases risk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Sedentary Lifestyle</p>
                    <p className="text-sm text-gray-600">Lack of physical activity increases risk</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="p-3 bg-health-100 rounded-full w-fit mx-auto mb-4">
                <Apple className="h-8 w-8 text-health-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Healthy Diet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-health-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Whole Grains</p>
                    <p className="text-sm text-gray-600">Choose brown rice, quinoa, and whole wheat</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-health-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Fruits & Vegetables</p>
                    <p className="text-sm text-gray-600">Aim for 5-9 servings daily</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-health-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Lean Proteins</p>
                    <p className="text-sm text-gray-600">Fish, chicken, beans, and nuts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-health-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Limit Sugar</p>
                    <p className="text-sm text-gray-600">Reduce sugary drinks and processed foods</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="p-3 bg-medical-100 rounded-full w-fit mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-medical-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Exercise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-medical-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">150 Minutes/Week</p>
                    <p className="text-sm text-gray-600">Moderate aerobic activity weekly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-medical-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Strength Training</p>
                    <p className="text-sm text-gray-600">2+ days per week of muscle strengthening</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-medical-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Start Slowly</p>
                    <p className="text-sm text-gray-600">Begin with 10-minute sessions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-medical-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-800">Fun Activities</p>
                    <p className="text-sm text-gray-600">Dancing, swimming, hiking, cycling</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prevention Timeline */}
        <div className="bg-gradient-to-r from-medical-50 to-health-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Prevention Timeline</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-md">
                <Target className="h-8 w-8 text-medical-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Week 1-2</h4>
              <p className="text-sm text-gray-600">Set realistic goals and create a plan</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-md">
                <Apple className="h-8 w-8 text-health-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Month 1</h4>
              <p className="text-sm text-gray-600">Implement dietary changes gradually</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-md">
                <Dumbbell className="h-8 w-8 text-medical-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Month 2-3</h4>
              <p className="text-sm text-gray-600">Establish regular exercise routine</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-md">
                <Clock className="h-8 w-8 text-health-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ongoing</h4>
              <p className="text-sm text-gray-600">Maintain habits and monitor progress</p>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Important Medical Disclaimer</h4>
              <p className="text-amber-700 text-sm">
                This tool is for educational purposes only and should not replace professional medical advice. 
                If you have concerns about diabetes or show signs of high risk, please consult with a healthcare provider 
                for proper diagnosis and treatment. Early detection and intervention can significantly improve outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
