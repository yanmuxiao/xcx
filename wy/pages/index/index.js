//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    activity:["看电影","打球","打球2","打球3","打球4","打球5"]
  },
  goDetails:function(e){
    let oIndex = e.currentTarget.dataset.index
    console.log(this.data.activity[oIndex])
    wx.navigateTo({
      url: '../details/details'
    })
  },
  add:function(){
    wx.navigateTo({
      url: '../add/add'
    })
  },
  all:function(){
    wx.navigateTo({
      url: '../all/all'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh: function(e){
    console.log(e)
  },
  onLoad: function () {
    this.setData({
      url:app.globalData.url
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
