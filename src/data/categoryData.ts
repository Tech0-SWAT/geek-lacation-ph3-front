export const categoryList = [
    "ハウススタジオ",
    "和風",
    "洋風",
    "一軒家",
    "マンション",
    "アパート",
    "オフィス",
    "執務室",
    "会議室",
    "ロビー",
    "商業施設",
    "ショッピングモール",
    "遊園地",
    "温泉",
    "水族館/動物園/植物園",
    "博物館/美術館",
    "映画館",
    "ボーリング/ゲームセンター/ビリヤード場",
    "商店街",
    "学校",
    "小学校",
    "中学校",
    "高校",
    "大学/専門学校",
    "幼稚園/保育園",
    "病院",
    "受付",
    "手術室",
    "店舗",
    "コンビニ",
    "ドラッグストア",
    "スーパー",
    "アパレル",
    "ガゾリンスタンド",
    "飲食店",
    "中華料理屋",
    "レストラン",
    "カフェ",
    "居酒屋",
    "食堂",
    "BAR",
    "自然",
    "山",
    "川",
    "海",
    "草原",
    "森",
    "湖/池",
    "花畑",
    "道",
    "その他",
    "駐車場",
    "屋上",
    "神社仏閣",
    "オープンスペース",
    "夜景/イルミネーション",
    "該当なし"
    ];

  const categoryGroupHeaders = [
  "ハウススタジオ", "オフィス", "商業施設", "学校", "病院",
  "店舗", "飲食店", "自然", "その他"
]

// 👇 自動的にグループ構造へ変換
export const categoryGroups = (() => {
  const groups: { group: string, items: string[] }[] = []
  let currentGroup: { group: string, items: string[] } | null = null

  for (const item of categoryList) {
    if (categoryGroupHeaders.includes(item)) {
      currentGroup = { group: item, items: [] }
      groups.push(currentGroup)
    } else if (currentGroup) {
      currentGroup.items.push(item)
    }
  }
  return groups
})()
