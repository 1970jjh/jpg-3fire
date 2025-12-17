import React, { useState } from 'react';
import { FileText, CheckCircle, ChevronRight, X, ZoomIn } from 'lucide-react';
import { CLUES } from '../constants';
import { Clue } from '../types';

interface Props {
  onNext: () => void;
  teamId: number;
  totalTeams: number;
}

const StageResearch: React.FC<Props> = ({ onNext, teamId, totalTeams }) => {
  const [collectedClues, setCollectedClues] = useState<string[]>([]);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);

  // Distribute images sequentially across teams (1-1 to 4-18 order)
  const getMyClues = () => {
    const totalClues = CLUES.length;
    const baseCount = Math.floor(totalClues / totalTeams);
    const extraCount = totalClues % totalTeams;

    // Calculate start index for current team
    let startIndex = 0;
    for (let i = 1; i < teamId; i++) {
      startIndex += baseCount + (i <= extraCount ? 1 : 0);
    }
    
    // Calculate count for current team
    const myCount = baseCount + (teamId <= extraCount ? 1 : 0);
    
    return CLUES.slice(startIndex, startIndex + myCount);
  };

  const filteredClues = getMyClues();

  const toggleClue = (id: string) => {
    if (collectedClues.includes(id)) {
      setCollectedClues(prev => prev.filter(c => c !== id));
    } else {
      setCollectedClues(prev => [...prev, id]);
    }
  };

  const getVisualHeader = (clue: Clue) => {
    if (clue.image) {
      return (
        <div className="h-48 w-full bg-stone-200 border-b-2 border-black relative overflow-hidden group-hover:contrast-125 transition-all">
          <img src={clue.image} alt="Evidence" className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-0.5 flex items-center gap-1">
             <ZoomIn size={12}/> EVIDENCE
          </div>
        </div>
      );
    }
    return (
      <div className="h-48 w-full bg-stone-100 border-b-2 border-black relative flex items-center justify-center overflow-hidden">
        <FileText className="text-stone-300" size={48} />
      </div>
    );
  };

  // Helper to get generic title without numbers
  const getGenericTitle = (clue: Clue) => {
    return clue.type === 'document' ? '관련 문서 자료' : '현장 사진 자료';
  };

  return (
    <div className="w-full p-4 flex flex-col min-h-[calc(100vh-80px)]">
      {/* Header Info */}
      <div className="bg-white border-2 border-black p-4 shadow-hard mb-6 flex justify-between items-center sticky top-20 z-40">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase">TEAM {teamId} DATABASE</h2>
          <p className="text-xs md:text-sm font-bold text-stone-500 mt-1">
            ASSIGNED EVIDENCE: {filteredClues.length} FILES // <span className="text-brutal-blue">{collectedClues.length} SELECTED</span>
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24 md:pb-10">
        {filteredClues.map(clue => {
          const isCollected = collectedClues.includes(clue.id);
          return (
            <div 
              key={clue.id}
              onClick={() => setSelectedClue(clue)}
              className={`relative cursor-pointer border-2 border-black bg-white transition-all duration-200 flex flex-col ${
                isCollected 
                  ? 'shadow-none translate-x-[4px] translate-y-[4px] ring-4 ring-brutal-blue z-10' 
                  : 'shadow-hard hover:-translate-y-1 hover:shadow-hard-lg'
              }`}
            >
              {getVisualHeader(clue)}

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-lg leading-tight">{getGenericTitle(clue)}</h3>
                  {isCollected && <CheckCircle className="text-brutal-blue shrink-0 ml-2" size={24} fill="white" />}
                </div>
                
                {/* Short preview of content in grid */}
                <p className="text-stone-700 text-sm font-medium leading-relaxed mb-4 line-clamp-3">
                  {clue.content}
                </p>

                <div className="mt-auto border-t-2 border-black/10 pt-3 flex justify-end items-center">
                   <span className="text-xs font-bold text-stone-400">CLICK TO VIEW</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black md:static md:bg-transparent md:border-none md:p-0 md:mt-8 z-30">
        <button
          onClick={onNext}
          className="w-full md:w-auto md:ml-auto px-8 py-4 font-black text-lg flex items-center justify-center gap-2 border-2 border-black shadow-hard transition-all bg-brutal-blue text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          <span>ANALYZE DATA</span>
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Image Popup Modal */}
      {selectedClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setSelectedClue(null)}>
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-black shadow-hard-lg flex flex-col" onClick={e => e.stopPropagation()}>
             
             {/* Modal Header */}
             <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <FileText size={24}/>
                  <h3 className="text-xl font-black tracking-tight">{getGenericTitle(selectedClue)}</h3>
                </div>
                <button onClick={() => setSelectedClue(null)} className="hover:text-brutal-yellow transition-colors">
                  <X size={32}/>
                </button>
             </div>

             {/* Modal Content */}
             <div className="p-4 md:p-6 bg-stone-100 flex-1 overflow-y-auto">
                {selectedClue.image && (
                  <div className="border-4 border-black bg-white p-2 shadow-hard mb-6">
                    <img 
                      src={selectedClue.image} 
                      alt="Full Evidence" 
                      className="w-full h-auto object-contain max-h-[60vh]" 
                    />
                  </div>
                )}
                
             </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default StageResearch;