App({
  onLaunch: function (options) {
  },
  onShow: function(options) {
  },
  login: function(bindUserId) {
    wx.login({
      success: res => {
        if (!res.code) {
          wx.showToast({
            title: '登录失败：1002',
            icon: 'error'
          })
          return
        }
        console.log(res.code);
      },
      fail: () => {
        wx.showToast({
          title: '登录失败：1001',
          icon: 'error'
        })
      }
    })
  },
    // 封装接口
  http(url, type, header, param ){
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: type,
        header: header,
        data: param,
        success (res) {
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  
  globalData: {
    aid: 34,
    token: '',      //登录信息
    appid: 'wx7eebef0766987258',    //小程序ID
    sessionkey: '',
    unionId: '',
    openId: '',
    userId: '',
    queryUserId: '',
    queryLoginId: '',
    tryCount: 0,
    userInfo: null,
    remark: ''
  }
})