import { Results } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, BookOpen, Briefcase } from 'lucide-react';

interface ResultsCardProps {
  results: Results;
}

export function ResultsCard({ results }: ResultsCardProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'strong-fit':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'explore-more':
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      case 'not-fit-yet':
        return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'strong-fit':
        return {
          title: 'Strong Fit - Ready to Begin!',
          description: 'You are well-positioned to enter this field. Start learning with reverse logistics software or KPI frameworks.',
          className: 'bg-success-light border-success'
        };
      case 'explore-more':
        return {
          title: 'Promising Potential - Explore More',
          description: 'You show curiosity and moderate ability. Try a foundational course in logistics and inventory flow.',
          className: 'bg-warning-light border-warning'
        };
      case 'not-fit-yet':
        return {
          title: 'Consider Alternative Paths',
          description: 'This domain may not be your natural fit. Explore supply chain visualization or customer logistics roles instead.',
          className: 'bg-destructive/10 border-destructive'
        };
    }
  };

  const recommendationInfo = getRecommendationText();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Overall Recommendation */}
      <Card className={`${recommendationInfo.className} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            {getRecommendationIcon()}
            {recommendationInfo.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{recommendationInfo.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Overall Confidence Score:</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {results.overallConfidence}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Core Assessment Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Psychological Fit</span>
                <span className="text-sm text-muted-foreground">{results.psychologicalFit}%</span>
              </div>
              <Progress value={results.psychologicalFit} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Technical Readiness</span>
                <span className="text-sm text-muted-foreground">{results.technicalReadiness}%</span>
              </div>
              <Progress value={results.technicalReadiness} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              WISCAR Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span>Will</span>
                <span className="font-medium">{results.wiscar.will}%</span>
              </div>
              <div className="flex justify-between">
                <span>Interest</span>
                <span className="font-medium">{results.wiscar.interest}%</span>
              </div>
              <div className="flex justify-between">
                <span>Skill</span>
                <span className="font-medium">{results.wiscar.skill}%</span>
              </div>
              <div className="flex justify-between">
                <span>Cognitive</span>
                <span className="font-medium">{results.wiscar.cognitive}%</span>
              </div>
              <div className="flex justify-between">
                <span>Ability</span>
                <span className="font-medium">{results.wiscar.ability}%</span>
              </div>
              <div className="flex justify-between">
                <span>Real-World</span>
                <span className="font-medium">{results.wiscar.realWorld}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Gaps & Learning Path */}
      {results.skillGaps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-warning" />
              Recommended Development Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-3 text-sm">Skill Gaps to Address:</h4>
                <div className="space-y-2">
                  {results.skillGaps.map((gap, index) => (
                    <Badge key={index} variant="outline" className="block w-fit">
                      {gap}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-sm">Suggested Learning Path:</h4>
                <div className="space-y-2">
                  {results.learningPath.map((course, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Career Matches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {results.careerMatches.map((career, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <h4 className="font-medium text-sm">{career}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}