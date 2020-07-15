// pages/detail/detail.js
const utils = require('../../utils/utils');
const db = wx.cloud.database();
const birthday = db.collection("birthday");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /** 
   * 自定义函数--编辑好友信息
   */
  editFriend: function () {
    let id = this.data.id
    wx.navigateTo({
      url: '../edit/edit?id=' + id,
    })
  },
  /** 
   * 自定义函数--删除好友
   */
  deleteFriend: function () {
    let id = this.data.id
    birthday.doc(id).remove({
      success: res => {
        wx.navigateBack()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let n2 = options.n2; //距离下个生日天数
    //更新页面数据
    this.setData({
      id: id,
      n2: n2
    })
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
    let id = this.data.id;
    birthday.doc(id).get({
      success: res => {
        let today = utils.getToday();
        let y = utils.getFullYear();
        let b_day = res.data.birthday;
        //计算距离出生的天数
        let n1 = utils.dateDiff(b_day, today)
        this.setData({
          info: res.data,
          n1: n1
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