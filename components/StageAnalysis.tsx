import React, { useState } from 'react';
import { ChevronRight, ArrowDown, Calculator, HelpCircle } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const StageAnalysis: React.FC<Props> = ({ onNext }) => {
  const [powerCalc, setPowerCalc] = useState<{a: number, b: number, h: number}>({a: 2, b: 4, h: 3});
  const [whySteps, setWhySteps] = useState<string[]>(["", "", ""]);

  const calculateTotalPower = () => {
    return (powerCalc.a * 3500) + (powerCalc.b * 2000) + (powerCalc.h * 500);
  };

  const totalPower = calculateTotalPower();
  const maxPower = 16000;
  const isOverload = totalPower > maxPower;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 animate-in slide-in-from-right duration-500 pb-32 md:pb-20">
      <h2 className="text-2xl font-bold mb-6 border-l-8 border-purple-600 pl-4">원인 분석</h2>

      {/* Tool 1: Logic Tree / Data Verification */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800 border-b border-slate-100 pb-4">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Calculator size={20} />
          </div>
          가설 1: 전력 과부하 확인
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            {[
              { label: 'A Pro (3,500W)', key: 'a' as const },
              { label: 'B Pro (2,000W)', key: 'b' as const },
              { label: '항온항습기 (500W)', key: 'h' as const }
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl active:bg-slate-100 transition-colors">
                <label className="font-medium text-sm text-slate-700">{item.label}</label>
                <div className="flex items-center gap-3">
                  <button 
                    className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-500 active:bg-slate-100"
                    onClick={() => setPowerCalc(prev => ({...prev, [item.key]: Math.max(0, prev[item.key] - 1)}))}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{powerCalc[item.key]}</span>
                  <button 
                    className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-500 active:bg-slate-100"
                    onClick={() => setPowerCalc(prev => ({...prev, [item.key]: Math.min(10, prev[item.key] + 1)}))}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl text-center shadow-lg mt-4 md:mt-0">
            <p className="text-slate-400 text-sm mb-2 uppercase tracking-wide">Total Power Usage</p>
            <p className={`text-4xl font-black mb-4 ${isOverload ? 'text-red-400' : 'text-green-400'}`}>
              {totalPower.toLocaleString()} <span className="text-lg text-slate-400">W</span>
            </p>
            <div className="border-t border-slate-700 pt-4 flex justify-between px-4">
              <span className="text-sm text-slate-400">Limit</span>
              <span className="text-lg font-bold">16,000 W</span>
            </div>
            {isOverload && (
              <div className="mt-4 bg-red-500/20 border border-red-500 text-red-100 text-sm font-bold py-2 px-4 rounded-lg animate-pulse">
                ⚠ 과부하 발생 (Overload)
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tool 2: 5 Whys */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800 border-b border-slate-100 pb-4">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <HelpCircle size={20} />
          </div>
          가설 2: 5 Why 분석
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-900">
            <span className="block text-xs font-bold text-red-400 mb-1">문제 상황 (Phenomenon)</span>
            <p className="font-bold">박계장이 화재 대피 중 전치 4주 화상을 입었다.</p>
          </div>

          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-slate-200 ml-4 pb-2 last:border-0 last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
              <div className="mb-2">
                <span className="text-sm font-bold text-slate-500">Why {idx + 1}?</span>
              </div>
              <textarea 
                placeholder={idx === 0 ? "왜 화상을 입었는가?" : idx === 1 ? "왜 출구로 나가지 못했는가?" : "왜 출구가 막혀있었는가?"}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-base min-h-[80px] resize-none"
                value={whySteps[idx]}
                onChange={(e) => {
                  const newSteps = [...whySteps];
                  newSteps[idx] = e.target.value;
                  setWhySteps(newSteps);
                }}
              />
            </div>
          ))}
          
           <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-xl text-purple-900 text-sm">
             <div className="flex items-start gap-2">
               <span className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-0.5 rounded mt-0.5">Hint</span>
               <p className="leading-relaxed">
                 생산 물량을 맞추기 위해 가공 전 자재를 출구 쪽에 무리하게 적재함 (안전 수칙 위반)
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:static md:bg-transparent md:border-none md:p-0 md:mt-8 z-20">
        <button 
          onClick={onNext}
          className="w-full md:w-auto md:ml-auto px-6 py-4 md:py-3 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:bg-blue-700 active:bg-blue-800"
        >
          <span>보고서 작성</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StageAnalysis;