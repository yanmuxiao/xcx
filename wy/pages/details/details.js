// pages/details/details.js
var app = getApp()
var timer=null;
Page({
  data:{
    show:true,
    join:false,
    out:true,
    mark:true,
    labelArray:['会议','聚会','活动'],
    people_type:true
  },
  contTap:function(){
    var bool = this.data.show;
    this.setData({
      show:!bool
    })
  },
  joinList:function(){
    wx.navigateTo({
      url: '../people/people'
    })
  },
  closeMark:function(){
    this.setData({
      mark:false
    })
    clearInterval(timer)
  },
  // 播放录音
  playR:function(e){
    let _this = this;
    if(_this.data.yy1){
      _this.setData({
        yy1:false
      })
      wx.stopVoice()
      return false;
    }
    _this.setData({
      yy1:true
    })
    setTimeout(function(){
      _this.setData({
        yy1:false
      })
    },_this.data.content_time*1000)
    let tempFilePath = _this.data.content_file
    wx.stopVoice()
wx.downloadFile({
  url: 'http://119.29.25.148:8088/uploaddirectory/notifyparty/wx//2017-05-04/922226b6-714d-430c-9b21-b8a65c5688e9.silk',
  success: function(res) {
    console.log(res.tempFilePath)
    wx.playVoice({
      filePath: res.tempFilePath,
      success: function(){
        console.log('播放录音')
      },
      fail:function(){
        console.log('播放失败')
      }
    })
  }
})
    // wx.playVoice({
    //   filePath: 'http://119.29.25.148:8088/uploaddirectory/notifyparty/wx//2017-05-04/922226b6-714d-430c-9b21-b8a65c5688e9.silk',
    //   success: function(){
    //     console.log('播放录音')
    //   },
    //   fail:function(){
    //     console.log('播放失败')
    //   }
    // })
  },
  onLoad:function(options){
    wx.redirectTo({
      url: 'index/index'
    })
    this.setData({
      url:app.globalData.url
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    wx.setNavigationBarTitle({
      title: '活动详情'
    })
    // 内容语音
    let content = wx.getStorageSync('content')
    if(content==''){
      this.setData({
        content_yy:false
      })
    }else{
      this.setData({
        content_yy:true,
        content_file:content
      })
    }
    this.setData({
      content_time:wx.getStorageSync('content_time')
    })
    // 通知语音
    let notice = wx.getStorageSync('notice')
    let notice_time = wx.getStorageSync('notice_time')
    if(notice != ''){
      clearInterval(timer)
      timer = setInterval(function(){
        wx.stopVoice()
        wx.playVoice({
          filePath: notice,
          success: function(){
            console.log('播放录音')
          }
        })
      },notice_time*1000)
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  aa:function(){
    if(this.data.out){
      return false;
    }
    alert(1)
  }
})