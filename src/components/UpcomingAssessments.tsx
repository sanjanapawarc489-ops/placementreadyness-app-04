import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const assessments = [
  {
    name: 'DSA Mock Test',
    date: 'Tomorrow',
    time: '10:00 AM',
  },
  {
    name: 'System Design Review',
    date: 'Wed',
    time: '2:00 PM',
  },
  {
    name: 'HR Interview Prep',
    date: 'Friday',
    time: '11:00 AM',
  },
];

export function UpcomingAssessments() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upcoming Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment, index) => (
            <div
              key={assessment.name}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-card'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-primary/10' : 'bg-secondary'
                }`}>
                  <Calendar className={`w-5 h-5 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h4 className="font-semibold">{assessment.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    {assessment.date}, {assessment.time}
                  </div>
                </div>
              </div>
              {index === 0 && (
                <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                  Next
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
