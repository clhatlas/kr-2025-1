import React from 'react';
import { Wallet, ExternalLink, TrendingUp } from 'lucide-react';

export const BudgetView: React.FC = () => {
  return (
    <div className="p-4 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300 pb-20">
      
      <div className="w-full max-w-md bg-white border border-slate-300 shadow-sm relative overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-5 relative overflow-hidden flex items-center justify-between border-b border-slate-800">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="relative z-10">
                <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <Wallet size={18} className="text-cyan-400" /> Finance Matrix
                </h2>
                <p className="text-slate-500 text-[10px] mt-1 font-mono tracking-widest">
                    TRACKING EXPENSES
                </p>
            </div>
            <TrendingUp className="text-slate-700" size={40} strokeWidth={1} />
        </div>

        {/* Notion Embeds */}
        <div className="w-full bg-slate-50">
            <div className="px-4 py-2 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center border-b border-slate-200 font-mono">
                <span>[Module_01] Ledger</span>
                <a 
                  href="https://atlasc.notion.site/2a3715191af78107a152de2bf2799709" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:text-cyan-800 flex items-center gap-1 bg-white px-2 py-0.5 border border-slate-300 hover:border-cyan-400"
                >
                  EXT <ExternalLink size={8} />
                </a>
            </div>
            <iframe 
                src="https://atlasc.notion.site/ebd/2a3715191af78107a152de2bf2799709" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                allowFullScreen 
                title="Notion Budget Table 1"
                className="bg-white"
            />
        </div>

        <div className="w-full bg-slate-50 border-t border-slate-300">
            <div className="px-4 py-2 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center border-b border-slate-200 font-mono">
                <span>[Module_02] Breakdown</span>
                <a 
                  href="https://atlasc.notion.site/2a3715191af78150a144ee074c43b171?v=2a3715191af7813f8128000c38dd8393" 
                  target="_blank" 
                  rel="noopener noreferrer"
                   className="text-cyan-600 hover:text-cyan-800 flex items-center gap-1 bg-white px-2 py-0.5 border border-slate-300 hover:border-cyan-400"
                >
                  EXT <ExternalLink size={8} />
                </a>
            </div>
            <iframe 
                src="https://atlasc.notion.site/ebd/2a3715191af78150a144ee074c43b171?v=2a3715191af7813f8128000c38dd8393" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                allowFullScreen 
                title="Notion Budget Table 2"
                className="bg-white"
            />
        </div>
      </div>
    </div>
  );
};