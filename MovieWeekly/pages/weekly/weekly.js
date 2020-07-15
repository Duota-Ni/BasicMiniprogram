// pages/weekly/weekly.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
weeklyMovieList:[
{
name:"泰坦尼克号",
comment:"失去的才是永恒",
imagePath:"/images/ttnk.jpg",
isHighlyRecommended:false,
id:11925,
isdetail:1
},
{
name:"这个杀手不太冷",
comment:"小萝莉与怪蜀黍纯真灿烂的爱情故事",
imagePath:"/images/ss.jpg",
isHighlyRecommended:false,
id:12599,
isdetail:1
},
{
name:"教父",
comment:"最精彩的剧本，最真实的黑帮电影。",
imagePath:"/images/jf.jpg",
isHighlyRecommended:true,
id:10968,
isdetail:1
},
{
name:"正在热映",
comment:"时光网正在热映",
imagePath:"/images/mtimelogo.jpg",
isHighlyRecommended:true,
id:290,
isdetail:0
},
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
this.setData({
  currentIndex:this.data.weeklyMovieList.length-1
})
  },

/**
 * f0函数，点击返回本周触发
 */
  f0:function(event){
    this.setData({
      currentIndex:this.data.weeklyMovieList.length-1
    })
  },

  /**
   * f1函数，点击swiper item（滑动块页面）时候触发
   */
  f1:function(event){
    console.log(event);
    var movieId=event.currentTarget.dataset.movieId

    wx.navigateTo({
      url: '/pages/detail/detail?id='+movieId
    })
  },
  f2:function(event){
    var movieId=event.currentTarget.dataset.movieId
    
    wx.navigateTo({
      url: '/pages/hotmovie/hotmovie?id='+movieId
    })
  }
})