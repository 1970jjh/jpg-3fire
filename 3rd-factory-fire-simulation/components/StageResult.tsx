import React from 'react';
import { RefreshCcw, FileText, CheckCircle } from 'lucide-react';
import { ReportSubmission } from '../types';

interface Props {
  userReport: ReportSubmission | null;
  onRestart: () => void;
}

const StageResult: React.FC<Props> = ({ userReport, onRestart }) => {
  if (!userReport) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in slide-in-from-bottom duration-700 pb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">보고서 제출 완료</h2>
        <p className="text-lg text-slate-600">작성하신 보고서가 시스템에 정상적으로 등록되었습니다.</p>
      </div>

      {/* Official Report Format Display */}
      <div className="bg-white p-8 md:p-12 shadow-2xl border border-stone-200 relative">
        {/* Document Header */}
        <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-black uppercase tracking-widest">Incident Report</h1>
            <p className="text-sm font-mono text-stone-500 mt-2">제3공장 화재사고 조사 및 대책 보고서</p>
          </div>
          <div className="text-right font-mono text-sm">
            <p><strong>DATE:</strong> {userReport.timestamp}</p>
            <p><strong>TEAM:</strong> {userReport.teamId}조</p>
            <p><strong>AUTHOR:</strong> {userReport.author}</p>
          </div>
        </div>

        {/* Document Body */}
        <div className="space-y-8 font-serif">
          
          <section>
            <h3 className="text-sm font-bold bg-black text-white inline-block px-2 py-1 mb-3 uppercase tracking-wider">1. Problem Definition</h3>
            <div className="p-4 bg-stone-50 border-l-4 border-stone-300">
              <p className="text-lg text-stone-800 leading-relaxed">
                {userReport.problemDefinition}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold bg-black text-white inline-block px-2 py-1 mb-3 uppercase tracking-wider">2. Root Cause Analysis</h3>
            <div className="p-4 bg-stone-50 border-l-4 border-stone-300">
              <p className="text-lg text-stone-800 leading-relaxed">
                {userReport.rootCause}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold bg-black text-white inline-block px-2 py-1 mb-3 uppercase tracking-wider">3. Solution Strategy</h3>
             <div className="grid md:grid-cols-2 gap-4">
               <div className="p-4 bg-blue-50 border-l-4 border-blue-200">
                 <h4 className="font-bold text-blue-800 text-xs uppercase mb-2">Immediate Action</h4>
                 <p className="text-stone-800">
                   {userReport.solution}
                 </p>
               </div>
               <div className="p-4 bg-green-50 border-l-4 border-green-200">
                 <h4 className="font-bold text-green-800 text-xs uppercase mb-2">Prevention (Upstream)</h4>
                 <p className="text-stone-800">
                   {userReport.prevention}
                 </p>
               </div>
             </div>
          </section>

        </div>

        {/* Stamp */}
        <div className="absolute top-8 right-8 opacity-20 rotate-[-15deg] pointer-events-none">
          <div className="w-32 h-32 border-4 border-red-600 rounded-full flex items-center justify-center">
            <span className="text-red-600 font-black text-2xl uppercase">Approved</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={onRestart}
          className="bg-stone-900 hover:bg-black text-white font-bold py-4 px-12 rounded-full transition-all flex items-center gap-3 shadow-lg"
        >
          <RefreshCcw size={20} />
          초기 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default StageResult;