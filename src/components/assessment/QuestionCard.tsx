import { useState } from 'react';
import { Question, AssessmentAnswer } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  sectionId: string;
  onAnswer: (answer: AssessmentAnswer) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  currentAnswer?: AssessmentAnswer;
}

export function QuestionCard({ 
  question, 
  sectionId, 
  onAnswer, 
  onNext, 
  onPrevious, 
  canGoBack,
  currentAnswer 
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    currentAnswer?.answer?.toString() || ''
  );

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
    const answer: AssessmentAnswer = {
      questionId: question.id,
      answer: question.type === 'likert' ? parseInt(value) : value,
      section: sectionId
    };
    onAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      onNext();
    }
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-4">
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerChange}
              className="flex flex-col space-y-3"
            >
              {question.scale && Array.from({ length: question.scale.max - question.scale.min + 1 }, (_, i) => {
                const value = (question.scale!.min + i).toString();
                return (
                  <div key={value} className="flex items-center space-x-3">
                    <RadioGroupItem value={value} id={value} />
                    <Label 
                      htmlFor={value}
                      className="flex-1 text-sm cursor-pointer hover:text-primary transition-colors"
                    >
                      {i === 0 && question.scale!.minLabel}
                      {i === question.scale!.max - question.scale!.min && question.scale!.maxLabel}
                      {i > 0 && i < question.scale!.max - question.scale!.min && value}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
            {question.scale && (
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{question.scale.minLabel}</span>
                <span>{question.scale.maxLabel}</span>
              </div>
            )}
          </div>
        );

      case 'multiple-choice':
        return (
          <RadioGroup
            value={selectedAnswer}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 text-sm cursor-pointer hover:text-primary transition-colors"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'ranking':
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Drag to reorder from most appealing (top) to least appealing (bottom)
            </p>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`rank-${index}`} />
                  <Label
                    htmlFor={`rank-${index}`}
                    className="flex-1 text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderQuestionInput()}
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoBack}
            className="min-w-24"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={cn(
              "min-w-24",
              selectedAnswer ? "bg-gradient-to-r from-primary to-primary-dark" : ""
            )}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}