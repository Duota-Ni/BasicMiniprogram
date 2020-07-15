// pages/detail/detail.js
const db = wx.cloud.database();
const photos = db.collection("photos");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数，下载图片到设备
   */
  downloadPhoto: function () {
    wx.cloud.downloadFile({
      fileID: this.data.photo.photoUrl,
      success: res => {
        //保存图片到本地相册开始 wx.saveImageToPhotosAlbum({
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            wx.showToast({
              title: '保存成功！',
            })
          },
          fail: err => {
            wx.showToast({
              title: '保存失败！',
              icon: 'none'
            })
          }
        }) //保存图片到本地相册结束 wx.saveImageToPhotosAlbum({}）
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 自定义函数，全屏预览图片
   */
  previewPhoto: function () {
    //定义图片url地址
    var urls = [this.data.photo.photoUrl]
    //全屏预览图片
    wx.previewImage({
      urls: urls,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    //根据图片id获取云数据集中的图片记录
    photos.doc(options.id).get({
      success: res => {
        this.setData({
          photo: res.data
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "给你分享一张好看的图片",
      path:'pages/detail/detail?id=' + this.data.photo._id
    }
  }
})