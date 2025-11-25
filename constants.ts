import { DayItinerary } from './types';

// Hardcoded flight times for notification logic (Year 2025 based on metadata)
export const FLIGHT_SCHEDULE = [
  {
    id: 'flight-outbound',
    title: '去程航班 (TW644)',
    type: 'departure', // relative to user leaving home, though itinerary lists arrival
    // Itinerary says Arrive 05:30. Assuming departure is ~4 hours prior or we notify based on Arrival time - 24h.
    // Let's set the target time to the Arrival time listed in itinerary for simplicity
    time: '2025-12-17T05:30:00', 
    message: '提醒：您的韓國之旅 (TW644) 即將在 24 小時內展開！請檢查護照與行李。'
  },
  {
    id: 'flight-inbound',
    title: '回程航班 (UO615)',
    type: 'return',
    time: '2025-12-21T02:20:00',
    message: '提醒：回程航班 (UO615) 將於 24 小時後起飛。請確認前往機場的交通安排。'
  }
];

export const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1,
    date: "12月17日 (週二)",
    title: "仁川抵達 & 行車",
    activities: [
      { id: "d1-1", time: "05:30", type: "flight", title: "抵達仁川機場 (ICN)", location: "Incheon International Airport", lat: 37.4602, lng: 126.4407 },
      { id: "d1-2", time: "06:30", type: "sightseeing", title: "Cimer SPA & 汗蒸幕", location: "Paradise City Cimer", details: "放鬆3小時，體驗韓式桑拿", lat: 37.4495, lng: 126.4267, aiData: {
        tips: ["建議攜帶泳衣以便使用水上樂園區域。", "入場後可先享受汗蒸幕，再前往放鬆池。", "注意不同區域的開放時間，以免錯過。"],
        mustEat: ["韓式烤雞蛋", "甜米露 (Sikhye)", "韓式炸豬排"],
        history: "Cimer SPA 結合了歐式風情與韓式傳統汗蒸幕文化，是仁川機場附近放鬆身心的絕佳去處。"
      }},
      { id: "d1-3", time: "10:00", type: "transport", title: "前往仁川市區", location: "Incheon", lat: 37.4563, lng: 126.7052 },
      { id: "d1-4", time: "10:45", type: "sightseeing", title: "松島中央公園 / 新浦市場", location: "Songdo Central Park", lat: 37.3928, lng: 126.6343, aiData: {
        tips: ["建議租借自行車環湖遊覽。", "傍晚時分夜景尤為迷人。", "可搭乘水上計程車欣賞公園全景。"],
        mustEat: ["松島排骨", "新浦炸雞", "韓式炸醬麵"],
        history: "松島中央公園是韓國首座海水公園，展現了仁川作為國際城市的現代化面貌與生態友好設計。"
      }},
      { id: "d1-5", time: "14:00", type: "transport", title: "取車 (租車)", location: "Incheon Rent-a-car", details: "檢查國際駕照與護照", lat: 37.4563, lng: 126.7052 },
      { id: "d1-6", time: "15:30", type: "transport", title: "自駕前往加平", location: "Gapyeong-gun", lat: 37.8315, lng: 127.5097 },
      { id: "d1-7", time: "17:15", type: "stay", title: "入住 Violin Glamping", location: "Violin Glamping & Caravan", lat: 37.8765, lng: 127.5087 },
      { id: "d1-8", time: "19:00", type: "food", title: "營地 BBQ 晚餐", location: "Violin Glamping & Caravan", lat: 37.8765, lng: 127.5087 },
    ]
  },
  {
    day: 2,
    date: "12月18日 (週三)",
    title: "南怡島 & 小法國村 & 晨靜樹木園",
    activities: [
      { id: "d2-1", time: "09:30", type: "transport", title: "抵達南怡島碼頭", location: "Nami Island Wharf", lat: 37.7913, lng: 127.5256 },
      { id: "d2-2", time: "10:00", type: "sightseeing", title: "南怡島遊覽", location: "Nami Island", details: "遊覽約3小時", lat: 37.7913, lng: 127.5256, aiData: {
        tips: ["建議早起前往以避開人潮。", "秋季銀杏與冬季雪景最為著名。", "島上設有高空飛索可體驗刺激入島方式。"],
        mustEat: ["懷舊便當", "雪人糖餅", "炭火雞排"],
        history: "南怡島因韓劇《冬季戀歌》而聞名，是座充滿浪漫氛圍的半月形島嶼，宣導環保與童話想像。"
      }},
      { id: "d2-3", time: "13:00", type: "food", title: "午餐：春川辣炒雞", location: "Nami Island Dakgalbi", details: "必吃春川辣炒雞排", lat: 37.7913, lng: 127.5256, aiData: {
        tips: ["建議加點起司與炒飯，風味更佳。", "食用時可穿上店家提供的圍裙防止醬汁噴濺。", "搭配清爽的蕎麥麵 (Makguksu) 非常解膩。"],
        mustEat: ["鐵板辣炒雞排", "蕎麥冷麵", "炒飯"],
        history: "春川是辣炒雞排的發源地，這道料理起初是作為庶民的下酒菜，如今已成為韓國代表性的美食之一。"
      }},
      { id: "d2-4", time: "13:45", type: "transport", title: "前往小法國村", location: "Petite France", lat: 37.7153, lng: 127.4906 },
      { id: "d2-5", time: "14:15", type: "sightseeing", title: "小法國村遊覽", location: "Petite France", details: "約2小時", lat: 37.7153, lng: 127.4906, aiData: {
        tips: ["建議查閱表演時間表，觀賞木偶劇。", "色彩繽紛的建築非常適合拍照。", "可順道參觀旁邊的義大利村。"],
        mustEat: ["法式薄餅", "香草冰淇淋", "歐式咖啡"],
        history: "小法國村是以《小王子》為主題的法國文化村，充滿異國風情，也是多部熱門韓劇的拍攝地。"
      }},
      { id: "d2-6", time: "16:15", type: "transport", title: "前往晨靜樹木園", location: "The Garden of Morning Calm", lat: 37.7438, lng: 127.3526 },
      { id: "d2-7", time: "17:00", type: "sightseeing", title: "晨靜樹木園 (五色星光庭園展)", location: "The Garden of Morning Calm", lat: 37.7438, lng: 127.3526, aiData: {
        tips: ["冬季夜間燈飾展非常熱門，建議傍晚前抵達。", "園區較大，建議穿著保暖且好走的鞋子。", "主要拍照點位於下景庭園。"],
        mustEat: ["松子豆腐鍋", "韓式拌飯", "園內咖啡廳甜點"],
        history: "晨靜樹木園由韓尚慶教授創立，旨在展現韓國庭園的曲線美與非對稱美，四季皆有不同風貌。"
      }},
      { id: "d2-8", time: "19:30", type: "food", title: "晚餐 & 返回露營地", location: "Gapyeong", details: "附近餐廳或自理", lat: 37.8315, lng: 127.5097 },
    ]
  },
  {
    day: 3,
    date: "12月19日 (週四)",
    title: "鐵道自行車 & 首爾",
    activities: [
      { id: "d3-1", time: "07:30", type: "stay", title: "打包 & 提早退房", location: "Violin Glamping", lat: 37.8765, lng: 127.5087 },
      { id: "d3-2", time: "09:30", type: "transport", title: "抵達加平鐵道自行車", location: "Gapyeong Rail Park", lat: 37.8327, lng: 127.5110 },
      { id: "d3-3", time: "10:00", type: "sightseeing", title: "鐵道自行車體驗", location: "Gapyeong Rail Park", details: "約1.5小時", lat: 37.8327, lng: 127.5110, aiData: {
        tips: ["建議提前預約，以免現場票售罄。", "冬天騎行風大，請務必戴手套和帽子。", "路線包含穿越北漢江鐵橋，風景壯麗。"],
        mustEat: ["加平松子餅", "熱魚板湯", "便利店熱飲"],
        history: "利用舊京春線鐵軌改建的鐵道自行車，讓遊客能在騎行中欣賞北漢江的秀麗山水。"
      }},
      { id: "d3-4", time: "11:30", type: "transport", title: "自駕前往首爾", location: "Seoul", lat: 37.5665, lng: 126.9780 },
      { id: "d3-5", time: "13:30", type: "food", title: "午餐：高速公路休息站", location: "Gapyeong Rest Area", details: "推薦烏龍麵/熱狗/馬鈴薯", lat: 37.8100, lng: 127.4500, aiData: {
        tips: ["使用自助點餐機 (Kiosk) 點餐，部分支援中文。", "用餐完畢請自行回收餐盤。", "這是體驗韓國獨特休息站文化的好機會。"],
        mustEat: ["韓式烏龍麵", "Sotteok Sotteok (年糕熱狗串)", "核桃餅"],
        history: "韓國的高速公路休息站以乾淨、便利且美食眾多聞名，許多綜藝節目如《全知干預視角》都曾介紹過。"
      }},
      { id: "d3-6", time: "14:30", type: "sightseeing", title: "北村韓屋村", location: "Bukchon Hanok Village", details: "約2小時", lat: 37.5826, lng: 126.9836, aiData: {
        tips: ["請保持安靜，因該區域仍有居民居住。", "建議租借韓服拍照，更具氛圍。", "北村八景中以嘉會洞小巷景色最為經典。"],
        mustEat: ["三清洞麵疙瘩", "北村手工餃子", "傳統茶屋茶點"],
        history: "北村韓屋村擁有600年歷史，曾是朝鮮時代王族與高官的居住地，保存了完整的傳統韓屋建築群。"
      }},
      { id: "d3-7", time: "16:30", type: "transport", title: "前往首爾站還車", location: "Seoul Station Lotte Rent-a-car", lat: 37.5550, lng: 126.9708 },
      { id: "d3-8", time: "19:00", type: "transport", title: "還車 (準時!)", location: "Seoul Station", details: "檢查油箱是否加滿", lat: 37.5550, lng: 126.9708 },
      { id: "d3-9", time: "19:30", type: "stay", title: "入住 Hotel Lumia", location: "Hotel Lumia Myeongdong", lat: 37.5580, lng: 126.9800 },
      { id: "d3-10", time: "20:30", type: "food", title: "明洞晚餐", location: "Myeongdong", lat: 37.5636, lng: 126.9830 },
    ]
  },
  {
    day: 4,
    date: "12月20日 (週五)",
    title: "首爾市區探索",
    activities: [
      { id: "d4-1", time: "10:00", type: "sightseeing", title: "景福宮 (守門將換崗)", location: "Gyeongbokgung Palace", details: "觀看衛兵交接儀式", lat: 37.5796, lng: 126.9770, aiData: {
        tips: ["穿著韓服可免費入場。", "守門將換崗儀式分別在10:00和14:00舉行。", "勤政殿與慶會樓是必拍景點。"],
        mustEat: ["土俗村蔘雞湯", "通仁市場油亮炒年糕", "韓式傳統定食"],
        history: "景福宮是朝鮮王朝的法宮，建於1395年，見證了朝鮮五百年的歷史興衰，是首爾最具代表性的古蹟。"
      }},
      { id: "d4-2", time: "12:30", type: "sightseeing", title: "仁寺洞 (傳統工藝)", location: "Insadong", lat: 37.5743, lng: 126.9860, aiData: {
        tips: ["人人廣場 (Ssamzigil) 結構獨特，值得一逛。", "巷弄間隱藏許多傳統茶屋。", "適合購買具有韓國特色的紀念品。"],
        mustEat: ["黑糖餅 (糖餡餅)", "傳統紅豆冰", "韓式宮廷料理"],
        history: "仁寺洞自古以來便是藝術家與文人的聚集地，現今仍保留著濃厚的傳統文化氣息與古董街風貌。"
      }},
      { id: "d4-3", time: "13:00", type: "food", title: "午餐：土俗村蔘雞湯", location: "Tosokchon Samgyetang", lat: 37.5779, lng: 126.9717, aiData: {
        tips: ["用餐高峰時段需排隊，建議提早前往。", "每桌提供免費的人蔘酒一杯。", "泡菜與醃蘿蔔在桌上甕中，可無限取用。"],
        mustEat: ["傳統蔘雞湯", "海鮮煎餅", "電烤雞"],
        history: "位於景福宮旁的知名老店，以濃郁的人蔘雞湯聞名，也是韓國歷任總統經常光顧的名店。"
      }},
      { id: "d4-4", time: "15:00", type: "sightseeing", title: "明洞購物 & 街頭小吃", location: "Myeongdong Shopping Street", lat: 37.5636, lng: 126.9830, aiData: {
        tips: ["美妝店常有促銷活動，可多方比價。", "街頭小吃攤販大多下午才開始營業。", "換錢所匯率通常較好。"],
        mustEat: ["明洞餃子", "烤龍蝦", "32公分霜淇淋"],
        history: "明洞是首爾的購物與時尚中心，集結了各大百貨與潮流品牌，也是外國遊客最喜愛的觀光熱點之一。"
      }},
      { id: "d4-5", time: "19:00", type: "food", title: "晚餐：王妃家烤肉", location: "Wangbijib Myeongdong Main Store", lat: 37.5615, lng: 126.9855, aiData: {
        tips: ["建議事先訂位，以免現場久候。", "全程有專人協助烤肉，不需動手。", "午餐定食CP值很高，晚餐則適合單點享用肉品。"],
        mustEat: ["調味牛排", "五花肉", "韓式拌冷麵"],
        history: "王妃家是明洞地區評價極高的連鎖烤肉店，以優質肉品與貼心的桌邊服務深受遊客歡迎。"
      }},
      { id: "d4-6", time: "20:30", type: "sightseeing", title: "N首爾塔夜景", location: "N Seoul Tower", lat: 37.5512, lng: 126.9882, aiData: {
        tips: ["建議搭乘南山纜車上山。", "愛情鎖牆是情侶必訪之地。", "黃昏時刻前往可同時欣賞日落與夜景。"],
        mustEat: ["南山大豬排", "首爾塔旋轉餐廳晚餐", "吉事果 (Churros)"],
        history: "N首爾塔位於南山之巔，是首爾的地標性建築，提供360度俯瞰首爾市區的絕佳視野。"
      }},
      { id: "d4-7", time: "22:00", type: "transport", title: "前往仁川機場 (深夜巴士/快線)", location: "Incheon International Airport", lat: 37.4602, lng: 126.4407 },
    ]
  },
  {
    day: 5,
    date: "12月21日 (週六)",
    title: "返程",
    activities: [
      { id: "d5-1", time: "02:20", type: "flight", title: "航班起飛", location: "Incheon International Airport", lat: 37.4602, lng: 126.4407 },
    ]
  }
];