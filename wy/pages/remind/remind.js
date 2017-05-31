// pages/remind/remind.js
Page({
  data: {
    items: [{name:'事件发生时',checked:false},
            {name:'5分钟前',checked:false},
            {name:'15分钟前',checked:true},
            {name:'30分钟前',checked:true},
            {name:'1小时前',checked:false},
            {name:'2小时前',checked:false},
            {name:'1天前',checked:false},
            {name:'2天前',checked:false},
            {name:'1周前',checked:false},]
  },
  radioChange: function(e) {
    console.log(e.detail.value)
    wx.setStorageSync('remind', e.detail.value)
  },
  sureTap:function(){
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
      title: '选择提醒'
    })
    let remind = wx.getStorageSync('remind');
    //改变items
    let items = this.data.items;
    for(var j=0;j<items.length;j++){
      items[j].checked = false;
      for(var i=0;i<remind.length;i++){
        if(items[j].value==remind[i]){
          items[j].checked = true;
        }
      }
    }
    this.setData({
      items: items
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})