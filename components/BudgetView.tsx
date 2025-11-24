import React from 'react';
import { ExternalLink, Wallet, DollarSign, PieChart } from 'lucide-react';

export const BudgetView: React.FC = () => {
  const notionUrl = "https://www.notion.so/atlasc/2a3715191af78107a152de2bf2799709?pvs=106";

  return (
    <div className="p-4 h-full flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in-95 duration-300">
      
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center max-w-sm w-full relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
            <Wallet size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">旅費預算管理</h2>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          請使用 Notion 表格記錄您的公費、個人支出及匯率換算。
        </p>

        <a 
            href={notionUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-lg shadow-slate-200"
        >
            <span>打開記帳表格</span>
            <ExternalLink size={16} />
        </a>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
            <div className="text-center">
                <div className="text-xs text-slate-400 font-bold uppercase mb-1">Currency</div>
                <div className="font-mono text-lg font-bold text-slate-700">KRW ₩</div>
            </div>
            <div className="text-center border-l border-slate-100">
                <div className="text-xs text-slate-400 font-bold uppercase mb-1">Tracker</div>
                <div className="font-mono text-lg font-bold text-slate-700">Notion</div>
            </div>
        </div>
      </div>

    </div>
  );
};
