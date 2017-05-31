
var items = ['item1', 'item2', 'item3', 'item4'];
var pageObject = {
  data:{
    actionSheetHidden: true,
    actionSheetItems: items
  },
  actionSheetTap: function(e){
    this.setData({
      actionSheetHidden: false
    })
  },
  actionSheetChange: function(e){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  }
};

for(var i=0;i<items.length;i++){
  (function(itemName){
    pageObject['bind' + itemName] = function(e){
        console.log('click' + itemName, e);
        // 点击item的同时隐藏action-sheet
        this.setData({
          actionSheetHidden: !this.data.actionSheetHidden
        })
    };
  })(items[i])
}

Page(pageObject)