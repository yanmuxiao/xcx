Page({
  data:{
    name:"MINA搬运工",
    imgSrc:"/imgs/minat.jpg",

    // view、text封装的一个简易按钮的初始样式
    btnColor:"btncolor1"
  },
  // 简易按钮的点击事件
  toMina:function(){
    // 获取 thisthis 
    var that = this;
    // 点击简易按钮时，更改简易按钮的样式
    this.setData({btnColor:"btncolor2"})
    // 并跳转到内容页
    wx.navigateTo({
      url: '../index/index',
      // 跳转成功之后的回调函数
      success:function(){
        // 更改简易按钮的样式
        // 操作前后对于按钮样式的更改实现一个点击按下和松开的效果对比
        that.setData({btnColor:"btncolor1"})
      }
    })
  }
})