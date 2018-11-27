<template>
  <div id="app">
    <van-dialog
      use-slot
      async-close
      :show="show"
      confirm-button-open-type="getUserInfo"
      :bind:close="onClose"
    >
      <van-field
        :value="username"
        label="用户名"
        placeholder="请输入用户名"
      />
    </van-dialog>
    <lucky-wheel></lucky-wheel>
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
        password: ''
      }
    },
    methods: {
      onClose (event) {
        if (event.detail === 'confirm') {
          // 异步关闭弹窗
          setTimeout(() => {
            this.setData({
              show: false
            })
          }, 1000)
        } else {
          this.setData({
            show: false
          })
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
</style>
