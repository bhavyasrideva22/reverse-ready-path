export interface AssessmentAnswer {
  questionId: string;
  answer: number | string;
  section: string;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: AssessmentAnswer[];
  isComplete: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'ranking' | 'scenario';
  options?: string[];
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Results {
  psychologicalFit: number;
  technicalReadiness: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallConfidence: number;
  recommendation: 'strong-fit' | 'explore-more' | 'not-fit-yet';
  skillGaps: string[];
  learningPath: string[];
  careerMatches: string[];
}