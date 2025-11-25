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
            Data Bank
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
                <> <BellRing size={14} /> Alerts Active </>
            ) : (
                <> <Bell size={14} /> Enable Alerts </>
            )}
        </button>
      </div>

      {/* Flights */}
      <section className="bg-white border border-slate-300 shadow-sm overflow-hidden group">
        <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_25%,rgba(6,182,212,0.05)_50%,transparent_50%,transparent_75%,rgba(6,182,212,0.05)_75%,rgba(6,182,212,0.05)_100%)] bg-[size:20px_20px] p-3 border-b border-slate-200 flex items-center gap-2">
            <Plane className="text-cyan-600" size={16} />
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs font-mono">Flight Trajectory</h3>
        </div>
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Outbound [TW644]</span>
                    <div className="font-black text-slate-900 text-lg tracking-tight font-sans">HKG ➝ ICN</div>
                    <div className="text-xs text-slate-500 font-mono">Dec 17 @ 05:30 ARR</div>
                </div>
                <div className="text-right">
                    <span className="border border-slate-200 text-slate-600 text-[10px] px-2 py-1 uppercase font-bold font-mono">T'way Air</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Inbound [UO615]</span>
                    <div className="font-black text-slate-900 text-lg tracking-tight font-sans">ICN ➝ HKG</div>
                    <div className="text-xs text-slate-500 font-mono">Dec 21 @ 02:20 DEP</div>
                </div>
                <div className="text-right">
                    <span className="border border-slate-200 text-slate-600 text-[10px] px-2 py-1 uppercase font-bold font-mono">HK Express</span>
                </div>
            </div>
            
            <div className="pt-2 flex gap-2">
                <a href="https://www.google.com/search?q=TW644+status" target="_blank" className="flex-1 text-center text-[10px] font-bold text-slate-700 border border-slate-300 bg-slate-50 py-2 hover:bg-slate-100 hover:border-cyan-400 hover:text-cyan-700 transition-colors uppercase tracking-widest font-mono">
                    Check Status :: TW644
                </a>
                <a href="https://www.google.com/search?q=UO615+status" target="_blank" className="flex-1 text-center text-[10px] font-bold text-slate-700 border border-slate-300 bg-slate-50 py-2 hover:bg-slate-100 hover:border-purple-400 hover:text-purple-700 transition-colors uppercase tracking-widest font-mono">
                    Check Status :: UO615
                </a>
            </div>
        </div>
      </section>

      {/* Accommodations */}
      <section className="bg-white border border-slate-300 shadow-sm overflow-hidden">
        <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center gap-2">
            <Home className="text-indigo-600" size={16} />
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs font-mono">Habitat Coordinates</h3>
        </div>
        <div className="p-4 space-y-4">
            <div className="pb-3 border-b border-slate-100 border-dashed">
                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 border border-indigo-100 font-mono">DAYS 1-2</span>
                <h4 className="font-bold text-slate-900 mt-2 font-sans">Violin Glamping & Caravan</h4>
                <p className="text-xs text-slate-500 mt-1 font-mono truncate">Gyeonggi-do, Gapyeong-gun...</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Violin+Glamping" target="_blank" className="text-[10px] text-slate-900 border-b border-slate-900 font-bold mt-2 inline-block hover:text-indigo-600 hover:border-indigo-600 font-mono uppercase">Locate on Map</a>
            </div>
            <div>
                 <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-1.5 py-0.5 border border-purple-100 font-mono">DAYS 3-4</span>
                <h4 className="font-bold text-slate-900 mt-2 font-sans">Hotel Lumia Myeongdong</h4>
                <p className="text-xs text-slate-500 mt-1 font-mono truncate">Seoul, Jung-gu, Toegye-ro</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Hotel+Lumia+Myeongdong" target="_blank" className="text-[10px] text-slate-900 border-b border-slate-900 font-bold mt-2 inline-block hover:text-purple-600 hover:border-purple-600 font-mono uppercase">Locate on Map</a>
            </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="bg-white border border-slate-300 shadow-sm overflow-hidden">
        <div className="bg-rose-50 p-3 border-b border-rose-100 flex items-center gap-2">
            <AlertTriangle className="text-rose-600" size={16} />
            <h3 className="font-bold text-rose-900 uppercase tracking-widest text-xs font-mono">Emergency Protocols</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase mb-1 font-mono">Police</span>
                <span className="text-xl font-black text-slate-900 font-mono">112</span>
            </div>
            <div className="bg-white border border-slate-200 p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase mb-1 font-mono">Medical</span>
                <span className="text-xl font-black text-slate-900 font-mono">119</span>
            </div>
            <div className="bg-white border border-slate-200 p-3 flex flex-col items-center justify-center text-center col-span-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase mb-1 font-mono">Tourist Helpline (Multi-lang)</span>
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
            <FileText size={16} className="text-slate-400" /> Mandatory Assets
        </h3>
        <ul className="space-y-2">
            {[
                'Passport (6m+ validity)',
                'K-ETA / Q-CODE',
                'Intl Driving Permit + Original',
                'Credit Card (Overseas)',
                'WOWPASS / T-Money'
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