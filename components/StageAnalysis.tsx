import React, { useState } from 'react';
import { ChevronRight, FileText, AlertTriangle, Lightbulb, Shield, User } from 'lucide-react';

interface AnalysisData {
  author: string;
  problemDefinition: string;
  rootCause: string;
  solution: string;
  prevention: string;
}

interface Props {
  onNext: (data: AnalysisData) => void;
  teamId: number;
}

const StageAnalysis: React.FC<Props> = ({ onNext, teamId }) => {
  const [formData, setFormData] = useState<AnalysisData>({
    author: '',
    problemDefinition: '',
    rootCause: '',
    solution: '',
    prevention: ''
  });

  const isFormValid = formData.author.trim() &&
                      formData.problemDefinition.trim() &&
                      formData.rootCause.trim() &&
                      formData.solution.trim() &&
                      formData.prevention.trim();

  const handleSubmit = () => {
    if (isFormValid) {
      onNext(formData);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 animate-in slide-in-from-right duration-500 pb-32 md:pb-20">
      {/* Header */}
      <div className="bg-white border-2 border-black p-4 shadow-hard mb-6">
        <h2 className="text-xl md:text-2xl font-black uppercase flex items-center gap-2">
          <FileText size={24} />
          TEAM {teamId} - 분석 보고서 작성
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          수집한 정보를 바탕으로 각 항목을 작성하세요.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Author */}
        <div className="bg-white border-2 border-black p-5 shadow-hard">
          <label className="block font-black text-sm mb-3 flex items-center gap-2 text-stone-700">
            <User size={18} />
            작성자 (팀 대표)
          </label>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-brutal-blue outline-none font-bold"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>

        {/* Problem Definition */}
        <div className="bg-white border-2 border-black p-5 shadow-hard">
          <label className="block font-black text-sm mb-3 flex items-center gap-2">
            <span className="bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs">1</span>
            <AlertTriangle size={18} className="text-red-500" />
            문제 정의 (Problem Definition)
          </label>
          <p className="text-xs text-stone-500 mb-3">발생한 문제가 무엇인지 명확하게 정의하세요.</p>
          <textarea
            placeholder="예: 제3공장에서 화재가 발생하여 박계장이 전치 4주 화상을 입었으며, 생산 라인이 중단되었다."
            className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-brutal-blue outline-none font-medium min-h-[100px] resize-none"
            value={formData.problemDefinition}
            onChange={(e) => setFormData({ ...formData, problemDefinition: e.target.value })}
          />
        </div>

        {/* Root Cause */}
        <div className="bg-white border-2 border-black p-5 shadow-hard">
          <label className="block font-black text-sm mb-3 flex items-center gap-2">
            <span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center text-xs">2</span>
            <Lightbulb size={18} className="text-orange-500" />
            근본 원인 (Root Cause)
          </label>
          <p className="text-xs text-stone-500 mb-3">문제가 발생한 근본적인 원인을 분석하세요.</p>
          <textarea
            placeholder="예: 무리한 생산 일정으로 인해 전력 과부하가 발생했고, 비상 출구 앞에 자재를 적재하여 대피가 지연되었다."
            className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-brutal-blue outline-none font-medium min-h-[100px] resize-none"
            value={formData.rootCause}
            onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
          />
        </div>

        {/* Solution */}
        <div className="bg-white border-2 border-black p-5 shadow-hard">
          <label className="block font-black text-sm mb-3 flex items-center gap-2">
            <span className="bg-blue-500 text-white w-6 h-6 flex items-center justify-center text-xs">3</span>
            <FileText size={18} className="text-blue-500" />
            해결 방안 (Solution)
          </label>
          <p className="text-xs text-stone-500 mb-3">현재 상황을 해결하기 위한 즉각적인 조치를 작성하세요.</p>
          <textarea
            placeholder="예: 피해자 긴급 후송, 화재 진압, 대체 생산 라인 가동을 통한 납기 대응"
            className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-brutal-blue outline-none font-medium min-h-[100px] resize-none"
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
          />
        </div>

        {/* Prevention */}
        <div className="bg-white border-2 border-black p-5 shadow-hard">
          <label className="block font-black text-sm mb-3 flex items-center gap-2">
            <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center text-xs">4</span>
            <Shield size={18} className="text-green-500" />
            재발 방지 대책 (Prevention)
          </label>
          <p className="text-xs text-stone-500 mb-3">동일한 문제가 재발하지 않도록 하는 예방 대책을 작성하세요.</p>
          <textarea
            placeholder="예: 전력 자동 차단 시스템 도입, 비상 출구 관리 강화, 정기 안전 점검 의무화"
            className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-brutal-blue outline-none font-medium min-h-[100px] resize-none"
            value={formData.prevention}
            onChange={(e) => setFormData({ ...formData, prevention: e.target.value })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black md:static md:bg-transparent md:border-none md:p-0 md:mt-8 z-20">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full md:w-auto md:ml-auto px-8 py-4 font-black text-lg flex items-center justify-center gap-2 border-2 border-black shadow-hard transition-all ${
            isFormValid
              ? 'bg-brutal-blue text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
        >
          <span>보고서 초안 작성</span>
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default StageAnalysis;
