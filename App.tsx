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
import { Smartphone, Monitor, Users, ArrowRight, X, Lock, User } from 'lucide-react';

interface AnalysisData {
  author: string;
  problemDefinition: string;
  rootCause: string;
  solution: string;
  prevention: string;
}

const ADMIN_PASSWORD = '6749467';

const App: React.FC = () => {
  const [mode, setMode] = useState<'landing' | 'learner' | 'admin'>('landing');
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [userReport, setUserReport] = useState<ReportSubmission | null>(null);
  const [allReports, setAllReports] = useState<ReportSubmission[]>([]);
  const [teamId, setTeamId] = useState<number>(1);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // Learner name input
  const [learnerName, setLearnerName] = useState<string>('');

  // Admin password modal
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);

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
      default: break;
    }
    window.scrollTo(0, 0);
  };

  const handleAnalysisComplete = (data: AnalysisData) => {
    // Pre-fill author with learner name if not already set
    if (!data.author && learnerName) {
      data.author = learnerName;
    }
    setAnalysisData(data);
    setStage(AppStage.REPORT);
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
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setStage(AppStage.INTRO);
    setUserReport(null);
    setAnalysisData(null);
  };

  const handleExitMode = () => {
    setMode('landing');
    setStage(AppStage.INTRO);
    setUserReport(null);
    setAnalysisData(null);
    setLearnerName('');
  };

  const startLearnerMode = () => {
    if (learnerName.trim()) {
      setMode('learner');
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setMode('admin');
      setShowAdminModal(false);
      setAdminPassword('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const openAdminModal = () => {
    setShowAdminModal(true);
    setAdminPassword('');
    setPasswordError(false);
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
              {/* Name Input */}
              <div className="bg-stone-100 p-4 border-2 border-black">
                <label className="block font-bold text-sm mb-2 flex items-center gap-2">
                  <User size={16} />
                  이름 입력
                </label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="w-full p-3 border-2 border-black font-bold focus:ring-2 focus:ring-brutal-blue outline-none"
                />
              </div>

              {/* Team Selection */}
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
                disabled={!learnerName.trim()}
                className={`w-full font-black text-lg py-4 border-2 border-black shadow-hard transition-all flex items-center justify-center gap-2 ${
                  learnerName.trim()
                    ? 'bg-brutal-blue text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                    : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                }`}
              >
                SIMULATION START <ArrowRight strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Admin Mode Card */}
          <button
            onClick={openAdminModal}
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

        {/* Admin Password Modal */}
        {showAdminModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowAdminModal(false)}
          >
            <div
              className="bg-white max-w-md w-full border-4 border-black shadow-hard-lg"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock size={20} />
                  <h3 className="text-lg font-black">관리자 인증</h3>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="hover:text-brutal-yellow transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <p className="text-sm text-stone-600 mb-4">
                  관리자 모드에 접속하려면 비밀번호를 입력하세요.
                </p>

                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAdminLogin();
                    }
                  }}
                  className={`w-full p-3 border-2 font-bold focus:ring-2 focus:ring-brutal-blue outline-none mb-4 ${
                    passwordError ? 'border-red-500 bg-red-50' : 'border-black'
                  }`}
                />

                {passwordError && (
                  <p className="text-red-500 text-sm font-bold mb-4">
                    비밀번호가 올바르지 않습니다.
                  </p>
                )}

                <button
                  onClick={handleAdminLogin}
                  className="w-full bg-black text-white font-black py-3 border-2 border-black shadow-hard hover:bg-brutal-blue hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        )}
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
        {stage === AppStage.ANALYSIS && <StageAnalysis onNext={handleAnalysisComplete} teamId={teamId} learnerName={learnerName} />}
        {stage === AppStage.REPORT && analysisData && (
          <StageReport
            analysisData={analysisData}
            teamId={teamId}
            onSubmit={handleReportSubmit}
          />
        )}
        {stage === AppStage.RESULT && <StageResult userReport={userReport} onRestart={handleRestart} />}
      </main>
    </div>
  );
};

export default App;
