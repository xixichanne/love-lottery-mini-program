import Vue from 'vue'
import App from './index'
import '../../assets/css/shake.css' /* 引入shake样式 */

const app = new Vue(App)
app.$mount()

// Page({
//   onShareAppMessage: function () {
//     wx.showShareMenu({
//       withShareTicket: true
//     })
//     return {
//       title: 'test',
//       path: '/pages/index/index',
//       success: function (res) {
//         var shareTickets = res.shareTickets
//         if (shareTickets.length == 0) {
//           return false
//         }
//         wx.getShareInfo({
//           shareTicket: shareTickets[0],
//           success: function (res) {
//             var encryptedData = res.encryptedData
//             var iv = res.iv
//
//             console.log(encryptedData)
//             console.log(iv)
//           }
//         })
//       },
//       fail: function () {
//
//       }
//     }
//
//   }
// })
