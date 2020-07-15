// pages/edit/edit.js
const db = wx.cloud.database();
const birthday = db.collection("birthday");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "点击设置生日"
  },
  /** 
   * 自定义函数--更页面显示的出生日期
   */
  dateChange: function (e) {
    this.setData({
      //注duota等下看看e.datail.value是啥
      date: e.detail.value
    })
  },
  /** 
   * 自定义函数--提交表单数据
   */
  onSubmit: function (e) {
   // console.log(e);
    //获取表单中提交的全部数据
    let info = e.detail.value

    //追加一个不带年份的生日信息e.g:2020/01/01 substring(5)=01/01
    let date = info.birthday.substring(5)
    info.date = date

    //获取好友id，index.js的addFriend()有
    let id = this.data.id
    //添加新朋友
    if (id == 'new') {
      //随机选择头像Math.ceil()上舍入
      let i = Math.ceil(Math.random() * 9)
      info.avatar = '/images/00' + i + '.jpg'

      birthday.add({
        data: info,
        success: res => {
          //成功后返回首页
          wx.navigateBack()
        },
        fail: err => {
          wx.showToast({
            title: '保存失败',
          })
        }
      })
    }
    //好友已存在
    else {
      //根据好友id更新数据
      birthday.doc(id).update({
        data: info,
        success: res => {
          wx.navigateBack()
        },
        fail: err => {
          wx.showToast({
            title: '保存失败',
          })
        }
      })
    }
  },
  /** 
   * 自定义函数--取消修改并返回上一页
   */
  cancelEdit: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id:id
    })
    if(id!='new'){
      //根据好友id从云数据库获取信息
      birthday.doc(id).get({
        success:res=>{
          this.setData({
            info:res.data,

            date:res.data.birthday
          })
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