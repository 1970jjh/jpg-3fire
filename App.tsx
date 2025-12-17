import React, { useState, useEffect } from 'react';
import { AppStage, ReportSubmission } from './types';
import Header from './components/Header';
import StageIntro from './components/StageIntro';
import StageScenario from './components/StageScenario';
import StageResearch from './components/StageResearch';
import StageAnalysis from './components/StageAnalysis';
import StageReport from './components/StageReport';
import StageResult from './components/StageResult';
import AdminDashboard from './components/AdminDashboard';
import { Smartphone, Monitor, Users, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<'landing' | 'learner' | 'admin'>('landing');
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [userReport, setUserReport] = useState<ReportSubmission | null>(null);
  const [allReports, setAllReports] = useState<ReportSubmission[]>([]); // Store all submissions for Admin
  const [teamId, setTeamId] = useState<number>(1);
  
  // Initialize with localStorage or default to 6
  const [totalTeams, setTotalTeams] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('totalTeams');
      return saved ? parseInt(saved, 10) : 6;
    }
    return 6;
  });

  // Save to localStorage whenever totalTeams changes
  useEffect(() => {
    localStorage.setItem('totalTeams', totalTeams.toString());
  }, [totalTeams]);

  const handleNext = () => {
    switch (stage) {
      case AppStage.INTRO: setStage(AppStage.SCENARIO); break;
      case AppStage.SCENARIO: setStage(AppStage.RESEARCH); break;
      case AppStage.RESEARCH: setStage(AppStage.ANALYSIS); break;
      case AppStage.ANALYSIS: setStage(AppStage.REPORT); break;
      case AppStage.REPORT: setStage(AppStage.RESULT); break; 
      default: break;
    }
    window.scrollTo(0, 0);
  };

  const handleReportSubmit = (data: Omit<ReportSubmission, 'id' | 'timestamp' | 'teamId'>) => {
    const newReport: ReportSubmission = {
      ...data,
      id: Date.now(),
      teamId: teamId,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setUserReport(newReport);
    setAllReports(prev => [newReport, ...prev]);
    setStage(AppStage.RESULT);
  };

  const handleRestart = () => {
    setStage(AppStage.INTRO);
    setUserReport(null);
  };

  const handleExitMode = () => {
    setMode('landing');
    setStage(AppStage.INTRO);
    setUserReport(null);
  };

  const startLearnerMode = () => {
    setMode('learner');
  };

  if (mode === 'landing') {
    return (
      <div className="min-h-screen bg-brutal-yellow flex flex-col items-center justify-center p-6 text-black relative overflow-hidden pattern-dots">
        {/* Brutalist Title Section */}
        <div className="bg-white border-4 border-black p-6 md:p-10 shadow-hard-lg mb-12 max-w-2xl w-full text-center relative z-10">
          <div className="inline-block bg-black text-white px-4 py-1 font-mono font-bold text-sm mb-4">
            PROBLEM BASED LEARNING
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter leading-none">
            PBL<br/>
            <span className="text-brutal-blue">3rd Factory</span><br/>
            SIM
          </h1>
          <p className="font-bold text-lg md:text-xl mt-6 border-t-2 border-black pt-4">
            제3공장 화재사고 문제해결 시뮬레이션
          </p>
        </div>
        
        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl relative z-10">
          {/* Learner Mode Card */}
          <div className="bg-white border-4 border-black shadow-hard p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-3">
              <Smartphone size={32} className="text-black" />
              <h3 className="text-2xl font-black">학습자 모드</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-stone-100 p-4 border-2 border-black">
                <label className="block font-bold text-sm mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2"><Users size={16}/> 팀 선택</span>
                  <span className="text-xs bg-black text-white px-2 py-0.5">총 {totalTeams}개조</span>
                </label>
                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto pr-1">
                  {Array.from({ length: totalTeams }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setTeamId(num)}
                      className={`font-mono font-bold py-2 border-2 border-black transition-all ${
                        teamId === num 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={startLearnerMode}
                className="w-full bg-brutal-blue text-white font-black text-lg py-4 border-2 border-black shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                SIMULATION START <ArrowRight strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Admin Mode Card */}
          <button 
            onClick={() => setMode('admin')}
            className="bg-black text-white border-4 border-white shadow-hard p-6 flex flex-col items-center justify-center gap-4 group hover:bg-stone-900 transition-colors"
          >
             <Monitor size={48} className="text-brutal-yellow group-hover:rotate-12 transition-transform" />
             <div className="text-center">
              <h3 className="text-2xl font-black mb-1">관리자 모드</h3>
              <p className="text-stone-400 font-mono text-sm">DASHBOARD & ANALYTICS</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 font-mono text-xs font-bold opacity-50">
          SYSTEM VER 2.0 // BRUTAL_PBL_EDITION
        </div>
      </div>
    );
  }

  if (mode === 'admin') {
    return (
      <AdminDashboard 
        onExit={handleExitMode} 
        totalTeams={totalTeams}
        setTotalTeams={setTotalTeams}
        allReports={allReports}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-black pb-24 md:pb-0">
      <Header currentStage={stage} onExit={handleExitMode} />
      
      <main className="w-full max-w-7xl mx-auto md:px-6 md:py-8">
        {stage === AppStage.INTRO && <StageIntro onNext={handleNext} />}
        {stage === AppStage.SCENARIO && <StageScenario onNext={handleNext} />}
        {stage === AppStage.RESEARCH && <StageResearch onNext={handleNext} teamId={teamId} totalTeams={totalTeams} />}
        {stage === AppStage.ANALYSIS && <StageAnalysis onNext={handleNext} />}
        {stage === AppStage.REPORT && <StageReport onNext={handleReportSubmit} />}
        {stage === AppStage.RESULT && <StageResult userReport={userReport} onRestart={handleRestart} />}
      </main>
    </div>
  );
};

export default App;