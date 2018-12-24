<template>
  <div id="app">
    <div class="mark" v-if="show"></div>
    <van-dialog
      use-slot
      async-close
      title="输入女友的名字"
      zIndex="999"
      :show="show"
      @close="onClose"
      confirm-button-text="拜托拜托!"
    >
      <div class="dialog-content">
        <span>原谅我吧，&nbsp;</span>
        <input v-model="username" placeholder="在这里输入女友姓名" class="text-input"/>
      </div>
    </van-dialog>
    <LuckyWheel :username="username" :status="status" v-if="!show"></LuckyWheel>
  </div>
</template>

<script>
import LuckyWheel from '../../components/luckywheel'

export default {
  name: 'app',
  data () {
    return {
      show: true,
      username: '',
      password: '',
      status:1 //1:正常进入；2:分享后返回
    }
  },
  methods: {
    onClose () {
      this.show = false
    },
    getData () {
      this.username = ''
    }
  },
  onShareAppMessage: function () {
    return {
      title: '她又生气了？怎么办啊啊啊啊啊!',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          // this.selectComponent('#wheel').close_toast()
          this.status='';
          this.status=2;
          console.log("success:"+this.status)
        }
      }
    }
  },
  components: {
    LuckyWheel
  }
}
</script>

<style>
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
  }

  html {
    height: 100%;
  }

  body {
    min-width: 320px;
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
    font-size: 16px;
    height: 100%;
    background: #fff;
  }

  div {
    box-sizing: border-box
  }

  .mark {
    height: 100vh;
    position: absolute;
    min-width: 375px;
    background: #fff;
    z-index: 998
  }

  .dialog-content {
    width: 229px;
    margin: 20px auto;
  }

  .text-input {
    display: inline-block;
    width: 143px;
    /*vertical-align: -7px;*/
  }
</style>
