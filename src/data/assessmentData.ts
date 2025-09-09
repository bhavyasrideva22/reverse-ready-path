import { AssessmentSection } from '../types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Psychometric Evaluation',
    description: 'Understanding your personality traits and work preferences',
    questions: [
      {
        id: 'interest_1',
        text: 'I enjoy solving logistical issues related to product returns',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      },
      {
        id: 'interest_2',
        text: 'I find sustainability and circular economy concepts fascinating',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      },
      {
        id: 'personality_1',
        text: 'I prefer structured, systematic approaches to problem-solving',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      },
      {
        id: 'personality_2',
        text: 'I pay close attention to details and rarely make careless mistakes',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      },
      {
        id: 'cognitive_1',
        text: 'Which approach do you prefer when handling complex processes?',
        type: 'multiple-choice',
        options: [
          'Breaking them into systematic, repeatable steps',
          'Finding creative, innovative solutions each time',
          'Following established best practices',
          'Adapting based on each unique situation'
        ]
      },
      {
        id: 'motivation_1',
        text: 'I am motivated by creating efficient, sustainable systems',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Aptitude Assessment',
    description: 'Evaluating your technical knowledge and problem-solving abilities',
    questions: [
      {
        id: 'aptitude_1',
        text: 'If 15% of products are returned monthly and you process 1000 units, how many returns do you handle?',
        type: 'multiple-choice',
        options: ['150', '85', '250', '100']
      },
      {
        id: 'knowledge_1',
        text: 'What does RMA stand for in logistics?',
        type: 'multiple-choice',
        options: [
          'Return Merchandise Authorization',
          'Retail Management Application',
          'Resource Management Analysis',
          'Reverse Material Assessment'
        ]
      },
      {
        id: 'knowledge_2',
        text: 'Which is NOT typically part of reverse logistics?',
        type: 'multiple-choice',
        options: [
          'Product returns processing',
          'Initial product manufacturing',
          'Warranty repairs',
          'Product recycling'
        ]
      },
      {
        id: 'scenario_1',
        text: 'A customer wants to return a damaged electronic item. What should be your first step?',
        type: 'multiple-choice',
        options: [
          'Issue an immediate refund',
          'Check warranty status and return policy',
          'Send it directly to recycling',
          'Refuse the return due to damage'
        ]
      },
      {
        id: 'domain_1',
        text: 'What is the primary goal of reverse logistics?',
        type: 'multiple-choice',
        options: [
          'To maximize recovery value from returned products',
          'To prevent all product returns',
          'To increase shipping costs',
          'To reduce customer satisfaction'
        ]
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive readiness assessment across multiple dimensions',
    questions: [
      {
        id: 'will_1',
        text: 'I am willing to persist through challenging logistics problems even when solutions aren\'t immediately obvious',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      },
      {
        id: 'will_2',
        text: 'I would pursue additional training in logistics software if it meant career advancement',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      },
      {
        id: 'interest_3',
        text: 'Rank these work activities from most to least appealing:',
        type: 'ranking',
        options: [
          'Analyzing return patterns and trends',
          'Coordinating with multiple departments',
          'Developing process improvements',
          'Managing inventory tracking systems'
        ]
      },
      {
        id: 'skill_1',
        text: 'Rate your current proficiency with Excel/spreadsheet analysis',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Beginner', maxLabel: 'Expert' }
      },
      {
        id: 'skill_2',
        text: 'Rate your experience with warehouse management systems',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'No Experience', maxLabel: 'Highly Experienced' }
      },
      {
        id: 'cognitive_2',
        text: 'A return rate suddenly spikes 30%. How would you investigate?',
        type: 'multiple-choice',
        options: [
          'Analyze data by product, date, and return reason',
          'Immediately contact all customers',
          'Reduce return policy flexibility',
          'Ignore it until next month'
        ]
      },
      {
        id: 'ability_1',
        text: 'I actively seek out new learning opportunities in my field',
        type: 'likert',
        scale: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      },
      {
        id: 'real_world_1',
        text: 'Which daily work environment appeals to you most?',
        type: 'multiple-choice',
        options: [
          'Desk work with data analysis and system coordination',
          'Field work visiting warehouses and distribution centers',
          'Meeting-heavy collaborative environment',
          'Independent work with minimal supervision'
        ]
      }
    ]
  }
];