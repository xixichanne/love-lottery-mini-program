<template>
  <div class="container">
    <div class="lucky-wheel">
      <div class="wheel-main">
        <img class="wheel" src="../assets/img/wheel.png"/>
        <div class="wheel-pointer-box">
          <div class="wheel-pointer" @click="rotate_handle()"
               :style="{transform:rotateAngle_pointer,transition:rotate_transition_pointer}"></div>
        </div>
        <div class="wheel-bg" :style="{transform:rotateAngle,transition:rotate_transition}">
          <div class="prize-list">
            <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
              <div class="prize-type">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-bg"></div>
      <div class="bg-p"></div>
      <div class="content">
        <div class="lottery_ticket">今日免费抽奖次数： {{ lottery_ticket}}</div>
      </div>
      <div class="tip">
        <div class="tip-title">活动规则</div>
        <div class="tip-content">
          <p> 1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。 2.金币抽奖，每10个金豆可兑换一次大转盘机会。</p>
          <p> 2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
          <p> 3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
        </div>
      </div>
    </div>
    <div class="toast" v-show="toast_control">
      <div class="toast-container">
        <img :src="toast_pictrue" class="toast-picture">
        <div class="close" @click="close_toast()"></div>
        <div class="toast-title">
          {{toast_title}}
        </div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="close_toast">关闭</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="toast_control"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      easejoy_bean: 0, // 金豆
      lottery_ticket: 0, // 抽奖次数
      prize_list: [
        {
          icon: require('../assets/img/bean_500.png'), // 奖品图片
          count: 10, // 奖品数量
          name: '易趣豆', // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon: require('../assets/img/bean_five.png'),
          count: 5,
          name: '豆',
          isPrize: 1
        },
        {
          icon: require('../assets/img/bean_one.png'),
          count: 10,
          name: '易趣豆',
          isPrize: 1
        },
        {
          icon: require('../assets/img/point_five.png'),
          count: 5,
          name: '积分',
          isPrize: 1
        },
        {
          icon: require('../assets/img/point_ten.png'),
          count: 10,
          name: '积分',
          isPrize: 1
        },
        {
          icon: require('../assets/img/bean_500.png'),
          count: 10,
          name: '易趣豆',
          isPrize: 1
        },
        {
          icon: require('../assets/img/give_up.png'),
          count: 0,
          name: '未中奖',
          isPrize: 0
        },
        {
          icon: require('../assets/img/bean_500.png'),
          count: 10,
          name: '易趣豆',
          isPrize: 1
        },
        {
          icon: require('../assets/img/point_ten.png'),
          count: 10,
          name: '积分',
          isPrize: 1
        },
        {
          icon: require('../assets/img/bean_500.png'),
          count: 10,
          name: '易趣豆',
          isPrize: 1
        },
        {
          icon: require('../assets/img/give_up.png'),
          count: 0,
          name: '未中奖',
          isPrize: 0
        },
        {
          icon: require('../assets/img/bean_500.png'),
          count: 10,
          name: '易趣豆',
          isPrize: 1
        }
      ], // 奖品列表
      toast_control: false, // 抽奖结果弹出框控制器
      hasPrize: false, // 是否中奖
      start_rotating_degree: 0, // 初始旋转角度
      rotateAngle: 0, // 将要旋转的角度
      start_rotating_degree_pointer: 0, // 指针初始旋转角度
      rotateAngle_pointer: 0, // 指针将要旋转的度数
      rotate_transition: 'transform 6s ease-in-out', // 初始化选中的过度属性控制
      rotate_transition_pointer: 'transform 12s ease-in-out', // 初始化指针过度属性控制
      click_flag: true, // 是否可以旋转抽奖
      index: 0
    }
  },
  created () {
    this.init_prize_list()
  },
  computed: {
    toast_title () {
      return this.hasPrize
        ? '恭喜您，获得' + this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
        : '未中奖'
    },
    toast_pictrue () {
      return this.hasPrize
        ? require('../assets/img/congratulation.png')
        : require('../assets/img/sorry.png')
    }
  },
  methods: {
    // 此方法为处理奖品数据
    init_prize_list (list) {
    },
    rotate_handle () {
      this.rotating()
    },
    rotating () {
      if (!this.click_flag) return
      var type = 0 // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var duringTime = 5 // 默认为1s
      var random = Math.floor(Math.random() * 7)
      this.index = random
      var resultAngle = [330, 300, 270, 240, 210, 180, 150, 120, 90, 60, 30, 0] // 最终会旋转到下标的位置所需要的度数
      var randCircle = 3 // 附加多转几圈，2-3
      this.click_flag = false // 旋转结束前，不允许再次触发
      if (type === 0) {
        // 转动盘子
        var rotateAngle =
          this.start_rotating_degree +
          randCircle * 360 +
          resultAngle[random] -
          this.start_rotating_degree % 360
        this.start_rotating_degree = rotateAngle
        this.rotateAngle = 'rotate(' + rotateAngle + 'deg)'
        // // //转动指针
        // this.rotateAngle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*randCircle+"deg)";
        // this.start_rotating_degree_pointer =360*randCircle;
        var that = this
        // 旋转结束后，允许再次触发
        setTimeout(function () {
          that.click_flag = true
          that.game_over()
        }, duringTime * 1000 + 1500) // 延时，保证转盘转完
      } else {
        //
      }
    },
    game_over () {
      this.toast_control = true
      this.hasPrize = this.prize_list[this.index].isPrize
    },
    // 关闭弹窗
    close_toast () {
      this.toast_control = false
    }
  }
}
</script>
<style scoped>
  .container {
    width: 100%;
  }

  .lucky-wheel {
    width: 100%;
    height: 1000px;
    background: rgb(252, 207, 133);
    padding-top: 25px;
  }
  .wheel{
    z-index: 3;
  }
  .wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 600px;
  }

  .wheel-bg {
    width: 375px;
    height: 375px;
    color: #fff;
    font-weight: 500;
    background: url("http://i2.bvimg.com/670180/b1823871ff8ecf0d.png") no-repeat center top;
    background-size: 100%;
    top:7px;
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
    z-index: 2;
  }
  .wheel{
    position: absolute;
    width: 100%;
    height: 575px;
  }

  .wheel-pointer-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -60%);
    width: 85px;
    height: 85px;
  }

  .wheel-pointer {
    width: 85px;
    height: 85px;
    background: url("../assets/img/draw_btn.png") no-repeat center top;
    background-size: 100%;
    transform-origin: center 60%;
  }

  .wheel-bg div {
    text-align: center;
  }

  .prize-list {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 60px;
  }

  .prize-list .prize-item {
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 2;
    width: 15px;
  }

  .prize-list .prize-item:first-child {
    top: 0px;
    left: 180px;
    transform: rotate(0deg);
  }

  .prize-list .prize-item:nth-child(2) {
    top: 25px;
    left: 200px;
    transform: rotate(30deg);
  }

  .prize-list .prize-item:nth-child(3) {
    top: 30px;
    left: 230px;
    transform: rotate(60deg);
  }

  .prize-list .prize-item:nth-child(4) {
    top: 55px;
    left: 240px;
    transform: rotate(90deg);
  }

  .prize-list .prize-item:nth-child(5) {
    top: 80px;
    left: 230px;
    transform: rotate(120deg);
  }

  .prize-list .prize-item:nth-child(6) {
    top: 85px;
    left: 200px;
    transform: rotate(150deg);
  }

  .prize-list .prize-item:nth-child(7) {
    top: 110px;
    left: 180px;
    transform: rotate(180deg);
  }

  .prize-list .prize-item:nth-child(8) {
    top: 85px;
    left: 160px;
    transform: rotate(210deg);
  }
  .prize-list .prize-item:nth-child(9) {
    top: 80px;
    left: 130px;
    transform: rotate(240deg);
  }

  .prize-list .prize-item:nth-child(10) {
    top: 55px;
    left: 120px;
    transform: rotate(270deg);
  }

  .prize-list .prize-item:nth-child(11) {
    top: 30px;
    left: 130px;
    transform: rotate(300deg);
  }
  .prize-list .prize-item:nth-child(12) {
    top: 25px;
    left: 150px;
    transform: rotate(330deg);
  }

  .prize-item {
    width: 94px;
    height: 144px;
  }

  .prize-pic img {
    width: 65px;
    height: 40px;
    margin-top: 25px;
  }

  .prize-count {
    font-size: 14px;
  }

  .prize-type {
    font-size: 12px;
  }

  .main {
    position: relative;
    width: 100%;
    min-height: 228px;
    background: rgb(243, 109, 86);
    padding-bottom: 27px;
  }

  .main-bg {
    width: 100%;
    height: 105px;
    position: absolute;
    top: -55px;
    left: 0;
    background: url("../assets/img/luck_bg.png") no-repeat center top;
    background-size: 100%;
  }

  .bg-p {
    width: 100%;
    height: 47.2px;
    background: rgb(252, 207, 133);
  }

  .content {
    position: absolute;
    top: 2.8px;
    left: 0;
    background: rgb(243, 109, 86);
    width: 100%;
    height: 83px;
    font-size: 18px;
    color: #ffeb39;
    padding-left: 108px;
  }

  .content div {
    text-align: left;
  }

  .tip {
    position: relative;
    margin: 40px auto 0;
    width: 280px;
    border: 1px solid #fbc27f;
  }

  .tip-title {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 16px;
    color: #fccc6e;
    background: rgb(243, 109, 86);
    padding: 5px 10px;
  }

  .tip-content {
    padding: 25px 10px;
    font-size: 14px;
    color: #fff8c5;
    line-height: 1.5;
  }

  .toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    width: 100%;
    height: 100%;
  }

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    width: 247px;
    background: #fff;
    border-radius: 5px;
    padding: 5px;
    background-color: rgb(252, 244, 224);
  }

  .toast-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dotted #fccc6e;
  }

  .toast-picture {
    position: absolute;
    top: -104px;
    left: -24px;
    width: 300px;
    height: 137px;
  }

  .toast-pictrue-change {
    position: absolute;
    top: -24px;
    left: -22px;
    width: 280px;
    height: 50px;
  }

  .toast-title {
    padding: 45px 0;
    font-size: 18px;
    color: #fc7939;
    text-align: center;
  }

  .toast-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }

  .toast-btn div {
    background-image: -moz-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );

    background-image: -ms-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    background-image: -webkit-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
    width: 75px;
    height: 30px;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }

  .close {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 32px;
    height: 32px;
    background: url("../assets/img/close_store.png") no-repeat center top;
    background-size: 100%;
  }
</style>

