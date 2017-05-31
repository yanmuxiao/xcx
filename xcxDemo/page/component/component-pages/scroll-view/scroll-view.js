
var order = ['green', 'red', 'yellow', 'blue', 'green'];
var orderLen = order.length;
var orderTop = 100 * (orderLen-1);

Page({
  data:{
    text:"Page scroll-view",
    toView: 'green'
  },
  upper: function(e){
    console.log('upper');
  },
  lower: function(e){
    console.log('lower');
  },
  scroll: function(e){
    console.log('scroll');
  },
  scrollToTop: function(e){
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function(e){
    for(var i = 0; i < orderLen; i++){
      if(order[i] === this.data.toView){
        this.setData({
          toView: order[i+1],
          scrollTop: ((i+1) * 100)%orderTop
        })
        break;
      }
    }
  },
  tapMove: function(e){
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }

})