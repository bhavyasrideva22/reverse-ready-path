import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AssessmentState, AssessmentAnswer, Results } from '../types/assessment';
import { assessmentSections } from '../data/assessmentData';

interface AssessmentContextType {
  state: AssessmentState;
  addAnswer: (answer: AssessmentAnswer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAssessment: () => void;
  calculateResults: () => Results;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

type AssessmentAction =
  | { type: 'ADD_ANSWER'; answer: AssessmentAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  currentSection: 0,
  currentQuestion: 0,
  answers: [],
  isComplete: false,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'ADD_ANSWER':
      const existingIndex = state.answers.findIndex(a => a.questionId === action.answer.questionId);
      const newAnswers = existingIndex >= 0 
        ? state.answers.map((a, i) => i === existingIndex ? action.answer : a)
        : [...state.answers, action.answer];
      
      return { ...state, answers: newAnswers };

    case 'NEXT_QUESTION':
      const currentSection = assessmentSections[state.currentSection];
      const isLastQuestionInSection = state.currentQuestion >= currentSection.questions.length - 1;
      const isLastSection = state.currentSection >= assessmentSections.length - 1;

      if (isLastQuestionInSection && isLastSection) {
        return { ...state, isComplete: true };
      } else if (isLastQuestionInSection) {
        return {
          ...state,
          currentSection: state.currentSection + 1,
          currentQuestion: 0,
        };
      } else {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
        };
      }

    case 'PREVIOUS_QUESTION':
      const isFirstQuestionInSection = state.currentQuestion === 0;
      const isFirstSection = state.currentSection === 0;

      if (isFirstQuestionInSection && !isFirstSection) {
        const prevSection = assessmentSections[state.currentSection - 1];
        return {
          ...state,
          currentSection: state.currentSection - 1,
          currentQuestion: prevSection.questions.length - 1,
        };
      } else if (!isFirstQuestionInSection) {
        return {
          ...state,
          currentQuestion: state.currentQuestion - 1,
        };
      }
      return state;

    case 'COMPLETE_ASSESSMENT':
      return { ...state, isComplete: true };

    case 'RESET_ASSESSMENT':
      return initialState;

    default:
      return state;
  }
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const addAnswer = (answer: AssessmentAnswer) => {
    dispatch({ type: 'ADD_ANSWER', answer });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const completeAssessment = () => {
    dispatch({ type: 'COMPLETE_ASSESSMENT' });
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  const calculateResults = (): Results => {
    const answers = state.answers;
    
    // Calculate psychometric fit (interest + personality + cognitive + motivation)
    const psychometricAnswers = answers.filter(a => 
      a.questionId.includes('interest') || 
      a.questionId.includes('personality') || 
      a.questionId.includes('cognitive') || 
      a.questionId.includes('motivation')
    );
    const psychologicalFit = Math.round(
      (psychometricAnswers.reduce((sum, a) => sum + (Number(a.answer) || 0), 0) / 
      (psychometricAnswers.length * 5)) * 100
    );

    // Calculate technical readiness
    const technicalAnswers = answers.filter(a => 
      a.questionId.includes('aptitude') || 
      a.questionId.includes('knowledge') || 
      a.questionId.includes('scenario') || 
      a.questionId.includes('domain')
    );
    const correctTechnicalAnswers = technicalAnswers.filter(a => {
      // Simplified scoring - in real implementation, you'd check against correct answers
      return Number(a.answer) === 0 || a.answer === 'Return Merchandise Authorization';
    }).length;
    const technicalReadiness = Math.round((correctTechnicalAnswers / technicalAnswers.length) * 100);

    // Calculate WISCAR scores
    const willAnswers = answers.filter(a => a.questionId.includes('will'));
    const will = Math.round((willAnswers.reduce((sum, a) => sum + (Number(a.answer) || 0), 0) / (willAnswers.length * 5)) * 100);
    
    const interestWiscarAnswers = answers.filter(a => a.questionId === 'interest_3');
    const interest = 85; // Simplified calculation
    
    const skillAnswers = answers.filter(a => a.questionId.includes('skill'));
    const skill = Math.round((skillAnswers.reduce((sum, a) => sum + (Number(a.answer) || 0), 0) / (skillAnswers.length * 5)) * 100);
    
    const cognitiveWiscarAnswers = answers.filter(a => a.questionId === 'cognitive_2');
    const cognitive = 80; // Simplified calculation
    
    const abilityAnswers = answers.filter(a => a.questionId.includes('ability'));
    const ability = Math.round((abilityAnswers.reduce((sum, a) => sum + (Number(a.answer) || 0), 0) / (abilityAnswers.length * 5)) * 100);
    
    const realWorldAnswers = answers.filter(a => a.questionId.includes('real_world'));
    const realWorld = 75; // Simplified calculation

    const wiscar = { will, interest, skill, cognitive, ability, realWorld };

    // Calculate overall confidence score (weighted average)
    const overallConfidence = Math.round(
      (psychologicalFit * 0.3) + (technicalReadiness * 0.3) + 
      ((will + interest + skill + cognitive + ability + realWorld) / 6 * 0.4)
    );

    // Determine recommendation
    let recommendation: 'strong-fit' | 'explore-more' | 'not-fit-yet';
    if (overallConfidence >= 85) {
      recommendation = 'strong-fit';
    } else if (overallConfidence >= 70) {
      recommendation = 'explore-more';
    } else {
      recommendation = 'not-fit-yet';
    }

    // Generate skill gaps and learning paths based on scores
    const skillGaps: string[] = [];
    const learningPath: string[] = [];
    
    if (skill < 70) {
      skillGaps.push('Excel/Data Analysis Skills');
      learningPath.push('Excel for Logistics Analytics');
    }
    if (technicalReadiness < 70) {
      skillGaps.push('Reverse Logistics Knowledge');
      learningPath.push('Introduction to Reverse Logistics');
    }
    if (cognitive < 70) {
      skillGaps.push('Problem-solving Approach');
      learningPath.push('Analytical Thinking for Supply Chain');
    }

    const careerMatches = [
      'Reverse Logistics Planner',
      'Returns & Warranty Coordinator',
      'Sustainability Logistics Specialist'
    ];

    return {
      psychologicalFit,
      technicalReadiness,
      wiscar,
      overallConfidence,
      recommendation,
      skillGaps,
      learningPath,
      careerMatches
    };
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        addAnswer,
        nextQuestion,
        previousQuestion,
        completeAssessment,
        calculateResults,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}