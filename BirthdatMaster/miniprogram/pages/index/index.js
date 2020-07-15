// pages/index/index.js
var utils = require('../../utils/utils.js');
const db = wx.cloud.database();
const birthday = db.collection("birthday");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数--添加好友信息
   */
  addFriend: function (options) {
    let id = "new";
    wx.navigateTo({
      url: '../edit/edit?id=' + id,
    })
  },

  /**
   * 自定义函数--取消搜索
   */
  onCancel: function (e) {
    this.getFriendsList();
  },
  /** 
   * 自定义函数--搜索关键词
   */
  onSearch: function (e) {
    //获取搜索关键词
    let keyword = e.detail;
    //使用正则表达式模糊查询
    birthday.where({
      name: db.RegExp({
        regexp: keyword,
        options: 'i'
      })
    }).orderBy('date', 'asc').get({
      success: res => {
        this.processData(res.data)
      }
    })
  },
  /** 
   * 自定义函数--获取好友列表
   */
  getFriendsList: function () {
    birthday.orderBy('data', 'asc').get({
      success: res => {
        this.processData(res.data)
      }
    })
  },

  /** 
   * 自定义函数--处理数据（计算距离下个生日天数）
   */
  processData: function (list) {
    for (var i = 0; i < list.length; i++) {
      //获取不带年份的生日
      let date = list[i].date;
      //计算相差几天
      let n = utils.getNextBirthday(date);
      list[i].n = n
    }
    this.setData({
      friendsList: list
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
    this.getFriendsList()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})