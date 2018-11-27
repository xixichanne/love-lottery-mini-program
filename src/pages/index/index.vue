<template>
  <div id="app">
    <lucky-wheel></lucky-wheel>
  </div>
</template>

<script>
import LuckyWheel from '../../components/luckywheel'

export default {
  name: 'app',
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
