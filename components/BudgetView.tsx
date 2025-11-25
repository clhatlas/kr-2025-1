import React from 'react';
import { Wallet } from 'lucide-react';

export const BudgetView: React.FC = () => {
  return (
    <div className="p-4 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300 pb-20">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 text-center relative overflow-hidden">
             {/* Decorative Background Blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 relative z-10">
                <Wallet size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 relative z-10">旅費預算管理</h2>
            <p className="text-slate-500 text-xs mt-1 relative z-10">
              即時更新匯率與公費支出
            </p>
        </div>

        {/* Notion Embed 1 - Original */}
        <div className="w-full bg-slate-50 border-b-4 border-slate-100">
            <div className="px-4 py-2 bg-slate-100/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                行程總表
            </div>
            <iframe 
                src="https://atlasc.notion.site/ebd/2a3715191af78107a152de2bf2799709" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                allowFullScreen 
                title="Notion Budget Table 1"
            />
        </div>

        {/* Notion Embed 2 - New */}
        <div className="w-full bg-slate-50">
            <div className="px-4 py-2 bg-slate-100/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                詳細支出明細
            </div>
            <iframe 
                src="https://www.notion.so/atlasc/2a3715191af78150a144ee074c43b171?v=2a3715191af7813f8128000c38dd8393&source=copy_link" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                allowFullScreen 
                title="Notion Budget Table 2"
            />
        </div>
      </div>

    </div>
  );
};