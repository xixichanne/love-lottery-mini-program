var prizeList = [] // 奖品列表

const cosmeticList = [
  {
    type: 'cosmetic',
    name: 'Dior 620唇釉' // 奖品名称
  },
  {
    type: 'cosmetic',
    name: 'Dior Lip Tatoo #421'
  },
  {
    type: 'cosmetic',
    name: 'Dior 黑管740'
  },
  {
    type: 'cosmetic',
    name: 'Mac Chili'
  },
  {
    type: 'cosmetic',
    name: 'Mac Marrakesh'
  },
  {
    type: 'cosmetic',
    name: 'Mac Dubonnet'
  },
  {
    type: 'cosmetic',
    name: 'Mac Double Gleam'
  },
  {
    type: 'cosmetic',
    name: 'Mac Paramount'
  },
  {
    type: 'cosmetic',
    name: 'Becca Moonstone'
  },
  {
    type: 'cosmetic',
    name: 'Becca Champagne pop'
  },
  {
    type: 'cosmetic',
    name: 'Becca 水散粉'
  },
  {
    type: 'cosmetic',
    name: 'Huda Beauty Nude眼影'
  },
]
const activityList = [
  {
    type: 'activity',
    name: '请一顿火锅' // 奖品名称
  },
  {
    type: 'activity',
    name: '请一顿日料'
  },
  {
    type: 'activity',
    name: '请一顿西餐'
  },
  {
    type: 'activity',
    name: '请一顿烤肉'
  },
  {
    type: 'activity',
    name: '迪士尼一日游'
  },
  {
    type: 'activity',
    name: '做一日家务'
  },
  {
    type: 'activity',
    name: '陪逛街一整天'
  },
  {
    type: 'activity',
    name: '陪做美甲💅'
  },
  {
    type: 'activity',
    name: '一星期奶茶伺候'
  },
  {
    type: 'activity',
    name: '亲一口'
  },
  {
    type: 'activity',
    name: '抱一个'
  },
  {
    type: 'activity',
    name: '回答一个真心话'
  },
  {
    type: 'activity',
    name: '完成一次大冒险'
  },
  {
    type: 'activity',
    name: '一起蹦迪'
  },
  {
    type: 'activity',
    name: '一次郊游'
  },
  {
    type: 'activity',
    name: '三天不许打游戏'
  }
]
const skinCareList = [
  {
    type: 'skinCare',
    name: 'sk2 神仙水' // 奖品名称
  },
  {
    type: 'skinCare',
    name: '雅诗兰黛小棕瓶'
  },
  {
    type: 'skinCare',
    name: '黛珂紫苏水牛油果'
  },
  {
    type: 'skinCare',
    name: '黛珂植物韵律水乳'
  },
  {
    type: 'skinCare',
    name: '黛珂焕白水乳'
  },
  {
    type: 'skinCare',
    name: '黛珂白檀水乳'
  },
  {
    type: 'skinCare',
    name: '黛珂精致水乳'
  },
  {
    type: 'skinCare',
    name: '黛珂赋活水乳'
  },
  {
    type: 'skinCare',
    name: 'Lamer经典面霜'
  },
  {
    type: 'skinCare',
    name: 'Lamer修复精华'
  },
  {
    type: 'skinCare',
    name: 'Sisley全能乳液'
  }
]
const bagList = [
  {
    type: 'bag',
    name: 'Gucci酒神包' // 奖品名称
  },
  {
    type: 'bag',
    name: 'Chanel流浪包'
  },
  {
    type: 'bag',
    name: 'Loewe'
  },
  {
    type: 'bag',
    name: 'Ysl'
  },
  {
    type: 'bag',
    name: '巴黎世家'
  },
  {
    type: 'bag',
    name: 'Lv水桶包'
  },
  {
    type: 'bag',
    name: 'Chole Faye'
  },
  {
    type: 'bag',
    name: 'Furla'
  },
  {
    type: 'bag',
    name: 'Dior戴妃包'
  },
  {
    type: 'bag',
    name: 'Chanel Leboy'
  },
  {
    type: 'bag',
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
function init(){
  prizeList=[]
  selectPrize(cosmeticList, 4)
  selectPrize(activityList, 5)
  selectPrize(skinCareList, 2)
  selectPrize(bagList, 1)
  prizeList.sort(randomSort)
  return prizeList;
}

export default{
  init
}
