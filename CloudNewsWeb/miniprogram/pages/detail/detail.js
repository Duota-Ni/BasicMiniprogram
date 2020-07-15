// pages/detail/detail.js
var common = require('../../utils/common.js') //引用公共js文件
const db = wx.cloud.database()
const news = db.collection("news")
Page({
  //添加收藏夹
  addFavorites:function() {
    let article = this.data.article//获取当前新闻
    wx.setStorageSync(article._id, article) //添加到本地缓存
    this.setData({
      isAdd: true
    }) //更新按钮显示
  },
  //取消收藏
  cancelFavorites: function () {
    let article = this.data.article //获取当前新闻
    wx.removeStorageSync(article._id)//从本地缓存删除
    this.setData({
      isAdd: false
    }); //更新按钮显示
  },

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示loading提示框
    wx.showLoading({
      title: '数据加载中'
    })
    //获取新闻编号(页面跳转时带来的)
    let id = options.id
    //根据新闻_id查找是否在收藏夹中
    let article = wx.getStorageSync(id)
    //新闻在收藏夹中
    if (article != '') {
      //更新页面上的新闻信息和收藏状态
      this.setData({
        article: article,
        isAdd: true
      })
      wx.hideLoading()
    }
    //新闻不在收藏夹中
    else {
      //根据新闻id在云数据集中查找新闻内容
      news.doc(id).get({
        success: res => {
          //更新页面上的新闻信息和收藏状态
          this.setData({
            article: res.data,
            isAdd: false
          })
          //隐藏loading提示框
          wx.hideLoading()
        }
      })
    }
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