const app = getApp()

Page({
  data: {
    imageList: [],
    ipValue: '',
    localIpAddress: {}
  },
  onLoad: function () {
    this.readyLoad()
  },
  readyLoad: function () {

  },
  onShareAppMessage: function () {
    return {
      title: 'Nindle',
      path: '/pages/index/index'
    }
  },
  async getImageList(){
	let url = `https://picsum.photos/v2/list?page=2&limit=100`
	const imageList = await app.http(url, 'get', {})
	this.setData({imageList: imageList})
	console.log(imageList);
  },

  // input事件
  bindKeyInput(e) {
    this.setData({
      ipValue: e.detail.value
    })
  },
  // 获取IP地址
  async getIpAddress(e) {
    let url = `https://www.yuanxiapi.cn/api/iplocation/?ip=${this.data.ipValue}`
    const ipInfo = await app.http(url, 'get', {})
    console.log(ipInfo);
  },
  // 获取本机外网IP地址
  async getIpAddress1(e) {
    let url = `http://pv.sohu.com/cityjson?ie=utf-8`
    const ip = await app.http(url, 'get', {})
    this.setData({
      localIpAddress: JSON.parse(ip.split('=')[1].split(';')[0])
    })
  },
})
