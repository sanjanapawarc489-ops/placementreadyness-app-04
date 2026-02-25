import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History as HistoryIcon, 
  Trash2, 
  ExternalLink, 
  Building2, 
  Briefcase,
  Calendar,
  Target,
  Sparkles
} from 'lucide-react';
import type { AnalysisResult } from '@/lib/skillExtractor';
import { getHistory, deleteHistoryItem, clearHistory } from '@/lib/storage';

export function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getHistory();
    setHistory(data);
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    loadHistory();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      loadHistory();
    }
  };

  const handleViewResult = (id: string) => {
    navigate(`/results?id=${id}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <HistoryIcon className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-4">No History Yet</h2>
        <p className="text-muted-foreground mb-6">
          Analyze your first job description to see it here.
        </p>
        <Button onClick={() => navigate('/analyze')}>
          <Sparkles className="w-4 h-4 mr-2" />
          Analyze Job Description
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analysis History</h1>
          <p className="text-sm text-muted-foreground">
            {history.length} {history.length === 1 ? 'analysis' : 'analyses'} saved
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/analyze')}>
            <Sparkles className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
          <Button variant="outline" onClick={handleClearAll} className="text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((item) => {
          const totalSkills = Object.values(item.extractedSkills).flat().length;
          
          return (
            <Card 
              key={item.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewResult(item.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* Company & Role */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{item.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{item.role}</span>
                      </div>
                    </div>

                    {/* Date & Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <Badge variant="secondary">
                        {totalSkills} skills detected
                      </Badge>
                    </div>

                    {/* Skills Preview */}
                    <div className="flex flex-wrap gap-2">
                      {Object.values(item.extractedSkills)
                        .flat()
                        .slice(0, 6)
                        .map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      {totalSkills > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{totalSkills - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Score & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className={`px-4 py-2 rounded-lg ${getScoreColor(item.readinessScore)}`}>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span className="font-bold">{item.readinessScore}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewResult(item.id)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
