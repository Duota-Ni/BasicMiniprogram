// pages/index/index.js
var app = getApp();
const db = wx.cloud.database();
const photos = db.collection("photos");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数，获取用户信息
   */
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.openid == null) {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
          app.globalData.openid = res.result.openid
        }
      })
    }
  },

  /**
   * 自定义函数，跳转到上传图片页add
   */
  goToAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    photos.orderBy('addDate', 'desc').get({
      success: res => {
        this.setData({
          photoList: res.data
        })
      }
    })
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