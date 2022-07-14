const app = getApp()

Page({
  data: {
    imageList: [],
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
  }
})
