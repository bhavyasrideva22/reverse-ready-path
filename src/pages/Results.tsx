import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ResultsCard } from '@/components/assessment/ResultsCard';
import { Button } from '@/components/ui/button';
import { Results as ResultsType } from '@/types/assessment';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Results() {
  const { state, calculateResults, resetAssessment } = useAssessment();
  const navigate = useNavigate();
  const [results, setResults] = useState<ResultsType | null>(null);

  useEffect(() => {
    if (!state.isComplete || state.answers.length === 0) {
      navigate('/');
      return;
    }

    const calculatedResults = calculateResults();
    setResults(calculatedResults);
  }, [state, calculateResults, navigate]);

  const handleRetakeAssessment = () => {
    resetAssessment();
    navigate('/');
  };

  const handleShareResults = () => {
    const shareText = `I just completed the Reverse Logistics Planner Assessment! My overall confidence score is ${results?.overallConfidence}%. Check it out!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Reverse Logistics Planner Assessment Results',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "Results summary copied to clipboard!"
      });
    }
  };

  const handleDownloadResults = () => {
    if (!results) return;
    
    const resultsData = {
      timestamp: new Date().toISOString(),
      overallConfidence: results.overallConfidence,
      recommendation: results.recommendation,
      scores: {
        psychologicalFit: results.psychologicalFit,
        technicalReadiness: results.technicalReadiness,
        wiscar: results.wiscar
      },
      skillGaps: results.skillGaps,
      learningPath: results.learningPath,
      careerMatches: results.careerMatches
    };

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reverse-logistics-assessment-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Results downloaded",
      description: "Your assessment results have been saved as a JSON file."
    });
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Calculating your results...</h2>
          <p className="text-muted-foreground">Please wait while we analyze your responses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Comprehensive analysis of your readiness for a career in Reverse Logistics Planning
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={handleShareResults}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadResults}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button
              onClick={handleRetakeAssessment}
              className="bg-gradient-to-r from-primary to-primary-dark"
            >
              Retake Assessment
            </Button>
          </div>
        </div>

        {/* Results */}
        <ResultsCard results={results} />

        {/* Next Steps Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Based on your results, we recommend exploring the learning paths and career opportunities 
            that align with your strengths and interests in reverse logistics planning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg">
              Explore Courses
            </Button>
            <Button variant="outline" size="lg">
              Find Career Opportunities
            </Button>
            <Button variant="outline" size="lg">
              Connect with Mentors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}