
var pageObject = {
  data:{
    toastHidden: true,
    toast2Hidden: true
  },
  toast1Tap: function(e){
    this.setData({
      toastHidden: false
    })
  },
  toast2Tap: function(e){
    this.setData({
      toast2Hidden: false
    })
  }
};
Page(pageObject);