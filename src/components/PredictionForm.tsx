
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
    age: '',
    gender: '',
    bmi: '',
    familyHistory: '',
    physicalActivity: '',
    smoking: '',
    alcohol: '',
    bloodPressure: '',
    cholesterol: '',
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
      // Simple risk calculation based on factors
      let riskScore = 0;
      
      // Age factor
      if (parseInt(formData.age) > 45) riskScore += 20;
      else if (parseInt(formData.age) > 35) riskScore += 10;
      
      // BMI factor
      const bmi = parseFloat(formData.bmi);
      if (bmi > 30) riskScore += 25;
      else if (bmi > 25) riskScore += 15;
      
      // Family history
      if (formData.familyHistory === 'yes') riskScore += 20;
      
      // Physical activity
      if (formData.physicalActivity === 'low') riskScore += 15;
      else if (formData.physicalActivity === 'moderate') riskScore += 5;
      
      // Smoking
      if (formData.smoking === 'yes') riskScore += 10;
      
      // Blood pressure
      if (formData.bloodPressure === 'high') riskScore += 15;
      
      // Cholesterol
      if (formData.cholesterol === 'high') riskScore += 10;
      
      const percentage = Math.min(riskScore, 85);
      let riskLevel = 'Low';
      let recommendations = [
        'Maintain a healthy diet with low sugar and processed foods',
        'Engage in regular physical activity (150 minutes per week)',
        'Monitor your weight and BMI regularly'
      ];
      
      if (percentage > 60) {
        riskLevel = 'High';
        recommendations = [
          'Consult with a healthcare provider immediately',
          'Consider a comprehensive diabetes screening',
          'Implement strict dietary changes',
          'Start a supervised exercise program',
          'Monitor blood sugar levels regularly'
        ];
      } else if (percentage > 30) {
        riskLevel = 'Moderate';
        recommendations = [
          'Schedule regular check-ups with your doctor',
          'Focus on weight management',
          'Increase physical activity gradually',
          'Limit sugary drinks and refined carbohydrates',
          'Consider annual diabetes screening'
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
        description: "Your diabetes risk assessment has been calculated.",
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
            Answer a few questions about your health and lifestyle to get your personalized diabetes risk assessment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-medical-600 to-health-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Calculator className="mr-2 h-5 w-5" />
                  Health Assessment Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
                  <Input
                    id="bmi"
                    type="number"
                    step="0.1"
                    placeholder="Enter your BMI (e.g., 25.5)"
                    value={formData.bmi}
                    onChange={(e) => handleInputChange('bmi', e.target.value)}
                    className="border-gray-300"
                  />
                  <p className="text-sm text-gray-500">Don't know your BMI? Calculate: weight(kg) ÷ height(m)²</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="familyHistory">Family History of Diabetes</Label>
                  <Select value={formData.familyHistory} onValueChange={(value) => handleInputChange('familyHistory', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="physicalActivity">Physical Activity Level</Label>
                  <Select value={formData.physicalActivity} onValueChange={(value) => handleInputChange('physicalActivity', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (sedentary lifestyle)</SelectItem>
                      <SelectItem value="moderate">Moderate (some exercise)</SelectItem>
                      <SelectItem value="high">High (regular exercise)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smoking">Smoking</Label>
                    <Select value={formData.smoking} onValueChange={(value) => handleInputChange('smoking', value)}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="former">Former smoker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alcohol">Alcohol Consumption</Label>
                    <Select value={formData.alcohol} onValueChange={(value) => handleInputChange('alcohol', value)}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="heavy">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodPressure">Blood Pressure</Label>
                    <Select value={formData.bloodPressure} onValueChange={(value) => handleInputChange('bloodPressure', value)}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cholesterol">Cholesterol Level</Label>
                    <Select value={formData.cholesterol} onValueChange={(value) => handleInputChange('cholesterol', value)}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
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
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate Risk
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
                        Based on the information provided, your diabetes risk assessment shows a{' '}
                        <span className="font-semibold">{result.risk.toLowerCase()} risk</span> level.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl">
                    <CardHeader className="bg-medical-600 text-white rounded-t-lg">
                      <CardTitle>Recommendations</CardTitle>
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
                      Complete the Assessment
                    </h3>
                    <p className="text-gray-500">
                      Fill out the form to get your personalized diabetes risk assessment and recommendations.
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
