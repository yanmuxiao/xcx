Page({
    data: {
        systemInfm : {}
    },
    getSystemInfo: function(){
        var that = this;
        wx.getSystemInfo({
            success: function(res){
                that.setData({
                    systemInfo: res
                })
                that.update()
            }
        });
    }
})