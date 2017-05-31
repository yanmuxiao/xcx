Page({
    data: {
        direction: 0
    },
    onReady: function(){
        var that = this;
        wx.onCompssChange(function(res){
            that.setData({
                direction: parseInt(res.direction)
            })
        })
    }
})