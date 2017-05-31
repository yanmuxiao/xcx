var util = require("../../utils/utils.js");

Page({
  data:{
    src:[
      "/imgs/3.jpg",
      "/imgs/4.jpg",
      "/imgs/5.jpg",
      "/imgs/6.jpg",
      "/imgs/7.jpg",
      "/imgs/8.jpg"
    ],
    imgs:[],
    newimgs: ["/imgs/1.jpg","/imgs/2.jpg"]
  },
  onLoad :function(){
    // 设置页面的启动时间
    this.data.date = util.formatDate(new Date());

    this.data.imgs.push(this.data.src[0]);
  },
  onPullDownRefresh:function(){
    this.setData({date:util.formatDate(new Date())});
    // 使用网络延迟模拟一下 下拉加载的过程
    // setTimeout(()=>wx.stopPullDownRefresh(),3000);

    // 加载最新的内容，模拟从服务中加载的新内容
    var newimgs = this.data.newimgs;
    
    if(newimgs.length==0){
      wx.showToast({title:"没有最新内容了"});
    } else {
      // 将新内容放入到 imgs、src 的最前面
      var src = this.data.src; 
      var imgs = this.data.imgs;
      
      src.unshift(...newimgs);
      imgs.unshift(...newimgs);

      this.setData({src:src});
      this.setData({newimgs:[]});

      // 新加载的内容被使用，清空对应数组
      this.setData({imgs:imgs});
      wx.showToast({title:"刷新完成"});
    }
    wx.stopPullDownRefresh();
  },
  onReachBottom:function(){
    // 从服务器中拿到的数据每次 3 条目显示在页面中
    // 每次上拉加载 1 个图片
    console.log("到最底部了");
    var src = this.data.src;
    var imgs = this.data.imgs;
    if(imgs.length<src.length){
      imgs.push(src[imgs.length]);
    } else{
      wx.showToast({title:"没有更多内容了"});
    }
    this.setData({imgs:imgs});
  }
})