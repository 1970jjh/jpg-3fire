import React, { useState } from 'react';
import { Users, BarChart2, FileText, CheckCircle, Search, LogOut, Settings, Eye, X, AlertTriangle, Lightbulb, Shield, User, Calendar, Hash } from 'lucide-react';
import { CLUES } from '../constants';
import { ReportSubmission } from '../types';

interface Props {
  onExit: () => void;
  totalTeams?: number;
  setTotalTeams?: (count: number) => void;
  allReports?: ReportSubmission[];
}

const AdminDashboard: React.FC<Props> = ({ onExit, totalTeams = 6, setTotalTeams, allReports = [] }) => {
  const [selectedTeamForClues, setSelectedTeamForClues] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'dashboard' | 'clues'>('dashboard');
  const [selectedReport, setSelectedReport] = useState<ReportSubmission | null>(null);

  // Stats derived from actual data
  const stats = {
    totalTeams: totalTeams,
    activeStudents: Math.max(allReports.length + 2, 5),
    completed: allReports.length,
    completionRate: totalTeams > 0 ? Math.round((allReports.length / totalTeams) * 100) : 0
  };

  // Logic to show clues for a specific team
  const getTeamClues = (targetTeamId: number) => {
    const totalClues = CLUES.length;
    const baseCount = Math.floor(totalClues / totalTeams);
    const extraCount = totalClues % totalTeams;

    let startIndex = 0;
    for (let i = 1; i < targetTeamId; i++) {
      startIndex += baseCount + (i <= extraCount ? 1 : 0);
    }
    const count = baseCount + (targetTeamId <= extraCount ? 1 : 0);
    return CLUES.slice(startIndex, startIndex + count);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex font-sans text-black">
      {/* Sidebar - PC Only */}
      <aside className="w-64 bg-black text-white flex-col hidden md:flex shadow-xl fixed h-full z-10">
        <div className="p-6 border-b border-stone-800">
          <h1 className="text-xl font-black text-white flex items-center gap-2 italic">
            <span>PBL</span><span className="text-brutal-blue">SIM</span>
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-mono">ADMIN CONSOLE V2</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setViewMode('dashboard')}
            className={`w-full text-left p-3 border-2 font-bold flex items-center gap-3 cursor-pointer transition-colors ${viewMode === 'dashboard' ? 'bg-brutal-blue text-white border-white/20 shadow-lg' : 'text-stone-400 border-transparent hover:bg-stone-900'}`}
          >
            <BarChart2 size={20} />
            <span>대시보드</span>
          </button>
          <button
            onClick={() => setViewMode('clues')}
            className={`w-full text-left p-3 border-2 font-bold flex items-center gap-3 cursor-pointer transition-colors ${viewMode === 'clues' ? 'bg-brutal-blue text-white border-white/20 shadow-lg' : 'text-stone-400 border-transparent hover:bg-stone-900'}`}
          >
            <Eye size={20} />
            <span>팀별 정보 확인</span>
          </button>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button
            onClick={onExit}
            className="w-full text-stone-400 p-3 flex items-center gap-3 cursor-pointer hover:text-white hover:bg-red-900/50 transition-colors mb-4 font-bold"
          >
            <LogOut size={20} />
            <span>모드 전환 / 나가기</span>
          </button>

          <div className="flex items-center gap-3 bg-stone-900 p-3 border border-stone-800">
            <div className="w-10 h-10 bg-brutal-yellow text-black flex items-center justify-center font-black">AD</div>
            <div>
              <p className="text-sm font-bold">관리자</p>
              <p className="text-xs text-stone-500 font-mono">SYSTEM OP</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-white p-4 border-2 border-black shadow-hard">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-black uppercase">
              {viewMode === 'dashboard' ? 'Real-time Dashboard' : 'Team Evidence Inspector'}
            </h2>
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-mono font-bold border-2 border-black animate-pulse">LIVE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
              <input type="text" placeholder="데이터 검색..." className="pl-10 pr-4 py-2 bg-stone-100 border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-brutal-blue w-64 font-bold placeholder:text-stone-400" />
            </div>
          </div>
        </header>

        {viewMode === 'dashboard' ? (
          <>
            {/* Configuration Section */}
            {setTotalTeams && (
              <div className="mb-8 bg-white p-6 border-2 border-black shadow-hard">
                <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2">
                  <Settings size={20} />
                  SIMULATION SETTINGS
                </h3>
                <div className="flex items-center gap-4">
                  <label className="font-bold">전체 조(Team) 개수 설정:</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setTotalTeams(Math.max(1, totalTeams - 1))}
                      className="w-10 h-10 bg-stone-200 border-2 border-black font-bold hover:bg-stone-300"
                    >
                      -
                    </button>
                    <div className="w-16 h-10 flex items-center justify-center border-t-2 border-b-2 border-black font-mono font-bold text-lg">
                      {totalTeams}
                    </div>
                    <button
                      onClick={() => setTotalTeams(Math.min(10, totalTeams + 1))}
                      className="w-10 h-10 bg-stone-200 border-2 border-black font-bold hover:bg-stone-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-stone-500 ml-2">
                    * 총 {CLUES.length}개의 단서가 {totalTeams}개 조에 약 {Math.ceil(CLUES.length / totalTeams)}개씩 분배됩니다.
                  </p>
                </div>
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 border-2 border-black shadow-hard">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-stone-500 text-xs font-black uppercase">Active Teams</p>
                    <h3 className="text-4xl font-black text-black">{stats.totalTeams}</h3>
                  </div>
                  <div className="p-2 bg-black text-white"><Users size={24} /></div>
                </div>
              </div>

              <div className="bg-white p-6 border-2 border-black shadow-hard">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-stone-500 text-xs font-black uppercase">Reports Submitted</p>
                    <h3 className="text-4xl font-black text-black">{stats.completed}</h3>
                  </div>
                  <div className="p-2 bg-green-500 text-white border-2 border-black"><CheckCircle size={24} /></div>
                </div>
              </div>

               <div className="bg-white p-6 border-2 border-black shadow-hard">
                 <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-stone-500 text-xs font-black uppercase">Progress Rate</p>
                    <h3 className="text-4xl font-black text-black">{stats.completionRate}%</h3>
                  </div>
                  <div className="p-2 bg-brutal-yellow text-black border-2 border-black"><BarChart2 size={24} /></div>
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-white border-2 border-black shadow-hard p-6">
              <h3 className="text-xl font-black text-black mb-6 border-b-2 border-black pb-2">SUBMITTED REPORTS (LIVE)</h3>
              {allReports.length === 0 ? (
                <div className="text-center py-10 text-stone-400 font-bold">
                  아직 제출된 보고서가 없습니다.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-black text-white font-mono">
                      <tr>
                        <th className="py-3 px-4">TIME</th>
                        <th className="py-3 px-4">TEAM</th>
                        <th className="py-3 px-4">AUTHOR</th>
                        <th className="py-3 px-4">ROOT CAUSE (SUMMARY)</th>
                        <th className="py-3 px-4">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-stone-100 font-bold">
                      {allReports.map((report) => (
                        <tr key={report.id} className="hover:bg-brutal-yellow/20 transition-colors">
                          <td className="py-3 px-4 font-mono">{report.timestamp}</td>
                          <td className="py-3 px-4">{report.teamId}팀</td>
                          <td className="py-3 px-4">{report.author}</td>
                          <td className="py-3 px-4 max-w-xs truncate">{report.rootCause}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setSelectedReport(report)}
                              className="px-3 py-1 bg-white border-2 border-black text-xs font-bold hover:bg-brutal-blue hover:text-white transition-colors shadow-sm hover:shadow-none"
                            >
                              DETAILS
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Clue Inspector Mode */
          <div className="bg-white border-2 border-black shadow-hard p-6">
             <div className="mb-6 flex items-center gap-4 bg-stone-100 p-4 border border-black">
               <label className="font-bold">확인할 조 선택:</label>
               <div className="flex gap-2">
                 {Array.from({length: totalTeams}, (_, i) => i + 1).map(num => (
                   <button
                    key={num}
                    onClick={() => setSelectedTeamForClues(num)}
                    className={`w-10 h-10 border-2 border-black font-bold transition-all ${
                      selectedTeamForClues === num ? 'bg-black text-white -translate-y-1 shadow-lg' : 'bg-white hover:bg-stone-200'
                    }`}
                   >
                     {num}
                   </button>
                 ))}
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-2">
                {getTeamClues(selectedTeamForClues).map(clue => (
                  <div key={clue.id} className="border border-stone-300 p-3 bg-white flex gap-3 hover:border-black transition-colors">
                    {clue.image && (
                      <div className="w-16 h-16 bg-stone-200 shrink-0">
                        <img src={clue.image} className="w-full h-full object-cover" alt="thumbnail" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="font-bold text-xs text-brutal-blue mb-1">{clue.id}</p>
                      <p className="font-bold text-sm truncate">{clue.title}</p>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">{clue.content}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border-4 border-black shadow-hard-lg"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-10">
              <div>
                <p className="text-brutal-yellow font-mono text-xs">INCIDENT ANALYSIS REPORT</p>
                <h3 className="text-xl font-black">제3공장 화재사고 분석 보고서</h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="hover:text-brutal-yellow transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Meta */}
            <div className="bg-stone-100 border-b-2 border-black p-4 flex flex-wrap gap-4 justify-between text-sm">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-stone-500" />
                <span className="font-bold">TEAM {selectedReport.teamId}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-stone-500" />
                <span className="font-bold">{selectedReport.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-stone-500" />
                <span className="font-bold">{selectedReport.timestamp}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Problem Definition */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center font-black text-sm">1</div>
                  <AlertTriangle size={20} className="text-red-500" />
                  <h4 className="font-black">문제 정의 (Problem Definition)</h4>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="font-medium leading-relaxed whitespace-pre-wrap">{selectedReport.problemDefinition}</p>
                </div>
              </div>

              {/* Root Cause */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center font-black text-sm">2</div>
                  <Lightbulb size={20} className="text-orange-500" />
                  <h4 className="font-black">근본 원인 (Root Cause)</h4>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                  <p className="font-medium leading-relaxed whitespace-pre-wrap">{selectedReport.rootCause}</p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center font-black text-sm">3</div>
                  <FileText size={20} className="text-blue-500" />
                  <h4 className="font-black">해결 방안 (Solution)</h4>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="font-medium leading-relaxed whitespace-pre-wrap">{selectedReport.solution}</p>
                </div>
              </div>

              {/* Prevention */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center font-black text-sm">4</div>
                  <Shield size={20} className="text-green-500" />
                  <h4 className="font-black">재발 방지 대책 (Prevention)</h4>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-medium leading-relaxed whitespace-pre-wrap">{selectedReport.prevention}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-200 border-t-2 border-black p-4 text-center">
              <p className="text-xs text-stone-500 font-mono">END OF REPORT // TEAM {selectedReport.teamId}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
