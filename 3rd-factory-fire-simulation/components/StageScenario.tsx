import React from 'react';
import { Calendar, Clock, MapPin, Activity, AlertOctagon, ChevronRight, User } from 'lucide-react';
import { SCENARIO_DETAILS } from '../constants';

interface Props {
  onNext: () => void;
}

const StageScenario: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brutal-red text-white p-2 border-2 border-black shadow-hard">
          <AlertOctagon size={32} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black uppercase">Scenario Briefing</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Incident Summary */}
        <div className="bg-white p-6 border-2 border-black shadow-hard">
          <h3 className="bg-black text-white inline-block px-2 py-1 font-mono font-bold text-sm mb-4">INCIDENT REPORT</h3>
          <div className="space-y-4 font-bold">
            <div>
              <p className="text-stone-500 text-xs uppercase mb-1">WHAT</p>
              <p className="text-xl bg-brutal-yellow inline-block px-1 border border-black">{SCENARIO_DETAILS.incident}</p>
            </div>
            <div>
              <p className="text-stone-500 text-xs uppercase mb-1">WHEN</p>
              <p className="text-lg">{SCENARIO_DETAILS.date}</p>
            </div>
            <div>
              <p className="text-stone-500 text-xs uppercase mb-1">WHERE</p>
              <p className="text-lg">{SCENARIO_DETAILS.location}</p>
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="bg-white p-6 border-2 border-black shadow-hard">
          <h3 className="bg-black text-white inline-block px-2 py-1 font-mono font-bold text-sm mb-4">DAMAGE ASSESSMENT</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-brutal-red pl-4">
              <div className="flex items-center gap-2 mb-1 text-brutal-red font-black">
                <User size={20} /> HUMAN CASUALTY
              </div>
              <p className="font-bold">{SCENARIO_DETAILS.victim}</p>
            </div>
            <div className="border-l-4 border-brutal-blue pl-4">
              <div className="flex items-center gap-2 mb-1 text-brutal-blue font-black">
                <Activity size={20} /> BUSINESS IMPACT
              </div>
              <p className="font-bold text-sm leading-relaxed">{SCENARIO_DETAILS.businessImpact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Message */}
      <div className="bg-black text-white p-8 border-4 border-stone-800 shadow-hard mb-8 relative">
        <div className="absolute top-4 right-4 text-stone-600 font-mono font-bold text-6xl opacity-20">"</div>
        <h3 className="text-brutal-yellow font-black text-xl mb-4 border-b border-stone-700 pb-2">CEO's ORDER</h3>
        <p className="text-lg leading-relaxed font-medium font-serif italic">
          "지금 당장 원인을 파악해서 보고하게! 단순히 불을 껐다는게 중요한 게 아니야. <span className="text-brutal-red underline decoration-2 underline-offset-4">왜 이런 일이 벌어졌는지, 다시는 이런 일이 없으려면 어떻게 해야 하는지</span> 근본적인 대책을 가져오게!"
        </p>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onNext}
          className="bg-brutal-blue hover:bg-blue-700 text-white font-black py-4 px-8 border-2 border-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
        >
          START INVESTIGATION
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default StageScenario;