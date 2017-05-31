// pages/template/template.js
Page({
  data:{
    imgTyep:[{name:'会议活动',img:['/img/bg1.png','/img/bg2.png','/img/bg3.png','/img/bg4.png']},{name:'聚会活动',img:['/img/bg1.png','/img/bg2.png']}]
  },
  setImg:function(e){
    var src = e.currentTarget.dataset.src;
    wx.setStorageSync('template_img', src)
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    wx.setNavigationBarTitle({
      title: '选择模板'
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})