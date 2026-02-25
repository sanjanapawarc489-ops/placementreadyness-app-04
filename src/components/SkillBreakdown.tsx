import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { subject: 'DSA', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Resume', A: 85, fullMark: 100 },
  { subject: 'Aptitude', A: 70, fullMark: 100 },
];

// Primary color: hsl(245, 58%, 51%)
const PRIMARY_COLOR = 'hsl(245, 58%, 51%)';

export function SkillBreakdown() {
  return (
    <Card className="h-full min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Skill Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="h-[280px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }} 
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#9ca3af', fontSize: 10 }} 
                tickCount={6}
                axisLine={false}
              />
              <Radar
                name="Skills"
                dataKey="A"
                stroke={PRIMARY_COLOR}
                fill={PRIMARY_COLOR}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Skill values row */}
        <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-gray-200">
          {data.map((item) => (
            <div key={item.subject} className="text-center">
              <p className="text-xs text-gray-500 mb-1">{item.subject}</p>
              <p className="text-lg font-bold" style={{ color: PRIMARY_COLOR }}>{item.A}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
