import Vue from 'vue'
import App from './index'
import '../../assets/css/shake.css' /* 引入shake样式 */

const app = new Vue(App)
app.$mount()

Page({
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: 'test',
      path: '/pages/index/index',
      success: function (res) {
        var shareTickets = res.shareTickets
        if (shareTickets.length == 0) {
          return false
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData
            var iv = res.iv

            wx.login({
              success: function (res) {
                var code = res.code
                console.log(code)
                wx.request({
                  url: 'xx',//写上你后台服务器路径（用途：解析出Gopenid）
                  //解析出Gopenid需要session_key，encryptedData，iv。具体后台怎么写，
                  //可以参照https://www.jianshu.com/p/856fe2195ffe
                  data: { 'code': code, 'encryptedData': encryptedData, 'iv': iv },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    wx.showModal({
                      title: 'GopenId',
                      content: res.data.openGId
                    })
                  }
                })
              }
            })
            console.log(encryptedData)
          }
        })
      },
      fail: function () {

      }
    }

  }
})
