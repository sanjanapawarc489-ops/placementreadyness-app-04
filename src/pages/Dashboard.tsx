import { useNavigate } from 'react-router-dom';
import { OverallReadiness } from '@/components/OverallReadiness';
import { SkillBreakdown } from '@/components/SkillBreakdown';
import { ContinuePractice } from '@/components/ContinuePractice';
import { WeeklyGoals } from '@/components/WeeklyGoals';
import { UpcomingAssessments } from '@/components/UpcomingAssessments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, History } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 min-w-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/analyze')}>
            <Sparkles className="w-4 h-4 mr-2" />
            Analyze JD
          </Button>
          <Button variant="outline" onClick={() => navigate('/history')}>
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>
      </div>

      {/* Quick Actions Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Job Description Analyzer</CardTitle>
          <CardDescription>
            Paste any job description to get a personalized preparation plan, skill analysis, and readiness score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/analyze')} size="lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Analyzing
          </Button>
        </CardContent>
      </Card>
      
      {/* Top Row - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <OverallReadiness />
        <SkillBreakdown />
      </div>

      {/* Middle Row - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <ContinuePractice />
        <WeeklyGoals />
      </div>

      {/* Bottom Row - Full width */}
      <div className="grid grid-cols-1 gap-6 min-w-0">
        <UpcomingAssessments />
      </div>
    </div>
  );
}
