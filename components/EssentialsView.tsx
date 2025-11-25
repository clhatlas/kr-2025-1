import React, { useState, useEffect } from 'react';
import { Plane, Home, Phone, AlertTriangle, FileText, Bell, BellRing, Zap, Activity } from 'lucide-react';

export const EssentialsView: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('您的瀏覽器不支援通知功能');
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      new Notification('航班提醒已開啟', {
        body: '我們將在航班起飛前 24 小時發送提醒通知。',
        icon: 'https://cdn-icons-png.flaticon.com/512/2200/2200326.png'
      });
    }
  };

  return (
    <div className="p-4 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
            <Zap className="text-yellow-500" size={20} />
            資訊中心
        </h2>
        
        <button 
            onClick={requestNotificationPermission}
            disabled={permission === 'granted'}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border font-mono uppercase tracking-wider
                ${permission === 'granted' 
                    ? 'bg-green-50 text-green-700 border-green-300' 
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }
            `}
        >
            {permission === 'granted' ? (
                <> <BellRing size={14} /> 提醒已開啟 </>
            ) : (
                <> <Bell size={14} /> 開啟提醒 </>
            )}
        </button>
      </div>

      {/* Flights */}
      <section className="bg-white border border-slate-300 shadow-sm overflow-hidden group">
        <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_25%,rgba(6,182,212,0.05)_50%,transparent_50%,transparent_75%,rgba(6,182,212,0.05)_75%,rgba(6,182,212,0.05)_100%)] bg-[size:20px_20px] p-3 border-b border-slate-200 flex items-center gap-2">
            <Plane className="text-cyan-600" size={16} />
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs font-mono">航班資訊</h3>
        </div>
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">去程 [TW644]</span>
                    <div className="font-black text-slate-900 text-lg tracking-tight font-sans">HKG ➝ ICN</div>
                    <div className="text-xs text-slate-500 font-mono">12月17日 @ 05:30 抵達</div>
                </div>
                <div className="text-right">
                    <span className="border border-slate-200 text-slate-600 text-[10px] px-2 py-1 uppercase font-bold font-mono">德威航空</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">回程 [UO615]</span>
                    <div className="font-black text-slate-900 text-lg tracking-tight font-sans">ICN ➝ HKG</div>
                    <div className="text-xs text-slate-500 font-mono">12月21日 @ 02:20 起飛</div>
                </div>
                <div className="text-right">
                    <span className="border border-slate-200 text-slate-600 text-[10px] px-2 py-1 uppercase font-bold font-mono">香港快運</span>
                </div>
            </div>
            
            <div className="pt-2 flex gap-2">
                <a href="https://www.google.com/search?q=TW644+status" target="_blank" className="flex-1 text-center text-[10px] font-bold text-slate-700 border border-slate-300 bg-slate-50 py-2 hover:bg-slate-100 hover:border-cyan-400 hover:text-cyan-700 transition-colors uppercase tracking-widest font-mono">
                    查看狀態 :: TW644
                </a>
                <a href="https://www.google.com/search?q=UO615+status" target="_blank" className="flex-1 text-center text-[10px] font-bold text-slate-700 border border-slate-300 bg-slate-50 py-2 hover:bg-slate-100 hover:border-purple-400 hover:text-purple-700 transition-colors uppercase tracking-widest font-mono">
                    查看狀態 :: UO615
                </a>
            </div>
        </div>
      </section>

      {/* Accommodations */}
      <section className="bg-white border border-slate-300 shadow-sm overflow-hidden">
        <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center gap-2">
            <Home className="text-indigo-600" size={16} />
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs font-mono">住宿據點</h3>
        </div>
        <div className="p-4 space-y-4">
            <div className="pb-3 border-b border-slate-100 border-dashed">
                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 border border-indigo-100 font-mono">第 1-2 天</span>
                <h4 className="font-bold text-slate-900 mt-2 font-sans">Violin Glamping & Caravan</h4>
                <p className="text-xs text-slate-500 mt-1 font-mono truncate">京畿道加平郡</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Violin+Glamping" target="_blank" className="text-[10px] text-slate-900 border-b border-slate-900 font-bold mt-2 inline-block hover:text-indigo-600 hover:border-indigo-600 font-mono uppercase">查看地圖</a>
            </div>
            <div>
                 <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-1.5 py-0.5 border border-purple-100 font-mono">第 3-4 天</span>
                <h4 className="font-bold text-slate-900 mt-2 font-sans">Hotel Lumia Myeongdong</h4>
                <p className="text-xs text-slate-500 mt-1 font-mono truncate">首爾中區退溪路</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Hotel+Lumia+Myeongdong" target="_blank" className="text-[10px] text-slate-900 border-b border-slate-900 font-bold mt-2 inline-block hover:text-purple-600 hover:border-purple-600 font-mono uppercase">查看地圖</a>
            </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="bg-white border border-slate-300 shadow-sm overflow-hidden">
        <div className="bg-rose-50 p-3 border-b border-rose-100 flex items-center gap-2">
            <AlertTriangle className="text-rose-600" size={16} />
            <h3 className="font-bold text-rose-900 uppercase tracking-widest text-xs font-mono">緊急聯絡</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase mb-1 font-mono">警察</span>
                <span className="text-xl font-black text-slate-900 font-mono">112</span>
            </div>
            <div className="bg-white border border-slate-200 p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase mb-1 font-mono">醫療/消防</span>
                <span className="text-xl font-black text-slate-900 font-mono">119</span>
            </div>
            <div className="bg-white border border-slate-200 p-3 flex flex-col items-center justify-center text-center col-span-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase mb-1 font-mono">韓國觀光熱線 (中文)</span>
                <div className="flex items-center gap-2 text-rose-600 font-bold">
                    <Phone size={16} />
                    <span className="text-lg font-mono">1330</span>
                </div>
            </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-white border border-slate-300 p-4 shadow-sm relative">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-slate-100 border-l-[40px] border-l-transparent"></div>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider font-mono">
            <FileText size={16} className="text-slate-400" /> 必備清單
        </h3>
        <ul className="space-y-2">
            {[
                '護照 (有效期6個月以上)',
                'K-ETA / Q-CODE',
                '國際駕照 + 駕照正本',
                '海外信用卡',
                'WOWPASS / T-Money 卡'
            ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600 font-mono border-b border-slate-50 pb-2 last:border-0">
                    <div className="w-1 h-1 bg-cyan-500"></div>
                    {item}
                </li>
            ))}
        </ul>
      </section>

    </div>
  );
};