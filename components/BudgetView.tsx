import React from 'react';
import { Wallet } from 'lucide-react';

export const BudgetView: React.FC = () => {
  return (
    <div className="p-4 h-full flex flex-col items-center animate-in zoom-in-95 duration-300">
      
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

        {/* Notion Embed */}
        <div className="w-full bg-slate-50">
            <iframe 
                src="https://atlasc.notion.site/ebd/2a3715191af78107a152de2bf2799709" 
                width="100%" 
                height="600" 
                frameBorder="0" 
                allowFullScreen 
                title="Notion Budget Table"
            />
        </div>
      </div>

    </div>
  );
};