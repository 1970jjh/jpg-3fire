import React from 'react';
import { AppStage } from '../types';
import { Box, LogOut } from 'lucide-react';

interface Props {
  currentStage: AppStage;
  onExit: () => void;
}

const Header: React.FC<Props> = ({ currentStage, onExit }) => {
  const steps = [
    { id: AppStage.SCENARIO, label: '01.상황' },
    { id: AppStage.RESEARCH, label: '02.정보' },
    { id: AppStage.ANALYSIS, label: '03.분석' },
    { id: AppStage.REPORT, label: '04.보고' },
  ];

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStage);
  const progress = Math.max(5, ((getCurrentStepIndex() + 1) / steps.length) * 100);

  return (
    <header className="bg-white border-b-4 border-black sticky top-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter">
          <div className="bg-black text-brutal-yellow p-1">
            <Box size={20} strokeWidth={3} />
          </div>
          <span>PBL<span className="text-brutal-blue">SIM</span></span>
        </div>

        {/* Desktop Navigation */}
        {currentStage !== AppStage.INTRO && currentStage !== AppStage.RESULT && (
          <nav className="hidden md:flex gap-4 absolute left-1/2 transform -translate-x-1/2">
            {steps.map((step, idx) => {
              const isActive = step.id === currentStage;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`px-3 py-1 font-bold border-2 border-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    isActive ? 'bg-brutal-yellow text-black' : 'bg-white text-stone-400 border-stone-300 shadow-none'
                  }`}>
                    {step.label}
                  </div>
                </div>
              );
            })}
          </nav>
        )}

        <button 
          onClick={onExit}
          className="px-3 py-1 bg-black text-white font-bold text-xs hover:bg-brutal-red transition-colors flex items-center gap-2 border-2 border-transparent hover:border-black"
          aria-label="Exit Simulation"
        >
          <span className="hidden md:inline">EXIT</span>
          <LogOut size={16} />
        </button>
      </div>

      {/* Mobile Progress Bar */}
      {currentStage !== AppStage.INTRO && currentStage !== AppStage.RESULT && (
         <div className="md:hidden absolute bottom-0 left-0 w-full h-1 bg-stone-200">
           <div 
             className="h-full bg-brutal-blue transition-all duration-300 ease-out border-r-2 border-black"
             style={{ width: `${progress}%` }}
           />
         </div>
      )}
    </header>
  );
};

export default Header;