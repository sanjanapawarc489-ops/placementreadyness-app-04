import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function CircularProgress({ value, max, size = 200, strokeWidth = 16 }: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // Clamp value between 0 and max
  const clampedValue = clamp(value, 0, max);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (animatedValue / max) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(clampedValue);
    }, 100);
    return () => clearTimeout(timer);
  }, [clampedValue]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(245 58% 51% / 0.2)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(245 58% 51%)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 1.5s ease-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-foreground">{clampedValue}</span>
        <span className="text-sm text-muted-foreground mt-1">/ {max}</span>
      </div>
    </div>
  );
}

export function OverallReadiness() {
  return (
    <Card className="h-full min-w-0">
      <CardHeader>
        <CardTitle>Overall Readiness</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <CircularProgress value={72} max={100} />
        <p className="text-lg font-medium text-muted-foreground mt-4">Readiness Score</p>
      </CardContent>
    </Card>
  );
}
