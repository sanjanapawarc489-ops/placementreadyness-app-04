import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const days = [
  { day: 'Mon', initial: 'M', active: true },
  { day: 'Tue', initial: 'T', active: true },
  { day: 'Wed', initial: 'W', active: true },
  { day: 'Thu', initial: 'T', active: false },
  { day: 'Fri', initial: 'F', active: true },
  { day: 'Sat', initial: 'S', active: false },
  { day: 'Sun', initial: 'S', active: false },
];

export function WeeklyGoals() {
  const solved = 12;
  const goal = 20;
  const progress = (solved / goal) * 100;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Weekly Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Problems Solved</span>
            <span className="font-medium">{solved}/{goal} this week</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between">
          {days.map((day) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  day.active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {day.initial}
              </div>
              <span className="text-xs text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
