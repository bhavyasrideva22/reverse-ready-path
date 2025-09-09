import { useAssessment } from '@/contexts/AssessmentContext';
import { assessmentSections } from '@/data/assessmentData';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Assessment() {
  const { state, addAnswer, nextQuestion, previousQuestion, completeAssessment } = useAssessment();
  const navigate = useNavigate();

  const currentSection = assessmentSections[state.currentSection];
  const currentQuestion = currentSection?.questions[state.currentQuestion];
  
  const totalQuestions = assessmentSections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = state.answers.length;
  
  const canGoBack = state.currentSection > 0 || state.currentQuestion > 0;

  const currentAnswer = state.answers.find(a => a.questionId === currentQuestion?.id);

  useEffect(() => {
    if (state.isComplete) {
      navigate('/results');
    }
  }, [state.isComplete, navigate]);

  const handleAnswer = (answer: any) => {
    addAnswer(answer);
  };

  const handleNext = () => {
    const isLastQuestion = state.currentSection === assessmentSections.length - 1 && 
                          state.currentQuestion === currentSection.questions.length - 1;
    
    if (isLastQuestion) {
      completeAssessment();
    } else {
      nextQuestion();
    }
  };

  if (!currentSection || !currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Assessment...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Reverse Logistics Planner Assessment
          </h1>
          <Badge variant="secondary" className="mb-4">
            {currentSection.title}
          </Badge>
          <p className="text-muted-foreground mb-6">
            {currentSection.description}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar 
            value={answeredQuestions} 
            max={totalQuestions} 
            showPercentage 
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Question {answeredQuestions + 1} of {totalQuestions}</span>
            <span>Section {state.currentSection + 1} of {assessmentSections.length}</span>
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          sectionId={currentSection.id}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={previousQuestion}
          canGoBack={canGoBack}
          currentAnswer={currentAnswer}
        />

        {/* Section Progress */}
        <Card className="mt-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Assessment Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessmentSections.map((section, index) => {
                const isCompleted = index < state.currentSection;
                const isCurrent = index === state.currentSection;
                const questionsInSection = section.questions.length;
                const answeredInSection = state.answers.filter(a => a.section === section.id).length;
                
                return (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      isCurrent ? 'bg-primary-light border-primary' : 
                      isCompleted ? 'bg-success-light border-success' : 'bg-muted'
                    }`}
                  >
                    <div>
                      <h4 className="font-medium text-sm">{section.title}</h4>
                      <p className="text-xs text-muted-foreground">{section.description}</p>
                    </div>
                    <Badge variant={isCompleted ? 'default' : isCurrent ? 'secondary' : 'outline'}>
                      {isCompleted ? 'Complete' : `${answeredInSection}/${questionsInSection}`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}