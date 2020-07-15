// pages/add/add.js
var app = getApp();
const db = wx.cloud.database();
const photos = db.collection("photos");

function formatDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) month = '0' + month;
  if (day < 10) month = '0' + day;
  return year + '-' + month + '-' + day;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数，上传图片
   */
  upload: function () {
    //选择图片开始chooseImage({
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success:res=>{
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]

        //自定义图片名称
        const cloudPath = Math.floor(Math.random() * 1000000) + filePath.match(/\.[^.]+?$/)[0]

        //上传图片到云存储开始wx.cloud.uploadFile({
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log(res)
            wx.showToast({
              title: '上传成功',
              duration: 3000
            })
            //获取用户信息和当前日期
            let userInfo = app.globalData.userInfo
            let today = formatDate()
            //向云数据集photos添加一条记录开始photos.add({
            photos.add({
              data: {
                photoUrl: res.fileID,
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName,
                country: userInfo.country,
                province: userInfo.province,
                addDate: today
              },
              success: res => {
                console.log(e)
              },
              fail: e => {
                console.log(e)
              }
            }) //向云数据集photos添加一条记录结束photos.add({ })
            this.getHistoryPhotos()
          },
          fail: e => {
            console.log(e)
            wx.showToast({
              title: '上传失败！',
              icon:'none',
              duration:3000
            })
          }
        }) //上传图片到云存储结束wx.cloud.uploadFile({ })

      },
      fail: e => {
        console.log(e)
      },
      complete: () => {
        wx.hideLoading()
        this.getHistoryPhotos()
      }
    }) //选择图片结束chooseImage({})
  },

  /**
   * 自定义函数，获取已上传图片的历史记录
   */
  getHistoryPhotos: function () {
    let openid = app.globalData.openid
    //从云数据集中查找当前用户的上传记录
    photos.where({
      _openid: openid
    }).get({
      success: res => {
        this.setData({
          historyPhotos: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData)t

    this.getHistoryPhotos()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHistoryPhotos()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})