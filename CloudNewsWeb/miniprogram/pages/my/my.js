// pages/my/my.js
var common = require('../../utils/common.js') //引用公共js文件
const db = wx.cloud.database()
const news = db.collection("news")
Page({
  //获取微信用户信息
  getMyInfo: function (e) {
    //console.log(e.detail.userInfo)
    let info = e.detail.userInfo;
    this.setData({
      isLogin: true,
      src: info.avatarUrl,
      nickName: info.nickName
    })
    //获取收藏列表
    this.getMyFavorites();
  },
  /**
   * 页面的初始数据
   */
  data: {
    num:0
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
    //如果已经登录
    if (this.data.isLogin) {
      //更新收藏列表
      this.getMyFavorites()
    }
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

  },
  //获取收藏列表
  getMyFavorites: function () {
    let info = wx.getStorageInfoSync(); //读取本地缓存信息
    let keys = info.keys; //获取全部key信息
    let num = keys.length; //获取收藏新闻数量
    let myList = [];
    for (var i = 0; i < num; i++) {
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    //更新收藏列表
    this.setData({
      newsList: myList,
      num: num
    });
  },
  /**
   * 自定义函数-跳转到新闻浏览页面
   */
  goToDetail:function(e){
    common.goToDetail(e.currentTarget.dataset.id)
  }
  
})