import React, { useState } from "react";

const startDate = new Date("2025-07-07");

function getWeekRange(week) {
  const start = new Date(startDate);
  start.setDate(start.getDate() + (week - 1) * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return `${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`;
}

function calculateWeeklyRewards(week) {
  if (week === 1) return { dungeon: 15, bonus: 0, exchange: 120 };
  if (week === 2) return { dungeon: 20, bonus: 10, exchange: 120 };
  if (week === 3) return { dungeon: 30, bonus: 20, exchange: 120 };
  return { dungeon: 30, bonus: 30, exchange: 120 };
}

export default function App() {
  const weeks = 13;
  const [completedWeeks, setCompletedWeeks] = useState(Array(weeks).fill(false));

  const rewards = [];
  for (let i = 1; i <= weeks; i++) {
    rewards.push(calculateWeeklyRewards(i));
  }

  const weeklyTotals = rewards.map(r => r.dungeon + r.bonus + r.exchange);

  const cumulativeTotals = weeklyTotals.reduce((acc, curr, idx) => {
    if (idx === 0) acc.push(curr);
    else acc.push(acc[idx - 1] + curr);
    return acc;
  }, []);

  const toggleComplete = idx => {
    const newCompleted = [...completedWeeks];
    newCompleted[idx] = !newCompleted[idx];
    setCompletedWeeks(newCompleted);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h1>아이템 획득 진행 상황 트래커</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>주차</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>기간</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>던전 획득</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>추가 보상</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>교환 보상</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>주차 합계</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>누적 합계</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>완료</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((r, idx) => (
            <tr
              key={idx}
              style={{ backgroundColor: completedWeeks[idx] ? "#d4edda" : "white" }}
            >
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{idx + 1}주차</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                {getWeekRange(idx + 1)}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{r.dungeon}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{r.bonus}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{r.exchange}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{weeklyTotals[idx]}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{cumulativeTotals[idx]}</td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={completedWeeks[idx]}
                  onChange={() => toggleComplete(idx)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: 20, fontWeight: "bold" }}>
        <span>현재 누적 수량: {cumulativeTotals[cumulativeTotals.length - 1]}</span>
        <br />
        <span>조건 달성 목표: 2100개</span>
      </p>
    </div>
  );
}
