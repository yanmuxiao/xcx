// pages/test/test.js
Page({
  data:{},
  
  formSubmit: function(e) {
    console.log(e.detail.formId)
    wx.showToast({
      title: e.detail.formId,
      icon: 'success',
      duration: 1000
    })
  },
  aa:function(e){
    console.log(11)
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})