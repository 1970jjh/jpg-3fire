import React, { useState } from 'react';
import { FileCheck, User } from 'lucide-react';
import { ReportSubmission } from '../types';

interface Props {
  onNext: (data: Omit<ReportSubmission, 'id' | 'timestamp' | 'teamId'>) => void;
}

const StageReport: React.FC<Props> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    author: '',
    problemDefinition: '',
    rootCause: '',
    solution: '',
    prevention: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-in fade-in duration-500 pb-24 md:pb-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">최종 보고서 작성</h2>
        <p className="text-slate-500">각 항목에 대해 핵심 내용을 간결하게 작성하여 제출하십시오.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 space-y-6">
        
        {/* Author Info */}
        <div className="bg-stone-50 p-4 border border-stone-200 rounded-lg">
          <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
            <User size={16} />
            작성자 (팀 대표)
          </label>
          <input 
            required
            type="text"
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="이름을 입력하세요"
            value={formData.author}
            onChange={e => setFormData({...formData, author: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            문제 정의 (Problem Definition)
          </label>
          <input 
            required
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 화재 발생으로 인한 인명 피해 및 납기 지연"
            value={formData.problemDefinition}
            onChange={e => setFormData({...formData, problemDefinition: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
             <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
            근본 원인 (Root Cause)
          </label>
          <input 
            required
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 무리한 생산 일정으로 인한 과부하 및 안전 불감증"
            value={formData.rootCause}
            onChange={e => setFormData({...formData, rootCause: e.target.value})}
          />
        </div>

        <div>
           <label className="block text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
             <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
            해결 방안 (Solution)
          </label>
          <input 
            required
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 피해자 긴급 후송 및 대체 생산 라인 가동"
            value={formData.solution}
            onChange={e => setFormData({...formData, solution: e.target.value})}
          />
        </div>

        <div>
           <label className="block text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
             <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
            재발 방지 대책 (Prevention)
          </label>
          <input 
            required
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 전력 자동 차단 시스템 도입 및 안전 점검 프로세스 강화"
            value={formData.prevention}
            onChange={e => setFormData({...formData, prevention: e.target.value})}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:static md:bg-transparent md:border-none md:p-0 md:pt-6 md:border-t md:border-slate-100 z-20 flex justify-end">
          <button 
            type="submit"
            className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            <FileCheck />
            보고서 제출 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default StageReport;