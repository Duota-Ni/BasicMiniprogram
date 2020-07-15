//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region:["广东省","广州市","天河区"],
    now:{
      tmp:0,
      cond_txt:"未知",
      cond_code:"999",
      hum:0,
      pres:0,
      vis:0,
      wind_dir:0,
      wind_spd:0,
      wind_sc:0
    }
  },
  regionChange:function(e){
    this.setData({region:e.detail.value});
    this.getWeather();
  },
  onLoad:function(options){
    this.getWeather();
  },
  getWeather:function(){
    var that= this;//this不能直接在wxAPI中使用
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      data:{
        location:that.data.region[2],
        key:"yourkey"
      },
      success:function(res){
        console.log(res.data);
        that.setData({ now:res.data.HeWeather6[0].now});
      }

    })
  },

})
