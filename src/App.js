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
  const [requiredForUnlock, setRequiredForUnlock] = useState(1200);
  const [requiredForItem, setRequiredForItem] = useState(900);

  const totalEarned = weeklyData.reduce(
    (acc, w) => acc + w.dungeon + w.bonus + w.exchange,
    0
  );

  const remainingToUnlock = Math.max(0, requiredForUnlock - currentTotal);
  const remainingToItem = Math.max(0, requiredForItem - Math.max(0, currentTotal - requiredForUnlock));

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
    <main className="min-h-screen p-4 bg-gray-50 text-gray-900">
      <div className="max-w-2xl mx-auto overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4">아이템 트래커</h1>

        <div className="mb-6">
          <label className="block mb-1 font-medium">현재 보유한 아이템 개수:</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={currentTotal}
            onChange={(e) => setCurrentTotal(Number(e.target.value))}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">해금 조건 아이템 수:</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={requiredForUnlock}
            onChange={(e) => setRequiredForUnlock(Number(e.target.value))}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">원하는 아이템 필요 수량:</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={requiredForItem}
            onChange={(e) => setRequiredForItem(Number(e.target.value))}
          />
        </div>

        <table className="w-full text-sm border min-w-[600px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">주차</th>
              <th className="border p-2">던전 획득</th>
              <th className="border p-2">추가 보상</th>
              <th className="border p-2">교환 획득</th>
              <th className="border p-2">총합</th>
            </tr>
          </thead>
          <tbody>
            {weeklyData.map((week) => (
              <tr key={week.week} className="text-center">
                <td className="border p-2">{week.week}주차</td>
                <td className="border p-2">{week.dungeon}</td>
                <td className="border p-2">{week.bonus}</td>
                <td className="border p-2">{week.exchange}</td>
                <td className="border p-2">
                  {week.dungeon + week.bonus + week.exchange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-base">
          <p>총 누적 획득량: <strong>{totalEarned}</strong>개</p>
          <p className="mt-1">해금까지 남은 개수: <strong>{remainingToUnlock}</strong>개</p>
          <p className="mt-1">아이템까지 남은 개수: <strong>{remainingToItem}</strong>개</p>
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-4">상점 아이템</h2>
        <table className="w-full text-sm border min-w-[600px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">카테고리</th>
              <th className="border p-2">아이템 이름</th>
              <th className="border p-2">필요 수량</th>
              <th className="border p-2">구매 가능 여부</th>
            </tr>
          </thead>
          <tbody>
            {shopItems.map((item, idx) => {
              const canUnlock = !item.requireUnlock || currentTotal >= requiredForUnlock;
              const isPurchasable = canUnlock && currentTotal >= item.cost;
              return (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.cost}</td>
                  <td className="border p-2">
                    {isPurchasable ? "✅ 구매 가능" : !canUnlock ? `🔒 해금 필요 (${requiredForUnlock - currentTotal}개 부족)` : `${item.cost - currentTotal}개 부족`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
