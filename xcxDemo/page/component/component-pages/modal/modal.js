
var pageObject = {
    data: {
      modalHidden: true,
      modalHidden2: true
    },
    modalTap: function(e){
      this.setData({
        modalHidden: false
      })
    },
    modalConfirm: function(e){
      this.setData({
        modalHidden: true
      });
      console.log('你点击了确定按钮！');
    },
    modalCancel: function(e){
      this.setData({
        modalHidden: true
      });
      console.log('你点击了取消按钮！');
    },
    modalTap2: function(e){
      this.setData({
        modalHidden2: false
      })
    },
    modalConfirm2: function(e){
      this.setData({
        modalHidden2: true
      });
      console.log('你点击了modal2确定按钮！');
    }
};

Page(pageObject);