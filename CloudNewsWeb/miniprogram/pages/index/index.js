// pages/index/index.js
var common =require('../../utils/common.js')//引用公共js文件
const db = wx.cloud.database()
const news = db.collection("news")
const row = 5
var page = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    news.limit(row).get({
      success: res => {
        this.setData({
          newsList: res.data
        })
      }
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
  onReachBottom: function(){
    //翻下一页
    page++
    //获取当前页面的新闻纪录
    news.skip(row*page).limit(row).get({
      success:res=>{
        //获取原有的新闻纪录
        let old_data=this.data.newsList
        //获取新页面的新闻纪录
        let new_data=res.data
        //更新首页新闻列表
        this.setData({
          newsList:old_data.concat(new_data)
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 自定义函数-跳转到新闻浏览页面
   */
  goToDetail:function(e){
    common.goToDetail(e.currentTarget.dataset.id)
  }
  
})