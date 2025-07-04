"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Coins, Lock, ShoppingBag, Sparkles, Sword, Shield, Gem } from "lucide-react"

export default function Home() {
  const [weeklyData, setWeeklyData] = useState([
    { week: 1, dungeon: 15, bonus: 0, exchange: 120 },
    { week: 2, dungeon: 20, bonus: 10, exchange: 120 },
    { week: 3, dungeon: 30, bonus: 20, exchange: 120 },
    { week: 4, dungeon: 30, bonus: 30, exchange: 120 },
    { week: 5, dungeon: 30, bonus: 30, exchange: 120 },
  ])

  const [currentTotal, setCurrentTotal] = useState(0)
  const requiredForUnlock = 1200
  const totalEarned = weeklyData.reduce((acc, w) => acc + w.dungeon + w.bonus + w.exchange, 0)
  const remainingToUnlock = Math.max(0, requiredForUnlock - currentTotal)

  const shopItems = [
    {
      category: "룬",
      name: "심연의 소원 항아리+: 무기 룬",
      cost: 900,
      icon: Sword,
      rarity: "legendary",
    },
    {
      category: "룬",
      name: "심연의 소원 항아리+: 방어구 룬",
      cost: 600,
      icon: Shield,
      rarity: "epic",
    },
    {
      category: "룬",
      name: "심연의 소원 항아리+: 엠블럼 룬",
      cost: 900,
      requireUnlock: true,
      icon: Gem,
      rarity: "legendary",
    },
    {
      category: "패션 장비",
      name: "로스트 문스케이프 예복 (여성용)",
      cost: 630,
      icon: Sparkles,
      rarity: "rare",
    },
    {
      category: "패션 장비",
      name: "로스트 문스케이프 예복 (남성용)",
      cost: 630,
      icon: Sparkles,
      rarity: "rare",
    },
    {
      category: "패션 장비",
      name: "로스트 문스케이프 부츠 (여성용)",
      cost: 420,
      icon: Sparkles,
      rarity: "uncommon",
    },
    {
      category: "패션 장비",
      name: "로스트 문스케이프 부츠 (남성용)",
      cost: 420,
      icon: Sparkles,
      rarity: "uncommon",
    },
    {
      category: "패션 장비",
      name: "로스트 문스케이프 글러브",
      cost: 420,
      icon: Sparkles,
      rarity: "uncommon",
    },
    {
      category: "패션 장비",
      name: "로스트 문스케이프 햇",
      cost: 630,
      icon: Sparkles,
      rarity: "rare",
    },
    {
      category: "소모품",
      name: "심연의 소원 항아리+",
      cost: 10,
      icon: Coins,
      rarity: "common",
    },
    {
      category: "소모품",
      name: "인챈트 스크롤: 폭스",
      cost: 400,
      icon: Coins,
      rarity: "uncommon",
    },
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500"
      case "epic":
        return "from-purple-400 to-pink-500"
      case "rare":
        return "from-blue-400 to-cyan-500"
      case "uncommon":
        return "from-green-400 to-emerald-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const getRarityBadgeColor = (rarity) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
      case "uncommon":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            ⚔️ 붉은 심연의 화석 교환소
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-200 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                현재 보유 아이템
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                className="bg-slate-700/50 border-slate-600 text-white text-xl font-bold h-12"
                value={currentTotal}
                onChange={(e) => setCurrentTotal(Number(e.target.value))}
                placeholder="보유 화석 수를 입력하세요"
              />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-200 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                심연의 소원 항아리+: 엠블럼 룬 해금 조건
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-2">{requiredForUnlock.toLocaleString()}개</div>
              {remainingToUnlock > 0 && (
                <div className="text-sm text-slate-400">해금까지 {remainingToUnlock.toLocaleString()}개 필요</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Shop Items */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-200 flex items-center gap-2 text-2xl">
              <ShoppingBag className="w-6 h-6 text-emerald-400" />
              상점 아이템
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid gap-4 p-6">
              {shopItems.map((item, idx) => {
                const canUnlock = !item.requireUnlock || currentTotal >= requiredForUnlock
                const isPurchasable = canUnlock && currentTotal >= item.cost
                const shortage = currentTotal < item.cost ? item.cost - currentTotal : 0
                const IconComponent = item.icon

                return (
                  <Card
                    key={idx}
                    className={`bg-slate-700/30 border-slate-600 transition-all duration-300 hover:scale-[1.02] ${
                      isPurchasable ? "hover:border-emerald-500/50 hover:shadow-emerald-500/20 hover:shadow-lg" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-br ${getRarityColor(item.rarity)} flex-shrink-0`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs border-slate-500 text-slate-300">
                                {item.category}
                              </Badge>
                              <Badge className={`text-xs ${getRarityBadgeColor(item.rarity)} border-0`}>
                                {item.rarity}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-slate-200 text-sm md:text-base leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <Coins className="w-4 h-4 text-yellow-400" />
                              <span className="text-yellow-400 font-bold">{item.cost.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          {isPurchasable ? (
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">✅ 구매 가능</Badge>
                          ) : !canUnlock ? (
                            <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                              🔒 해금 필요
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-slate-500 text-slate-400">
                              {shortage.toLocaleString()}개 부족
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
