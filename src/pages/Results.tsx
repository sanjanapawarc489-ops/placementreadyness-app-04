import { useEffect, useState, useCallback } from 'react';
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
  Cpu,
  Copy,
  Download,
  Check,
  AlertCircle,
  Play
} from 'lucide-react';
import type { AnalysisResult, ExtractedSkills, DayPlan, RoundChecklist, SkillConfidence } from '@/lib/skillExtractor';
import { calculateAdjustedScore } from '@/lib/skillExtractor';
import { getHistoryItem, updateSkillConfidence } from '@/lib/storage';

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
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

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

  const handleSkillToggle = useCallback((skill: string) => {
    if (!result) return;
    
    const currentConfidence = result.skillConfidenceMap[skill] || 'practice';
    const newConfidence: SkillConfidence = currentConfidence === 'know' ? 'practice' : 'know';
    
    const newConfidenceMap = {
      ...result.skillConfidenceMap,
      [skill]: newConfidence
    };
    
    const newAdjustedScore = calculateAdjustedScore(result.readinessScore, newConfidenceMap);
    
    const updatedResult = {
      ...result,
      skillConfidenceMap: newConfidenceMap,
      adjustedReadinessScore: newAdjustedScore
    };
    
    setResult(updatedResult);
    
    // Persist to localStorage
    updateSkillConfidence(result.id, skill, newConfidence, newAdjustedScore);
    
    // Update session storage if this is the current analysis
    const currentData = sessionStorage.getItem('current_analysis');
    if (currentData) {
      const current = JSON.parse(currentData);
      if (current.id === result.id) {
        sessionStorage.setItem('current_analysis', JSON.stringify(updatedResult));
      }
    }
  }, [result]);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generatePlanText = () => {
    if (!result) return '';
    return result.plan.map(day => 
      `Day ${day.day}: ${day.title}\n${day.tasks.map(t => `- ${t}`).join('\n')}`
    ).join('\n\n');
  };

  const generateChecklistText = () => {
    if (!result) return '';
    return result.checklist.map(round => 
      `Round ${round.round}: ${round.title}\n${round.items.map(i => `- ${i}`).join('\n')}`
    ).join('\n\n');
  };

  const generateQuestionsText = () => {
    if (!result) return '';
    return result.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
  };

  const generateFullText = () => {
    if (!result) return '';
    return `
Job Analysis for ${result.company} - ${result.role}
Generated: ${new Date(result.createdAt).toLocaleString()}

=== READINESS SCORE ===
Base Score: ${result.readinessScore}/100
Adjusted Score: ${result.adjustedReadinessScore}/100

=== SKILLS EXTRACTED ===
${Object.entries(result.extractedSkills).map(([cat, skills]: [string, string[]]) => 
  `${cat}: ${skills.map((s: string) => `${s} (${result.skillConfidenceMap[s] || 'practice'})`).join(', ')}`
).join('\n')}

=== 7-DAY PLAN ===
${generatePlanText()}

=== ROUND CHECKLIST ===
${generateChecklistText()}

=== INTERVIEW QUESTIONS ===
${generateQuestionsText()}
    `.trim();
  };

  const downloadAsTxt = () => {
    if (!result) return;
    const blob = new Blob([generateFullText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-analysis-${result.company}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

  const { company, role, extractedSkills, readinessScore, adjustedReadinessScore, skillConfidenceMap, plan, checklist, questions, createdAt } = result;
  const displayScore = adjustedReadinessScore ?? readinessScore;
  
  // Get weak skills (marked as practice)
  const weakSkills = Object.entries(skillConfidenceMap)
    .filter(([_, confidence]) => confidence === 'practice')
    .map(([skill]) => skill)
    .slice(0, 3);

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
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-primary">{displayScore}</p>
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
              {adjustedReadinessScore !== undefined && adjustedReadinessScore !== readinessScore && (
                <p className="text-xs text-muted-foreground">
                  Base: {readinessScore} 
                  {adjustedReadinessScore > readinessScore ? 
                    <span className="text-green-600"> (+{adjustedReadinessScore - readinessScore})</span> : 
                    <span className="text-red-600"> ({adjustedReadinessScore - readinessScore})</span>
                  }
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                {displayScore >= 80 ? 'Excellent! You are well prepared.' :
                 displayScore >= 60 ? 'Good progress. Keep practicing!' :
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
            Click on each skill to toggle your confidence level. "I know this" adds +2, "Need practice" subtracts -2.
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
                    {skills.map((skill) => {
                      const confidence = skillConfidenceMap[skill] || 'practice';
                      const isKnown = confidence === 'know';
                      
                      return (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                            isKnown 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' 
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300'
                          }`}
                        >
                          {isKnown ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {skill}
                          <span className="text-[10px] opacity-75">
                            {isKnown ? '(+2)' : '(-2)'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Plan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              7-Day Preparation Plan
            </CardTitle>
            <CardDescription>
              Personalized study plan based on detected skills
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => copyToClipboard(generatePlanText(), 'plan')}
          >
            {copiedSection === 'plan' ? (
              <><Check className="w-4 h-4 mr-2" /> Copied</>
            ) : (
              <><Copy className="w-4 h-4 mr-2" /> Copy Plan</>
            )}
          </Button>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Round-wise Preparation Checklist
            </CardTitle>
            <CardDescription>
              What to prepare for each interview round
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => copyToClipboard(generateChecklistText(), 'checklist')}
          >
            {copiedSection === 'checklist' ? (
              <><Check className="w-4 h-4 mr-2" /> Copied</>
            ) : (
              <><Copy className="w-4 h-4 mr-2" /> Copy Checklist</>
            )}
          </Button>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Likely Interview Questions
            </CardTitle>
            <CardDescription>
              Questions based on detected skills
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => copyToClipboard(generateQuestionsText(), 'questions')}
          >
            {copiedSection === 'questions' ? (
              <><Check className="w-4 h-4 mr-2" /> Copied</>
            ) : (
              <><Copy className="w-4 h-4 mr-2" /> Copy Questions</>
            )}
          </Button>
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

      {/* Action Next Box */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <Play className="w-5 h-5" />
            Action Next
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weakSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-amber-800 mb-2">Top skills to focus on:</p>
              <div className="flex flex-wrap gap-2">
                {weakSkills.map(skill => (
                  <Badge key={skill} variant="outline" className="bg-white text-amber-700 border-amber-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-amber-700">
                Start with Day 1 of your preparation plan. Focus on the weak areas identified above.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/practice')} 
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Start Day 1 Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export & Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => navigate('/analyze')} variant="outline" className="flex-1">
          Analyze Another JD
        </Button>
        <Button onClick={() => navigate('/history')} variant="outline" className="flex-1">
          View History
        </Button>
        <Button onClick={downloadAsTxt} variant="default" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download as TXT
        </Button>
      </div>
    </div>
  );
}
