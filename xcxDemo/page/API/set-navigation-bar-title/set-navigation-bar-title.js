Page({
  setNavigationBarTitle : function(e){
    var title = e.detail.value.title;
    console.log(e.detail);
    console.log(e.detail.value);
    console.log(title);
    wx.setNavigationBarTitle({
      title : title
    })
  }
})