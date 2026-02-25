import { OverallReadiness } from '@/components/OverallReadiness';
import { SkillBreakdown } from '@/components/SkillBreakdown';
import { ContinuePractice } from '@/components/ContinuePractice';
import { WeeklyGoals } from '@/components/WeeklyGoals';
import { UpcomingAssessments } from '@/components/UpcomingAssessments';

export function Dashboard() {
  return (
    <div className="space-y-6 min-w-0">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
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
