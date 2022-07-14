import Tool from '../../utils/util' 
const app = getApp()

Page({
  properties: {
    url: {
      type: toString,
      value: ''
    }
  },
  data: {
    url: '',
  },
  onLoad: function () {
    wx.hideHomeButton()
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
    })

    if (app.globalData.token) {
      this.readyLoad()
    } else {
      app.readyCallback = () => {
        this.readyLoad()
      }
    }
  },
  readyLoad: function () {
    this.setData({
      url: 'https://app-web.topcj.com/#/newapplet' + Tool.json2search({
        userId: app.globalData.queryUserId || app.globalData.userId,
        loginId: app.globalData.queryLoginId,
        unionId: app.globalData.unionId
      })
    })

  }
})
