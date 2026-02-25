import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  HelpCircle, 
  Target,
  Code2,
  Globe,
  Database,
  Cloud,
  TestTube2,
  Cpu
} from 'lucide-react';
import type { AnalysisResult, ExtractedSkills, DayPlan, RoundChecklist } from '@/lib/skillExtractor';
import { getHistoryItem } from '@/lib/storage';

const CATEGORY_ICONS = {
  coreCS: Cpu,
  languages: Code2,
  web: Globe,
  data: Database,
  cloudDevOps: Cloud,
  testing: TestTube2,
};

const CATEGORY_LABELS: Record<keyof ExtractedSkills, string> = {
  coreCS: 'Core CS',
  languages: 'Languages',
  web: 'Web',
  data: 'Data',
  cloudDevOps: 'Cloud/DevOps',
  testing: 'Testing',
};

export function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResult = () => {
      const historyId = searchParams.get('id');
      
      if (historyId) {
        // Load from history
        const historyItem = getHistoryItem(historyId);
        if (historyItem) {
          setResult(historyItem);
        }
      } else {
        // Load from session storage (latest analysis)
        const currentData = sessionStorage.getItem('current_analysis');
        if (currentData) {
          setResult(JSON.parse(currentData));
        }
      }
      setLoading(false);
    };

    loadResult();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Analysis Found</h2>
        <p className="text-muted-foreground mb-6">
          Please analyze a job description first to see results.
        </p>
        <Button onClick={() => navigate('/analyze')}>
          Analyze Job Description
        </Button>
      </div>
    );
  }

  const { company, role, extractedSkills, readinessScore, plan, checklist, questions, createdAt } = result;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Analysis Results</h1>
          <p className="text-sm text-muted-foreground">
            {company} • {role} • {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Readiness Score */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Readiness Score</p>
              <p className="text-4xl font-bold text-primary">{readinessScore}/100</p>
              <p className="text-sm text-muted-foreground mt-1">
                {readinessScore >= 80 ? 'Excellent! You are well prepared.' :
                 readinessScore >= 60 ? 'Good progress. Keep practicing!' :
                 'Needs improvement. Follow the plan below.'}
              </p>
            </div>
            <div className="w-24 h-24 rounded-full border-8 border-primary/20 border-t-primary flex items-center justify-center">
              <Target className="w-10 h-10 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extracted Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Key Skills Extracted
          </CardTitle>
          <CardDescription>
            Skills detected from the job description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(extractedSkills) as Array<keyof ExtractedSkills>).map((category) => {
              const skills = extractedSkills[category];
              const Icon = CATEGORY_ICONS[category];
              
              if (skills.length === 0) return null;
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Icon className="w-4 h-4" />
                    {CATEGORY_LABELS[category]}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            7-Day Preparation Plan
          </CardTitle>
          <CardDescription>
            Personalized study plan based on detected skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plan.map((day: DayPlan) => (
              <div key={day.day} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">{day.day}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{day.title}</h4>
                  <ul className="space-y-1">
                    {day.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Round-wise Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Round-wise Preparation Checklist
          </CardTitle>
          <CardDescription>
            What to prepare for each interview round
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklist.map((round: RoundChecklist) => (
              <div key={round.round} className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">R{round.round}</span>
                  </div>
                  <h4 className="font-semibold">{round.title}</h4>
                </div>
                <ul className="space-y-2">
                  {round.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Likely Interview Questions
          </CardTitle>
          <CardDescription>
            Questions based on detected skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions.map((question, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {idx + 1}
                </span>
                <p className="text-sm">{question}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => navigate('/analyze')} variant="outline" className="flex-1">
          Analyze Another JD
        </Button>
        <Button onClick={() => navigate('/history')} className="flex-1">
          View History
        </Button>
      </div>
    </div>
  );
}
