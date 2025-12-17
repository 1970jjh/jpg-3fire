import React from 'react';
import { FileCheck, AlertTriangle, Lightbulb, FileText, Shield, User, Calendar, Hash } from 'lucide-react';
import { ReportSubmission } from '../types';

interface AnalysisData {
  author: string;
  problemDefinition: string;
  rootCause: string;
  solution: string;
  prevention: string;
}

interface Props {
  analysisData: AnalysisData;
  teamId: number;
  onSubmit: (data: Omit<ReportSubmission, 'id' | 'timestamp' | 'teamId'>) => void;
}

const StageReport: React.FC<Props> = ({ analysisData, teamId, onSubmit }) => {
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSubmit = () => {
    onSubmit(analysisData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-in fade-in duration-500 pb-32 md:pb-20">
      {/* Report Header */}
      <div className="bg-black text-white p-6 mb-0 border-2 border-black">
        <div className="text-center">
          <p className="text-brutal-yellow font-mono text-sm mb-2">INCIDENT ANALYSIS REPORT</p>
          <h1 className="text-2xl md:text-3xl font-black">제3공장 화재사고 분석 보고서</h1>
        </div>
      </div>

      {/* Report Meta Info */}
      <div className="bg-stone-100 border-x-2 border-b-2 border-black p-4 flex flex-wrap gap-4 justify-between text-sm">
        <div className="flex items-center gap-2">
          <Hash size={16} className="text-stone-500" />
          <span className="font-bold">TEAM {teamId}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="text-stone-500" />
          <span className="font-bold">{analysisData.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-stone-500" />
          <span className="font-bold">{currentDate}</span>
        </div>
      </div>

      {/* Report Body */}
      <div className="bg-white border-x-2 border-b-2 border-black">
        {/* Section 1: Problem Definition */}
        <div className="p-6 border-b-2 border-black">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center font-black">1</div>
            <AlertTriangle size={20} className="text-red-500" />
            <h2 className="text-lg font-black">문제 정의 (Problem Definition)</h2>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="font-medium leading-relaxed whitespace-pre-wrap">{analysisData.problemDefinition}</p>
          </div>
        </div>

        {/* Section 2: Root Cause */}
        <div className="p-6 border-b-2 border-black">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center font-black">2</div>
            <Lightbulb size={20} className="text-orange-500" />
            <h2 className="text-lg font-black">근본 원인 (Root Cause)</h2>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <p className="font-medium leading-relaxed whitespace-pre-wrap">{analysisData.rootCause}</p>
          </div>
        </div>

        {/* Section 3: Solution */}
        <div className="p-6 border-b-2 border-black">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center font-black">3</div>
            <FileText size={20} className="text-blue-500" />
            <h2 className="text-lg font-black">해결 방안 (Solution)</h2>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="font-medium leading-relaxed whitespace-pre-wrap">{analysisData.solution}</p>
          </div>
        </div>

        {/* Section 4: Prevention */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center font-black">4</div>
            <Shield size={20} className="text-green-500" />
            <h2 className="text-lg font-black">재발 방지 대책 (Prevention)</h2>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="font-medium leading-relaxed whitespace-pre-wrap">{analysisData.prevention}</p>
          </div>
        </div>
      </div>

      {/* Report Footer */}
      <div className="bg-stone-200 border-x-2 border-b-2 border-black p-4 text-center">
        <p className="text-xs text-stone-500 font-mono">END OF REPORT // TEAM {teamId} // {currentDate}</p>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black md:static md:bg-transparent md:border-none md:p-0 md:mt-8 z-20">
        <button
          onClick={handleSubmit}
          className="w-full md:w-auto md:ml-auto px-8 py-4 font-black text-lg flex items-center justify-center gap-3 border-2 border-black shadow-hard transition-all bg-black text-white hover:bg-brutal-blue hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          <FileCheck size={24} />
          <span>보고서 제출</span>
        </button>
      </div>
    </div>
  );
};

export default StageReport;
