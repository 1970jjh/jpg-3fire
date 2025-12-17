import React, { useState, useEffect } from 'react';
import { AppStage, ReportSubmission, Project } from './types';
import Header from './components/Header';
import StageIntro from './components/StageIntro';
import StageScenario from './components/StageScenario';
import StageResearch from './components/StageResearch';
import StageAnalysis from './components/StageAnalysis';
import StageReport from './components/StageReport';
import StageResult from './components/StageResult';
import AdminDashboard from './components/AdminDashboard';
import { Smartphone, Monitor, Users, ArrowRight, X, Lock, User, Plus, Folder, Trash2, Edit3, ChevronLeft } from 'lucide-react';

interface AnalysisData {
  author: string;
  problemDefinition: string;
  rootCause: string;
  solution: string;
  prevention: string;
}

const ADMIN_PASSWORD = '6749467';

const App: React.FC = () => {
  const [mode, setMode] = useState<'landing' | 'learner-select' | 'learner-join' | 'learner' | 'admin'>('landing');
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [userReport, setUserReport] = useState<ReportSubmission | null>(null);
  const [teamId, setTeamId] = useState<number>(1);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [learnerName, setLearnerName] = useState<string>('');

  // Project management
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('projects');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [{
      id: 'default',
      name: '제3공장 화재사고',
      description: '제3공장 화재사고 문제해결 시뮬레이션',
      totalTeams: 6,
      createdAt: new Date().toISOString(),
      reports: []
    }];
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Admin modal states
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // Project edit modal
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', totalTeams: 6 });

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

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

    // Add report to project
    if (selectedProject) {
      setProjects(prev => prev.map(p =>
        p.id === selectedProject.id
          ? { ...p, reports: [newReport, ...p.reports] }
          : p
      ));
      setSelectedProject(prev => prev ? { ...prev, reports: [newReport, ...prev.reports] } : null);
    }

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
    setSelectedProject(null);
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

  // Project management functions
  const openCreateProjectModal = () => {
    setEditingProject(null);
    setProjectForm({ name: '', description: '', totalTeams: 6 });
    setShowProjectModal(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      totalTeams: project.totalTeams
    });
    setShowProjectModal(true);
  };

  const saveProject = () => {
    if (!projectForm.name.trim()) return;

    if (editingProject) {
      setProjects(prev => prev.map(p =>
        p.id === editingProject.id
          ? { ...p, name: projectForm.name, description: projectForm.description, totalTeams: projectForm.totalTeams }
          : p
      ));
      if (selectedProject?.id === editingProject.id) {
        setSelectedProject(prev => prev ? { ...prev, name: projectForm.name, description: projectForm.description, totalTeams: projectForm.totalTeams } : null);
      }
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectForm.name,
        description: projectForm.description,
        totalTeams: projectForm.totalTeams,
        createdAt: new Date().toISOString(),
        reports: []
      };
      setProjects(prev => [...prev, newProject]);
    }
    setShowProjectModal(false);
  };

  const deleteProject = (projectId: string) => {
    if (projects.length <= 1) {
      alert('최소 1개의 프로젝트가 필요합니다.');
      return;
    }
    if (confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }
    }
  };

  const selectProjectForLearner = (project: Project) => {
    setSelectedProject(project);
    setTeamId(1);
    setMode('learner-join');
  };

  const startLearnerMode = () => {
    if (learnerName.trim() && selectedProject) {
      setMode('learner');
    }
  };

  // Landing Page
  if (mode === 'landing') {
    return (
      <div className="min-h-screen bg-brutal-yellow flex flex-col items-center justify-center p-6 text-black relative overflow-hidden pattern-dots">
        <div className="bg-white border-4 border-black p-6 md:p-10 shadow-hard-lg mb-12 max-w-2xl w-full text-center relative z-10">
          <div className="inline-block bg-black text-white px-4 py-1 font-mono font-bold text-sm mb-4">
            PROBLEM BASED LEARNING
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter leading-none">
            PBL<br/>
            <span className="text-brutal-blue">SIM</span>
          </h1>
          <p className="font-bold text-lg md:text-xl mt-6 border-t-2 border-black pt-4">
            문제해결 시뮬레이션 플랫폼
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl relative z-10">
          <button
            onClick={() => setMode('learner-select')}
            className="bg-white border-4 border-black shadow-hard p-6 flex flex-col items-center justify-center gap-4 group hover:bg-stone-50 transition-colors"
          >
            <Smartphone size={48} className="text-brutal-blue group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <h3 className="text-2xl font-black mb-1">학습자 모드</h3>
              <p className="text-stone-500 font-mono text-sm">SIMULATION ACCESS</p>
            </div>
          </button>

          <button
            onClick={openAdminModal}
            className="bg-black text-white border-4 border-white shadow-hard p-6 flex flex-col items-center justify-center gap-4 group hover:bg-stone-900 transition-colors"
          >
            <Monitor size={48} className="text-brutal-yellow group-hover:rotate-12 transition-transform" />
            <div className="text-center">
              <h3 className="text-2xl font-black mb-1">관리자 모드</h3>
              <p className="text-stone-400 font-mono text-sm">DASHBOARD & MANAGEMENT</p>
            </div>
          </button>
        </div>

        <div className="absolute bottom-4 font-mono text-xs font-bold opacity-50">
          SYSTEM VER 3.0 // MULTI_PROJECT_EDITION
        </div>

        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowAdminModal(false)}>
            <div className="bg-white max-w-md w-full border-4 border-black shadow-hard-lg" onClick={e => e.stopPropagation()}>
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock size={20} />
                  <h3 className="text-lg font-black">관리자 인증</h3>
                </div>
                <button onClick={() => setShowAdminModal(false)} className="hover:text-brutal-yellow transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-stone-600 mb-4">관리자 모드에 접속하려면 비밀번호를 입력하세요.</p>
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={adminPassword}
                  onChange={(e) => { setAdminPassword(e.target.value); setPasswordError(false); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAdminLogin(); }}
                  className={`w-full p-3 border-2 font-bold focus:ring-2 focus:ring-brutal-blue outline-none mb-4 ${passwordError ? 'border-red-500 bg-red-50' : 'border-black'}`}
                />
                {passwordError && <p className="text-red-500 text-sm font-bold mb-4">비밀번호가 올바르지 않습니다.</p>}
                <button onClick={handleAdminLogin} className="w-full bg-black text-white font-black py-3 border-2 border-black shadow-hard hover:bg-brutal-blue hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  로그인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Learner: Project Selection
  if (mode === 'learner-select') {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6 text-black">
        <div className="w-full max-w-4xl">
          <button onClick={() => setMode('landing')} className="flex items-center gap-2 mb-6 font-bold text-stone-600 hover:text-black transition-colors">
            <ChevronLeft size={20} /> 뒤로가기
          </button>

          <div className="bg-white border-4 border-black p-6 shadow-hard-lg mb-8">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Folder size={28} />
              프로젝트 선택
            </h2>
            <p className="text-stone-500 mt-2">참여할 시뮬레이션 프로젝트를 선택하세요.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => selectProjectForLearner(project)}
                className="bg-white border-2 border-black p-6 shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-left group"
              >
                <h3 className="text-xl font-black mb-2 group-hover:text-brutal-blue">{project.name}</h3>
                <p className="text-stone-600 text-sm mb-4">{project.description}</p>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="bg-stone-100 px-2 py-1 border border-black">{project.totalTeams}개 팀</span>
                  <span className="text-stone-400">{project.reports.length}개 보고서</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Learner: Join (Team & Name)
  if (mode === 'learner-join' && selectedProject) {
    return (
      <div className="min-h-screen bg-brutal-yellow flex flex-col items-center justify-center p-6 text-black">
        <div className="w-full max-w-lg">
          <button onClick={() => setMode('learner-select')} className="flex items-center gap-2 mb-6 font-bold text-stone-700 hover:text-black transition-colors">
            <ChevronLeft size={20} /> 프로젝트 선택
          </button>

          <div className="bg-white border-4 border-black shadow-hard-lg">
            <div className="bg-black text-white p-4">
              <h2 className="text-xl font-black">{selectedProject.name}</h2>
              <p className="text-stone-400 text-sm">{selectedProject.description}</p>
            </div>

            <div className="p-6 space-y-4">
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

              <div className="bg-stone-100 p-4 border-2 border-black">
                <label className="block font-bold text-sm mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2"><Users size={16}/> 팀 선택</span>
                  <span className="text-xs bg-black text-white px-2 py-0.5">총 {selectedProject.totalTeams}개조</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: selectedProject.totalTeams }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setTeamId(num)}
                      className={`font-mono font-bold py-2 border-2 border-black transition-all ${
                        teamId === num ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
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
                시뮬레이션 시작 <ArrowRight strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Mode
  if (mode === 'admin') {
    return (
      <div className="min-h-screen bg-stone-100 flex font-sans text-black">
        <aside className="w-64 bg-black text-white flex-col hidden md:flex shadow-xl fixed h-full z-10">
          <div className="p-6 border-b border-stone-800">
            <h1 className="text-xl font-black text-white flex items-center gap-2 italic">
              <span>PBL</span><span className="text-brutal-blue">SIM</span>
            </h1>
            <p className="text-xs text-stone-400 mt-1 font-mono">ADMIN CONSOLE V3</p>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-stone-500 uppercase">프로젝트</span>
              <button onClick={openCreateProjectModal} className="text-brutal-yellow hover:text-white transition-colors">
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {projects.map(project => (
                <div
                  key={project.id}
                  className={`p-3 border-2 transition-colors cursor-pointer ${
                    selectedProject?.id === project.id
                      ? 'bg-brutal-blue text-white border-white/20'
                      : 'text-stone-400 border-transparent hover:bg-stone-900'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm truncate flex-1">{project.name}</span>
                    <div className="flex gap-1 ml-2">
                      <button onClick={(e) => { e.stopPropagation(); openEditProjectModal(project); }} className="p-1 hover:text-brutal-yellow">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="p-1 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <span className="text-xs opacity-60">{project.reports.length}개 보고서</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-stone-800">
            <button onClick={handleExitMode} className="w-full text-stone-400 p-3 flex items-center gap-3 cursor-pointer hover:text-white hover:bg-red-900/50 transition-colors font-bold">
              <ChevronLeft size={20} />
              <span>나가기</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 md:ml-64">
          {selectedProject ? (
            <AdminDashboard
              onExit={handleExitMode}
              totalTeams={selectedProject.totalTeams}
              setTotalTeams={(count) => {
                setProjects(prev => prev.map(p =>
                  p.id === selectedProject.id ? { ...p, totalTeams: count } : p
                ));
                setSelectedProject(prev => prev ? { ...prev, totalTeams: count } : null);
              }}
              allReports={selectedProject.reports}
              projectName={selectedProject.name}
            />
          ) : (
            <div className="flex items-center justify-center h-screen text-stone-400">
              <div className="text-center">
                <Folder size={64} className="mx-auto mb-4 opacity-50" />
                <p className="font-bold">프로젝트를 선택하세요</p>
              </div>
            </div>
          )}
        </main>

        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowProjectModal(false)}>
            <div className="bg-white max-w-md w-full border-4 border-black shadow-hard-lg" onClick={e => e.stopPropagation()}>
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <h3 className="text-lg font-black">{editingProject ? '프로젝트 수정' : '새 프로젝트'}</h3>
                <button onClick={() => setShowProjectModal(false)} className="hover:text-brutal-yellow"><X size={24} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block font-bold text-sm mb-2">프로젝트 이름</label>
                  <input
                    type="text"
                    placeholder="프로젝트 이름"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full p-3 border-2 border-black font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm mb-2">설명</label>
                  <textarea
                    placeholder="프로젝트 설명"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full p-3 border-2 border-black font-medium min-h-[80px] resize-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm mb-2">팀 개수</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={projectForm.totalTeams}
                    onChange={(e) => setProjectForm({ ...projectForm, totalTeams: Math.min(10, Math.max(1, parseInt(e.target.value) || 1)) })}
                    className="w-full p-3 border-2 border-black font-bold"
                  />
                </div>
                <button
                  onClick={saveProject}
                  disabled={!projectForm.name.trim()}
                  className="w-full bg-black text-white font-black py-3 border-2 border-black shadow-hard hover:bg-brutal-blue hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {editingProject ? '수정 완료' : '생성'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Learner Simulation Mode
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-black pb-24 md:pb-0">
      <Header currentStage={stage} onExit={handleExitMode} />

      <main className="w-full max-w-7xl mx-auto md:px-6 md:py-8">
        {stage === AppStage.INTRO && <StageIntro onNext={handleNext} />}
        {stage === AppStage.SCENARIO && <StageScenario onNext={handleNext} />}
        {stage === AppStage.RESEARCH && selectedProject && (
          <StageResearch onNext={handleNext} teamId={teamId} totalTeams={selectedProject.totalTeams} />
        )}
        {stage === AppStage.ANALYSIS && (
          <StageAnalysis onNext={handleAnalysisComplete} teamId={teamId} learnerName={learnerName} />
        )}
        {stage === AppStage.REPORT && analysisData && (
          <StageReport analysisData={analysisData} teamId={teamId} onSubmit={handleReportSubmit} />
        )}
        {stage === AppStage.RESULT && <StageResult userReport={userReport} onRestart={handleRestart} />}
      </main>
    </div>
  );
};

export default App;
