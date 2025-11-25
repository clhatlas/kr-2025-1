import React from 'react';
import { Plane, Home, Phone, AlertTriangle, FileText } from 'lucide-react';

export const EssentialsView: React.FC = () => {
  return (
    <div className="p-4 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      
      <h2 className="text-2xl font-bold text-slate-800 px-1">旅程重要資訊</h2>

      {/* Flights */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-sky-50 p-3 border-b border-sky-100 flex items-center gap-2">
            <Plane className="text-sky-600" size={20} />
            <h3 className="font-bold text-sky-900">航班資訊</h3>
        </div>
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">去程 (TW644)</span>
                    <div className="font-bold text-slate-800 text-lg">HKG ➝ ICN</div>
                    <div className="text-sm text-slate-500">12/17 抵達 05:30</div>
                </div>
                <div className="text-right">
                    <span className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded font-bold">德威航空</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">回程 (UO615)</span>
                    <div className="font-bold text-slate-800 text-lg">ICN ➝ HKG</div>
                    <div className="text-sm text-slate-500">12/21 起飛 02:20</div>
                </div>
                <div className="text-right">
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-bold">香港快運</span>
                </div>
            </div>
        </div>
      </section>

      {/* Accommodations */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-indigo-50 p-3 border-b border-indigo-100 flex items-center gap-2">
            <Home className="text-indigo-600" size={20} />
            <h3 className="font-bold text-indigo-900">住宿資訊</h3>
        </div>
        <div className="p-4 space-y-4">
            <div className="pb-3 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400">Day 1-2 (加平)</span>
                <h4 className="font-bold text-slate-800 mt-1">Violin Glamping & Caravan</h4>
                <p className="text-sm text-slate-500 mt-1">地址：Gyeonggi-do, Gapyeong-gun...</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Violin+Glamping" target="_blank" className="text-xs text-indigo-600 font-medium mt-2 inline-block hover:underline">在 Google Maps 查看</a>
            </div>
            <div>
                <span className="text-xs font-bold text-slate-400">Day 3-4 (首爾)</span>
                <h4 className="font-bold text-slate-800 mt-1">Hotel Lumia Myeongdong</h4>
                <p className="text-sm text-slate-500 mt-1">地址：首爾特別市中區退溪路 (明洞附近)</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Hotel+Lumia+Myeongdong" target="_blank" className="text-xs text-indigo-600 font-medium mt-2 inline-block hover:underline">在 Google Maps 查看</a>
            </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-red-50 p-3 border-b border-red-100 flex items-center gap-2">
            <AlertTriangle className="text-red-600" size={20} />
            <h3 className="font-bold text-red-900">緊急聯絡</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-xs text-slate-500 mb-1">韓國報警</span>
                <span className="text-xl font-black text-slate-800 font-mono">112</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-xs text-slate-500 mb-1">火警/救護</span>
                <span className="text-xl font-black text-slate-800 font-mono">119</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl flex flex-col items-center justify-center text-center col-span-2">
                <span className="text-xs text-slate-500 mb-1">旅遊諮詢熱線 (有中文)</span>
                <div className="flex items-center gap-2 text-red-600 font-bold">
                    <Phone size={16} />
                    <span className="text-lg font-mono">1330</span>
                </div>
            </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <FileText size={18} /> 必備文件檢查
        </h3>
        <ul className="space-y-2">
            {[
                '護照 (有效期6個月以上)',
                'K-ETA 或 Q-CODE (若適用)',
                '國際駕照 (租車必備)',
                '香港駕照正本 (租車必備)',
                '信用卡 (海外開通)',
                'WOWPASS / T-Money 卡'
            ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    {item}
                </li>
            ))}
        </ul>
      </section>

    </div>
  );
};
