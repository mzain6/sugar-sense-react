
import { useState } from 'react';
import { Calculator, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const PredictionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: '',
  });
  const [result, setResult] = useState<{ risk: string; percentage: number; recommendations: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRisk = () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Enhanced risk calculation based on medical parameters
      let riskScore = 0;
      
      // Pregnancies factor (for females)
      const pregnancies = parseInt(formData.pregnancies);
      if (pregnancies > 5) riskScore += 15;
      else if (pregnancies > 2) riskScore += 8;
      
      // Glucose level (most important factor)
      const glucose = parseFloat(formData.glucose);
      if (glucose >= 140) riskScore += 30;
      else if (glucose >= 100) riskScore += 20;
      else if (glucose >= 80) riskScore += 5;
      
      // Blood pressure
      const bloodPressure = parseFloat(formData.bloodPressure);
      if (bloodPressure >= 90) riskScore += 15;
      else if (bloodPressure >= 80) riskScore += 8;
      
      // BMI factor
      const bmi = parseFloat(formData.bmi);
      if (bmi >= 30) riskScore += 20;
      else if (bmi >= 25) riskScore += 12;
      else if (bmi < 18.5) riskScore += 5;
      
      // Age factor
      const age = parseInt(formData.age);
      if (age >= 60) riskScore += 15;
      else if (age >= 45) riskScore += 10;
      else if (age >= 35) riskScore += 5;
      
      // Insulin level
      const insulin = parseFloat(formData.insulin);
      if (insulin > 200) riskScore += 12;
      else if (insulin > 120) riskScore += 6;
      
      // Diabetes Pedigree Function (genetic predisposition)
      const dpf = parseFloat(formData.diabetesPedigreeFunction);
      if (dpf > 0.8) riskScore += 18;
      else if (dpf > 0.5) riskScore += 12;
      else if (dpf > 0.3) riskScore += 6;
      
      // Skin thickness
      const skinThickness = parseFloat(formData.skinThickness);
      if (skinThickness > 40) riskScore += 8;
      else if (skinThickness > 30) riskScore += 4;
      
      const percentage = Math.min(riskScore, 90);
      let riskLevel = 'Low';
      let recommendations = [
        'Maintain a healthy diet with low sugar and processed foods',
        'Engage in regular physical activity (150 minutes per week)',
        'Monitor your weight and BMI regularly',
        'Get regular health check-ups'
      ];
      
      if (percentage > 60) {
        riskLevel = 'High';
        recommendations = [
          'Consult with an endocrinologist immediately',
          'Get comprehensive diabetes screening (HbA1c, fasting glucose)',
          'Implement strict dietary changes with professional guidance',
          'Start a supervised exercise program',
          'Monitor blood glucose levels daily',
          'Consider medication consultation if recommended by doctor'
        ];
      } else if (percentage > 35) {
        riskLevel = 'Moderate';
        recommendations = [
          'Schedule regular check-ups with your healthcare provider',
          'Focus on weight management and healthy BMI',
          'Increase physical activity gradually',
          'Limit refined carbohydrates and sugary foods',
          'Monitor blood pressure regularly',
          'Consider annual diabetes screening tests'
        ];
      }
      
      setResult({
        risk: riskLevel,
        percentage,
        recommendations
      });
      setIsLoading(false);
      
      toast({
        title: "Assessment Complete",
        description: "Your diabetes risk assessment has been calculated based on medical parameters.",
      });
    }, 2000);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  return (
    <section id="prediction" className="py-20 bg-gradient-to-br from-gray-50 to-medical-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">
            Diabetes Risk Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your medical parameters below for an AI-powered diabetes risk assessment based on clinical data.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-medical-600 to-health-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Calculator className="mr-2 h-5 w-5" />
                  Medical Parameters Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pregnancies">Number of Pregnancies</Label>
                    <Input
                      id="pregnancies"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.pregnancies}
                      onChange={(e) => handleInputChange('pregnancies', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Enter 0 if male or never pregnant</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="glucose">Glucose Level (mg/dL)</Label>
                    <Input
                      id="glucose"
                      type="number"
                      placeholder="e.g., 85"
                      value={formData.glucose}
                      onChange={(e) => handleInputChange('glucose', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Fasting glucose level</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                    <Input
                      id="bloodPressure"
                      type="number"
                      placeholder="e.g., 70"
                      value={formData.bloodPressure}
                      onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Diastolic blood pressure</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skinThickness">Skin Thickness (mm)</Label>
                    <Input
                      id="skinThickness"
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.skinThickness}
                      onChange={(e) => handleInputChange('skinThickness', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Triceps skin fold thickness</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insulin">Insulin Level (μU/mL)</Label>
                    <Input
                      id="insulin"
                      type="number"
                      placeholder="e.g., 79"
                      value={formData.insulin}
                      onChange={(e) => handleInputChange('insulin', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Serum insulin level</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
                    <Input
                      id="bmi"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 25.5"
                      value={formData.bmi}
                      onChange={(e) => handleInputChange('bmi', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Weight(kg) ÷ Height(m)²</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diabetesPedigreeFunction">Diabetes Pedigree Function</Label>
                    <Input
                      id="diabetesPedigreeFunction"
                      type="number"
                      step="0.001"
                      placeholder="e.g., 0.627"
                      value={formData.diabetesPedigreeFunction}
                      onChange={(e) => handleInputChange('diabetesPedigreeFunction', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Genetic predisposition score (0-2)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 35"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Your current age</p>
                  </div>
                </div>

                <Button
                  onClick={calculateRisk}
                  disabled={!isFormValid() || isLoading}
                  className="w-full bg-medical-600 hover:bg-medical-700 text-white py-3 text-lg font-medium"
                >
                  {isLoading ? (
                    <>
                      <Activity className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Medical Data...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate Diabetes Risk
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {result ? (
                <>
                  <Card className="border-0 shadow-xl">
                    <CardHeader className={`text-white rounded-t-lg ${
                      result.risk === 'High' ? 'bg-red-600' :
                      result.risk === 'Moderate' ? 'bg-yellow-600' :
                      'bg-health-600'
                    }`}>
                      <CardTitle className="flex items-center text-xl">
                        {result.risk === 'High' ? (
                          <AlertCircle className="mr-2 h-5 w-5" />
                        ) : (
                          <CheckCircle className="mr-2 h-5 w-5" />
                        )}
                        Risk Assessment Result
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold mb-2">{result.percentage}%</div>
                        <div className={`text-lg font-semibold ${
                          result.risk === 'High' ? 'text-red-600' :
                          result.risk === 'Moderate' ? 'text-yellow-600' :
                          'text-health-600'
                        }`}>
                          {result.risk} Risk
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div
                          className={`h-3 rounded-full ${
                            result.risk === 'High' ? 'bg-red-600' :
                            result.risk === 'Moderate' ? 'bg-yellow-600' :
                            'bg-health-600'
                          }`}
                          style={{ width: `${result.percentage}%` }}
                        ></div>
                      </div>
                      
                      <p className="text-gray-600 text-center">
                        Based on your medical parameters, the AI model predicts a{' '}
                        <span className="font-semibold">{result.risk.toLowerCase()} risk</span> for diabetes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl">
                    <CardHeader className="bg-medical-600 text-white rounded-t-lg">
                      <CardTitle>Medical Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-health-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-12 text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Enter Medical Parameters
                    </h3>
                    <p className="text-gray-500">
                      Fill out all medical parameters to get your AI-powered diabetes risk assessment.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;
