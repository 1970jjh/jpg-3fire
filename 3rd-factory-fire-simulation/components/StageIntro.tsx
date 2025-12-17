import React, { useEffect, useState, useRef } from 'react';
import { AlertTriangle, ChevronRight, Volume2, VolumeX, AlertOctagon } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const StageIntro: React.FC<Props> = ({ onNext }) => {
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSiren = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = 600;

      const lfo = ctx.createOscillator();
      lfo.type = 'triangle';
      lfo.frequency.value = 2;
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.5);

      osc.start();
      lfo.start();

      oscillatorRef.current = osc;
      lfoRef.current = lfo;
      gainNodeRef.current = gain;
      setIsSirenPlaying(true);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const stopSiren = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 0.5);
      setTimeout(() => {
        oscillatorRef.current?.stop();
        lfoRef.current?.stop();
        setIsSirenPlaying(false);
      }, 500);
    } else {
       setIsSirenPlaying(false);
    }
  };

  useEffect(() => {
    startSiren();
    return () => {
      stopSiren();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 animate-in fade-in duration-700 bg-stone-100">
      
      <div className="bg-white border-4 border-black shadow-hard-lg max-w-md w-full p-8 text-center relative">
        <div className="absolute top-0 left-0 bg-brutal-red text-white font-bold px-4 py-1 border-b-4 border-r-4 border-black">
          EMERGENCY
        </div>

        <div className="mt-8 mb-6 flex justify-center">
           <div className="bg-brutal-red p-6 border-4 border-black rounded-full animate-pulse">
            <AlertTriangle size={64} className="text-white" strokeWidth={3} />
           </div>
        </div>

        <h1 className="text-4xl font-black text-black mb-4 uppercase tracking-tight leading-none">
          긴급 상황 발생<br/>
          <span className="text-brutal-red text-2xl">제3공장 화재</span>
        </h1>
        
        <p className="text-lg font-bold border-t-2 border-b-2 border-black py-4 mb-6 bg-brutal-yellow">
          즉시 현장에 진입하여<br/>원인을 파악하십시오.
        </p>

        {/* Audio Toggle */}
        <button 
          onClick={isSirenPlaying ? stopSiren : startSiren}
          className="mb-6 flex items-center justify-center gap-2 text-stone-500 font-bold text-sm w-full"
        >
          {isSirenPlaying ? <Volume2 size={20} className="text-brutal-red animate-pulse"/> : <VolumeX size={20}/>}
          <span>{isSirenPlaying ? '경보음 끄기' : '경보음 켜기'}</span>
        </button>
        
        <div className="text-left space-y-4 font-bold text-sm mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-mono border-2 border-black shadow-hard">01</div>
              <span>현장 단서 수집 (팀별 정보 제한)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-mono border-2 border-black shadow-hard">02</div>
              <span>AI 튜터와 분석 (가설 검증)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-mono border-2 border-black shadow-hard">03</div>
              <span>원인 규명 및 대책 보고</span>
            </div>
        </div>

        <button 
          onClick={() => {
            stopSiren();
            onNext();
          }}
          className="w-full bg-black text-white text-xl font-black py-4 border-2 border-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          ENTER SIMULATION
          <ChevronRight strokeWidth={4} />
        </button>
      </div>
    </div>
  );
};

export default StageIntro;