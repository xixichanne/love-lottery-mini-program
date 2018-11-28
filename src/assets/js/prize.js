var prizeList = [] // 奖品列表

const cosmeticList = [
  {
    name: 'Dior 620唇釉' // 奖品名称
  },
  {
    name: 'Dior Lip Tatoo #421'
  },
  {
    name: 'Dior 黑管740'
  },
  {
    name: 'Mac Chili'
  },
  {
    name: 'Mac Marrakesh'
  },
  {
    name: 'Mac Dubonnet'
  },
  {
    name: 'Mac Double Gleam'
  },
  {
    name: 'Mac Paramount'
  },
  {
    name: 'Becca Moonstone'
  },
  {
    name: 'Becca Champagne pop'
  },
  {
    name: 'Becca 水散粉'
  },
  {
    name: 'Huda Beauty Nude眼影'
  },
  {
    name: '易趣豆'
  }
]
const activityList = [
  {
    name: '火锅一顿' // 奖品名称
  },
  {
    name: '日料一顿'
  },
  {
    name: '西餐一顿'
  },
  {
    name: '烤肉一顿'
  },
  {
    name: '迪士尼一日游'
  },
  {
    name: '做一日家务'
  },
  {
    name: '陪逛街一整天'
  },
  {
    name: '陪做美甲💅'
  },
  {
    name: '一星期奶茶伺候'
  },
  {
    name: '亲一口'
  },
  {
    name: '抱一个'
  },
  {
    name: '一个真心话'
  },
  {
    name: '大冒险一次'
  },
  {
    name: '一起蹦迪'
  },
  {
    name: '一次郊游'
  },
  {
    name: '三天不许打游戏'
  }
]
const skinCareList = [
  {
    name: 'sk2 神仙水' // 奖品名称
  },
  {
    name: '雅诗兰黛小棕瓶'
  },
  {
    name: '黛珂紫苏水牛油果'
  },
  {
    name: '黛珂植物韵律水乳'
  },
  {
    name: '黛珂焕白水乳'
  },
  {
    name: '黛珂白檀水乳'
  },
  {
    name: '黛珂精致水乳'
  },
  {
    name: '黛珂赋活水乳'
  },
  {
    name: 'Lamer经典面霜'
  },
  {
    name: 'Lamer修复精华'
  },
  {
    name: 'Sisley全能乳液'
  }
]
const bagList = [
  {
    name: 'Gucci酒神包' // 奖品名称
  },
  {
    name: 'Chanel流浪包'
  },
  {
    name: 'Loewe'
  },
  {
    name: 'Ysl'
  },
  {
    name: '巴黎世家'
  },
  {
    name: 'Lv水桶包'
  },
  {
    name: 'Chole小猪包'
  },
  {
    name: 'Furla'
  },
  {
    name: 'Dior戴妃包'
  },
  {
    name: 'Chanel Leboy'
  },
  {
    name: '宝格丽翻盖包'
  }
]

function selectPrize (list, n) {
  for (let i = 0; i < n; i++) {
    let random = Math.floor(Math.random() * (list.length - 1))
    list.pop(random)
    prizeList.push(list[random])
  }
}
function randomSort (a, b) {
  return Math.random() > 0.5 ? -1 : 1
  // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

selectPrize(cosmeticList, 4)
selectPrize(activityList, 5)
selectPrize(skinCareList, 2)
selectPrize(bagList, 1)

prizeList.sort(randomSort)

export default{
  prizeList
}
