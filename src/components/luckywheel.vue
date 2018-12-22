<template>
  <div class="container">
    <div class="lucky-wheel">
      <div class="wheel-main">
        <img class="wheel" src="../assets/img/wheel.png"/>
        <div class="title">
          <p>{{username}}</p>
          <p>原谅我吧！</p>
        </div>
        <div class="wheel-pointer-box">
          <div class="wheel-pointer"
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
      <div class="button-box shake-slow shake-constant" @click="rotate_handle()">
        <img :src="button_bg" class="start-button"/>
        <span>给我一次机会吧!</span>
      </div>

    </div>
    <div class="toast" v-show="toast_control">
      <div class="toast-container">
        <img :src="toast_pictrue" class="toast-picture">
        <!--<div class="close" @click="close_toast()"></div>-->
        <div class="toast-title">
          {{toast_title}}
        </div>
        <div class="toast-btn">
          <button open-type='share'>小姐姐不够喜欢耶,换一个?</button>
          <button open-type='share'>小哥哥负担不起呜呜呜,换一个?</button>
          <button @click="open_QRCode">程序媛小姐姐这个主意真好,打赏一个!</button>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="toast_control"></div>
  </div>
</template>
<script>
import prize from '../assets/js/prize.js'

export default {
  data () {
    return {
      lottery_ticket: 0, // 抽奖次数
      toast_control: false, // 抽奖结果弹出框控制器
      start_rotating_degree: 0, // 初始旋转角度
      rotateAngle: 0, // 将要旋转的角度
      start_rotating_degree_pointer: 0, // 指针初始旋转角度
      rotateAngle_pointer: 0, // 指针将要旋转的度数
      rotate_transition: 'transform 6s ease-in-out', // 初始化选中的过度属性控制
      rotate_transition_pointer: 'transform 12s ease-in-out', // 初始化指针过度属性控制
      click_flag: true, // 是否可以旋转抽奖
      index: 0,
      prize_list: [],
      qrcode_popup: false
    }
  },
  props: ['username', 'status'],
  onShow () {
    this.toast_control = false
    this.init_prize_list()
  },
  created () {
    this.init_prize_list()
  },
  computed: {
    toast_title () {
      if (this.prize_list[this.index + 1].type == 'activity') {
        return '小哥哥快去' + this.prize_list[this.index + 1].name + this.username + '吧!'
      } else if (this.prize_list[this.index + 1].type == 'bag') {
        return '哇，快去给' + this.username + '买个' + this.prize_list[this.index + 1].name + ',就能求得她原谅了呢!'
      } else if (this.prize_list[this.index + 1].type == 'skinCare') {
        return '哇，快去给' + this.username + '买个' + this.prize_list[this.index + 1].name + ',就能求得她原谅了呢!'
      } else if (this.prize_list[this.index + 1].type == 'cosmetic') {
        return '哇，快去给' + this.username + '买个' + this.prize_list[this.index + 1].name + ',就能求得她原谅了呢!'
      }
    },
    toast_pictrue () {
      return require('../assets/img/congratulation.png')
    },
    button_bg () {
      return require('../assets/img/button.png')
    },
    qrcode () {
      return require('../assets/img/qrcode.jpeg')
    }
  },
  methods: {
    // 此方法为处理奖品数据
    init_prize_list () {
      this.prize_list = prize.init()
    },
    rotate_handle () {
      this.rotating()
    },
    rotating () {
      if (!this.click_flag) return
      var duringTime = 5 // 默认为1s
      var random = Math.floor(Math.random() * 11)
      this.index = random
      var resultAngle = [330, 300, 270, 240, 210, 180, 150, 120, 90, 60, 30, 0] // 最终会旋转到下标的位置所需要的度数
      var randCircle = 3 // 附加多转几圈，2-3
      this.click_flag = false // 旋转结束前，不允许再次触发
      // 转动盘子
      var rotateAngle = this.start_rotating_degree + randCircle * 360 + resultAngle[random] - this.start_rotating_degree % 360
      this.start_rotating_degree = rotateAngle
      this.rotateAngle = 'rotate(' + rotateAngle + 'deg)'
      var that = this
      // 旋转结束后，允许再次触发
      setTimeout(function () {
        that.click_flag = true
        that.game_over()
      }, duringTime * 1000 + 1500) // 延时，保证转盘转完

    },
    game_over () {
      this.toast_control = true
    },
    // 关闭弹窗
    close_toast () {
      this.toast_control = false
    },
    open_QRCode () {
      // this.qrcode_popup = true
      wx.previewImage({
        current: ['https://s1.ax1x.com/2018/12/21/Fsn6sK.jpg'], // 当前显示图片的http链接
        urls: ['https://s1.ax1x.com/2018/12/21/Fsn6sK.jpg'] // 需要预览的图片http链接列表
      })
    }
  }
}
</script>
<style scoped>
  @import '../assets/css/shake.css'; /* 引入shake样式 */

  .container {
    width: 100%;
  }

  .lucky-wheel {
    width: 100%;
    height: 100vh;
    background: rgb(255, 239, 199);
    padding-top: 25px;
  }

  .wheel {
    z-index: 3;
  }

  .wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 600px;
  }

  .title {
    position: absolute;
    z-index: 3;
    text-align: center;
    top: 42px;
    font-size: 20px;

  }

  .wheel-bg {
    width: 375px;
    height: 375px;
    color: #fff;
    font-weight: 500;
    background: url("https://s1.ax1x.com/2018/12/20/FrQcG9.png") no-repeat center top;
    background-size: 100%;
    top: 7px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
    z-index: 2;
  }

  .wheel {
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
    transform-origin: center 60%;
  }

  .wheel-bg div {
    text-align: center;
  }

  .prize-list {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50px;
  }

  .prize-list .prize-item {
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 2;
    width: 23px;
  }

  .prize-list .prize-item:first-child {
    top: 0px;
    left: 177px;
    transform: rotate(0deg);
  }

  .prize-list .prize-item:nth-child(2) {
    top: 5px;
    left: 214px;
    transform: rotate(30deg);
  }

  .prize-list .prize-item:nth-child(3) {
    top: 30px;
    left: 240px;
    transform: rotate(60deg);
  }

  .prize-list .prize-item:nth-child(4) {
    top: 65px;
    left: 250px;
    transform: rotate(90deg);
  }

  .prize-list .prize-item:nth-child(5) {
    top: 100px;
    left: 240px;
    transform: rotate(120deg);
  }

  .prize-list .prize-item:nth-child(6) {
    top: 125px;
    left: 210px;
    transform: rotate(150deg);
  }

  .prize-list .prize-item:nth-child(7) {
    top: 130px;
    left: 177px;
    transform: rotate(180deg);
  }

  .prize-list .prize-item:nth-child(8) {
    top: 125px;
    left: 140px;
    transform: rotate(210deg);
  }

  .prize-list .prize-item:nth-child(9) {
    top: 100px;
    left: 120px;
    transform: rotate(240deg);
  }

  .prize-list .prize-item:nth-child(10) {
    top: 65px;
    left: 100px;
    transform: rotate(270deg);
  }

  .prize-list .prize-item:nth-child(11) {
    top: 30px;
    left: 115px;
    transform: rotate(300deg);
  }

  .prize-list .prize-item:nth-child(12) {
    top: 5px;
    left: 140px;
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

  .prize-type {
    font-size: 12px;
    overflow: hidden;
    text-align: center;
    writing-mode: lr-tb
  }

  .content div {
    text-align: left;
  }

  .button-box {
    width: 200px;
    margin: 10px auto;
  }

  .button-box span {
    position: relative;
    top: -45px;
    left: 43px;
  }

  .start-button {
    width: 200px;
    height: 45px;
  }

  .toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
    width: 100%;
    height: 100%;
  }

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 300;
    transform: translate(-50%, -50%);
    width: 310px;
    background: #fff;
    border-radius: 5px;
    padding: 5px;
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
    padding: 30px 30px 10px 30px;
    font-size: 17px;
    color: #000000;
    text-align: center;
  }

  .toast-btn button {
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
    width: 245px;
    height: 35px;
    margin: 20px auto;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 13px;
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

