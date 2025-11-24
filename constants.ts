import { DayItinerary } from './types';

export const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1,
    date: "12月17日 (週二)",
    title: "仁川抵達 & 露營",
    activities: [
      { id: "d1-1", time: "05:30", type: "flight", title: "抵達仁川機場 (ICN)", location: "Incheon International Airport", lat: 37.4602, lng: 126.4407 },
      { id: "d1-2", time: "06:30", type: "sightseeing", title: "Cimer SPA & 汗蒸幕", location: "Paradise City Cimer", details: "放鬆3小時，體驗韓式桑拿", lat: 37.4495, lng: 126.4267 },
      { id: "d1-3", time: "10:00", type: "transport", title: "前往仁川市區", location: "Incheon", lat: 37.4563, lng: 126.7052 },
      { id: "d1-4", time: "10:45", type: "sightseeing", title: "松島中央公園 / 新浦市場", location: "Songdo Central Park", lat: 37.3928, lng: 126.6343 },
      { id: "d1-5", time: "14:00", type: "transport", title: "取車 (租車)", location: "Incheon Rent-a-car", details: "檢查國際駕照與護照", lat: 37.4563, lng: 126.7052 },
      { id: "d1-6", time: "15:30", type: "transport", title: "自駕前往加平", location: "Gapyeong-gun", lat: 37.8315, lng: 127.5097 },
      { id: "d1-7", time: "17:15", type: "stay", title: "入住 Violin Glamping", location: "Violin Glamping & Caravan", lat: 37.8765, lng: 127.5087 },
      { id: "d1-8", time: "19:00", type: "food", title: "營地 BBQ 晚餐", location: "Violin Glamping & Caravan", lat: 37.8765, lng: 127.5087 },
    ]
  },
  {
    day: 2,
    date: "12月18日 (週三)",
    title: "南怡島 & 晨靜樹木園",
    activities: [
      { id: "d2-1", time: "09:30", type: "transport", title: "抵達南怡島碼頭", location: "Nami Island Wharf", lat: 37.7913, lng: 127.5256 },
      { id: "d2-2", time: "10:00", type: "sightseeing", title: "南怡島遊覽", location: "Nami Island", details: "遊覽約3小時", lat: 37.7913, lng: 127.5256 },
      { id: "d2-3", time: "13:00", type: "food", title: "午餐：春川辣炒雞", location: "Nami Island Dakgalbi", details: "必吃春川辣炒雞排", lat: 37.7913, lng: 127.5256 },
      { id: "d2-4", time: "13:45", type: "transport", title: "前往小法國村", location: "Petite France", lat: 37.7153, lng: 127.4906 },
      { id: "d2-5", time: "14:15", type: "sightseeing", title: "小法國村遊覽", location: "Petite France", details: "約2小時", lat: 37.7153, lng: 127.4906 },
      { id: "d2-6", time: "16:15", type: "transport", title: "前往晨靜樹木園", location: "The Garden of Morning Calm", lat: 37.7438, lng: 127.3526 },
      { id: "d2-7", time: "17:00", type: "sightseeing", title: "晨靜樹木園 (五色星光庭園展)", location: "The Garden of Morning Calm", lat: 37.7438, lng: 127.3526 },
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
      { id: "d3-3", time: "10:00", type: "sightseeing", title: "鐵道自行車體驗", location: "Gapyeong Rail Park", details: "約1.5小時", lat: 37.8327, lng: 127.5110 },
      { id: "d3-4", time: "11:30", type: "transport", title: "自駕前往首爾", location: "Seoul", lat: 37.5665, lng: 126.9780 },
      { id: "d3-5", time: "13:30", type: "food", title: "午餐：高速公路休息站", location: "Gapyeong Rest Area", details: "推薦烏龍麵/熱狗/馬鈴薯", lat: 37.8100, lng: 127.4500 },
      { id: "d3-6", time: "14:30", type: "sightseeing", title: "北村韓屋村", location: "Bukchon Hanok Village", details: "約2小時", lat: 37.5826, lng: 126.9836 },
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
      { id: "d4-1", time: "10:00", type: "sightseeing", title: "景福宮 (守門將換崗)", location: "Gyeongbokgung Palace", details: "觀看衛兵交接儀式", lat: 37.5796, lng: 126.9770 },
      { id: "d4-2", time: "12:30", type: "sightseeing", title: "仁寺洞 (傳統工藝)", location: "Insadong", lat: 37.5743, lng: 126.9860 },
      { id: "d4-3", time: "13:00", type: "food", title: "午餐：土俗村蔘雞湯", location: "Tosokchon Samgyetang", lat: 37.5779, lng: 126.9717 },
      { id: "d4-4", time: "15:00", type: "sightseeing", title: "明洞購物 & 街頭小吃", location: "Myeongdong Shopping Street", lat: 37.5636, lng: 126.9830 },
      { id: "d4-5", time: "19:00", type: "food", title: "晚餐：王妃家烤肉", location: "Wangbijib Myeongdong Main Store", lat: 37.5615, lng: 126.9855 },
      { id: "d4-6", time: "20:30", type: "sightseeing", title: "N首爾塔夜景", location: "N Seoul Tower", lat: 37.5512, lng: 126.9882 },
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