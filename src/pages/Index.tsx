import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Users, TrendingUp, ArrowRight, PlayCircle } from 'lucide-react';
import heroImage from '@/assets/hero-logistics.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartAssessment = async () => {
    setIsStarting(true);
    // Small delay for visual feedback
    setTimeout(() => {
      navigate('/assessment');
    }, 500);
  };

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: 'Psychometric Analysis',
      description: 'Comprehensive personality and cognitive assessment using validated frameworks'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-success" />,
      title: 'Technical Evaluation',
      description: 'Test your knowledge of reverse logistics concepts and problem-solving abilities'
    },
    {
      icon: <Users className="h-6 w-6 text-secondary" />,
      title: 'WISCAR Framework',
      description: 'Multi-dimensional readiness assessment across Will, Interest, Skill, Cognitive, Ability & Real-world fit'
    },
    {
      icon: <Clock className="h-6 w-6 text-warning" />,
      title: 'Personalized Results',
      description: 'Get detailed feedback, skill gap analysis, and customized learning recommendations'
    }
  ];

  const careerPaths = [
    'Reverse Logistics Planner',
    'Returns & Warranty Coordinator', 
    'Sustainability Logistics Specialist',
    'Circular Supply Chain Analyst',
    'Aftermarket Supply Chain Analyst'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              🔄 Career Assessment Tool
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Are You Ready to Become a Reverse Logistics Planner?
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your psychological compatibility, technical readiness, and career alignment 
              with this comprehensive, psychometrically validated assessment designed for aspiring 
              reverse logistics professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={handleStartAssessment}
                disabled={isStarting}
                className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-lg px-8 py-6 shadow-elegant transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {isStarting ? (
                  <>
                    <Clock className="mr-2 h-5 w-5 animate-spin" />
                    Starting Assessment...
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Start Assessment
                  </>
                )}
              </Button>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                20-30 minutes • Free Assessment
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-secondary">20-30</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-success">3</div>
                <div className="text-sm text-muted-foreground">Assessment Sections</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-warning">100%</div>
                <div className="text-sm text-muted-foreground">Personalized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Reverse Logistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Is Reverse Logistics Planning?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Reverse Logistics focuses on moving products from customers back to vendors or manufacturers 
              for returns, repairs, recycling, or disposal. It's essential for sustainability, cost control, 
              warranty servicing, and customer experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Common Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">Planning and coordinating return flows</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">Tracking reverse inventory</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">Managing return merchandise authorizations (RMAs)</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">Analyzing return reasons and reducing return rates</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">Collaborating with warehousing, service centers, and recycling units</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Success Traits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                  <span className="text-sm">Structured and process-oriented thinking</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                  <span className="text-sm">Attention to detail</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                  <span className="text-sm">High accountability</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                  <span className="text-sm">Problem-solving mindset</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                  <span className="text-sm">Interest in sustainability and efficiency</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Typical Career Paths</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {careerPaths.map((career, index) => (
                <Badge key={index} variant="outline" className="px-4 py-2">
                  {career}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment Framework</h2>
            <p className="text-lg text-muted-foreground">
              Our scientifically-backed assessment evaluates multiple dimensions of career readiness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-background w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Career Potential?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take the first step towards a rewarding career in reverse logistics planning. 
            Get personalized insights, identify skill gaps, and receive tailored learning recommendations.
          </p>
          
          <Button
            size="lg"
            onClick={handleStartAssessment}
            disabled={isStarting}
            className="bg-gradient-to-r from-secondary to-warning hover:from-warning hover:to-secondary text-lg px-8 py-6 shadow-elegant transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {isStarting ? (
              <>
                <Clock className="mr-2 h-5 w-5 animate-spin" />
                Starting Assessment...
              </>
            ) : (
              <>
                Begin Your Assessment Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
