import { useState } from "react";

export default function Home() {
  const [weeklyData, setWeeklyData] = useState([
    { week: 1, dungeon: 15, bonus: 0, exchange: 120 },
    { week: 2, dungeon: 20, bonus: 10, exchange: 120 },
    { week: 3, dungeon: 30, bonus: 20, exchange: 120 },
    { week: 4, dungeon: 30, bonus: 30, exchange: 120 },
    { week: 5, dungeon: 30, bonus: 30, exchange: 120 },
  ]);

  const [currentTotal, setCurrentTotal] = useState(0);
  const requiredForUnlock = 1200;

  const totalEarned = weeklyData.reduce(
    (acc, w) => acc + w.dungeon + w.bonus + w.exchange,
    0
  );

  const remainingToUnlock = Math.max(0, requiredForUnlock - currentTotal);

  const shopItems = [
    { category: "룬", name: "심연의 소원 항아리+: 무기 룬", cost: 900 },
    { category: "룬", name: "심연의 소원 항아리+: 방어구 룬", cost: 600 },
    { category: "룬", name: "심연의 소원 항아리+: 엠블럼 룬", cost: 900, requireUnlock: true },
    { category: "패션 장비", name: "로스트 문스케이프 예복 (여성용)", cost: 630 },
    { category: "패션 장비", name: "로스트 문스케이프 예복 (남성용)", cost: 630 },
    { category: "패션 장비", name: "로스트 문스케이프 부츠 (여성용)", cost: 420 },
    { category: "패션 장비", name: "로스트 문스케이프 부츠 (남성용)", cost: 420 },
    { category: "패션 장비", name: "로스트 문스케이프 글러브", cost: 420 },
    { category: "패션 장비", name: "로스트 문스케이프 햇", cost: 630 },
    { category: "소모품", name: "심연의 소원 항아리+", cost: 10 },
    { category: "소모품", name: "인챈트 스크롤: 폭스", cost: 400 },
  ];

  return (
    <main className="min-h-screen p-6 bg-pink-50 text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-8 bg-pink-100 p-4 rounded-xl shadow">
          🎀 아이템 트래커
        </h1>

        <div className="mb-6 p-5 bg-white rounded-xl shadow">
          <label className="block mb-2 font-medium text-gray-700">현재 보유한 아이템 개수:</label>
          <input
            type="number"
            className="w-full border border-pink-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={currentTotal}
            onChange={(e) => setCurrentTotal(Number(e.target.value))}
          />
        </div>

        <div className="mb-10 p-5 bg-white rounded-xl shadow">
          <label className="block mb-2 font-medium text-gray-700">해금 조건 아이템 수 (고정값):</label>
          <input
            type="number"
            className="w-full border border-gray-300 px-4 py-3 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            value={requiredForUnlock}
            disabled
          />
        </div>

        <h2 className="text-2xl font-semibold text-pink-500 mb-4">🛍️ 상점 아이템</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-base text-gray-800 table-auto">
            <thead>
              <tr className="bg-pink-100 text-pink-700">
                <th className="border-b p-4 text-left">카테고리</th>
                <th className="border-b p-4 text-left">아이템 이름</th>
                <th className="border-b p-4 text-right">필요 수량</th>
                <th className="border-b p-4 text-center">구매 가능 여부</th>
              </tr>
            </thead>
            <tbody>
              {shopItems.map((item, idx) => {
                const canUnlock = !item.requireUnlock || currentTotal >= requiredForUnlock;
                const isPurchasable = canUnlock && currentTotal >= item.cost;
                const shortage = currentTotal < item.cost ? item.cost - currentTotal : 0;
                return (
                  <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-pink-50"} align-top`}>
                    <td className="px-6 py-5 whitespace-nowrap text-lg">{item.category}</td>
                    <td className="px-6 py-5 whitespace-pre-wrap font-medium text-lg leading-relaxed">{item.name}</td>
                    <td className="px-6 py-5 text-right whitespace-nowrap text-lg">{item.cost}</td>
                    <td className="px-6 py-5 text-center text-lg">
                      {isPurchasable
                        ? "✅ 구매 가능"
                        : !canUnlock
                        ? `🔒 해금 필요 (${requiredForUnlock - currentTotal}개 부족)`
                        : `${shortage}개 부족`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
