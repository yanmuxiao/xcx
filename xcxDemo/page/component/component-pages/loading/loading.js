
var pageObject = {
    data: {
      hidden: true
    },
    loadingTap: function(e){
      this.setData({
        hidden: false
      });

      var that = this;
      setTimeout(function(){
        that.setData({
          hidden: true
        })
      },2000);
    }
}
Page(pageObject);