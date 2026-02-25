import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Building2, FileText, Sparkles } from 'lucide-react';
import { extractSkills, generateChecklist, generatePlan, generateQuestions, calculateReadinessScore, createDefaultConfidenceMap } from '@/lib/skillExtractor';
import { saveToHistory } from '@/lib/storage';

export function JDInput() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!jdText.trim()) return;

    setIsAnalyzing(true);

    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const extractedSkills = extractSkills(jdText);
    const skillConfidenceMap = createDefaultConfidenceMap(extractedSkills);
    const plan = generatePlan(extractedSkills);
    const checklist = generateChecklist(extractedSkills);
    const questions = generateQuestions(extractedSkills);
    const readinessScore = calculateReadinessScore(extractedSkills, company, role, jdText);

    const result = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      company: company || 'Unknown Company',
      role: role || 'Unknown Role',
      jdText,
      extractedSkills,
      skillConfidenceMap,
      adjustedReadinessScore: readinessScore,
      plan,
      checklist,
      questions,
      readinessScore,
    };

    saveToHistory(result);
    
    // Store current result in session storage for results page
    sessionStorage.setItem('current_analysis', JSON.stringify(result));
    
    setIsAnalyzing(false);
    navigate('/results');
  };

  const isValid = jdText.trim().length > 50;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Job Description Analyzer</h1>
        <p className="text-muted-foreground">
          Paste a job description to get personalized preparation plan and readiness score
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Analyze Job Description
          </CardTitle>
          <CardDescription>
            Fill in the details below and paste the job description to generate your analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company and Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Company Name
              </label>
              <Input
                placeholder="e.g., Google, Microsoft, Amazon"
                value={company}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                Role / Position
              </label>
              <Input
                placeholder="e.g., Software Engineer, Full Stack Developer"
                value={role}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
              />
            </div>
          </div>

          {/* JD Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Job Description
            </label>
            <Textarea
              placeholder="Paste the complete job description here...&#10;&#10;Include details about:&#10;- Required skills and technologies&#10;- Experience level&#10;- Responsibilities&#10;- Qualifications"
              value={jdText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJdText(e.target.value)}
              className="min-h-[300px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {jdText.length} characters • Minimum 50 characters required
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!isValid || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze & Generate Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tips for best results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Include the complete job description for accurate skill extraction</li>
            <li>Mention specific technologies (React, Python, AWS, etc.)</li>
            <li>Longer descriptions (&gt;800 chars) give better readiness scores</li>
            <li>Your analysis will be saved to History for future reference</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
