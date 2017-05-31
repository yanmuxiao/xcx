// pages/add/add.js
var app = getApp()
Page({
  data:{
    remind:['5分钟前'],
    add:false,
    toggle:false,
    icon:'/img/down.png',
    label_state:false,
    label_value:'',
    label_num:-1,
    label_sure:[1,1,1],
    label_sel:[],
    an1:false,
    rr1:false,
    yy1:false,
    an2:false,
    rr2:false,
    yy2:false,
    animationData1: {},
    animationData2: {},
    num:false
  },
  goTime:function(){
    wx.navigateTo({
      url: '../time/time'
    })
  },
  goRemind:function(){
     wx.navigateTo({
      url: '../remind/remind'
    })
  },
  goTemplate:function(){
     wx.navigateTo({
      url: '../template/template'
    })
  },
  //选择图片，拍照或者手机相册
  goImg:function(){
    let _this = this
    wx.chooseImage({
      count: 1, // 默认9
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function(res) {
            _this.setData({
              notice_img:res.savedFilePath
            })
            wx.setStorageSync('notice_img', res.savedFilePath)
          }
        })
      }
    })
  },
  // 标签切换显示隐藏
  labelToggle:function(){
    let toggle = this.data.toggle;
    let icon = this.data.icon;
    if(icon=='/img/down.png'){
      this.setData({
        icon:'/img/up.png',
        toggle:!toggle
      })
    }else{
      this.setData({
        icon:'/img/down.png',
        toggle:!toggle
      })
    }
  },
  // 已选标签的点击
  selTap:function(e){
    let value = e.currentTarget.dataset.value
    let label_sure = this.data.label_sure
    let surei = this.arrayFind(label_sure,value)
    if(surei>-1){
      label_sure.splice(surei, 1); 
    }
    this.setData({
      label_sure:label_sure
    })
  },
  // 可选标签的点击
  labelTap:function(e){
    let value = e.currentTarget.dataset.value
    let num = e.currentTarget.dataset.num
    let label_sure = this.data.label_sure
    let label_sel = this.data.label_sel
    let label_num = this.data.label_num
    let touchTime = this.data.touch_end - this.data.touch_start; 
    // 长按
    if (touchTime>350){ 
      this.setData({  
        label_num:num
      })
    }else{
      // 删除
      if(num == label_num){
        let seli = this.arrayFind(label_sel,value)
        let surei = this.arrayFind(label_sure,value)
        if(seli>-1){
          label_sel.splice(seli, 1); 
        }
        if(surei>-1){
          label_sure.splice(surei, 1); 
        }
        if(label_sel.length==0){
          this.setData({
            label_state:false
          })
        }
        this.setData({
          label_sel:label_sel,
          label_sure:label_sure,
          label_num:-1
        })
        wx.setStorageSync('label', label_sel)
        return false;
      }
      // 选择
      // 点击选择，不管添加标签层状态如何，直接隐藏
      this.setData({
          add:false
      })
      if(label_sure.indexOf(value)==-1){
        label_sure.push(value)
        this.setData({
          label_sure:label_sure,
          label_num:-1
        })
      }
    }
  },
  //开始触摸
  labelTs:function(e){
    this.setData({  
      touch_start: e.timeStamp  
    }) 
  },
  // 结束触摸
  labelTe:function(e){
     this.setData({  
       touch_end: e.timeStamp  
     })  
  },
  // 添加标签
  addLabel:function(){
    this.setData({
      add:true
    })
  },
  inputChange:function(e){
    this.setData({
      label_value:e.detail.value
    })
  },
  // 添加标签完成
  ok:function(){
    let value = this.data.label_value;
    if(value==''){
      this.setData({
        add:false
      })
      return false;
    }
    let label_sel = this.data.label_sel;
    let label_sure = this.data.label_sure;
    if(label_sel.length==0){
      this.setData({
        label_state:true
      })
    }
    if(label_sel.indexOf(value)==-1){
      label_sel.push(value)
    }
    if(label_sure.indexOf(value)==-1){
      label_sure.push(value)
    }
    this.setData({
      add:false,
      label_sel:label_sel,
      label_sure:label_sure,
      label_value:''
    })
    wx.setStorageSync('label', label_sel)
  },
  // 查找字符串在数组中的位置
  arrayFind:function(array,str){
    for(var i=0;i<array.length;i++){
      if(array[i]==str)
       return i;
    }
    return -1;
  },
  // 开始录音
  startR:function(e){
    let ty = e.target.dataset.ty
    let ty_time;
    if(ty=='content'){
      ty_time = "content_time"
      this.setData({
        rr1:false,
        an1:true
      })
    }else{
      ty_time="notice_time"
      this.setData({
        rr2:false,
        an2:true
      })
    }
    wx.showLoading({
      title: '录音中',
    })
    this.setData({
      st:e.timeStamp
    })
    var _this = this;
    wx.startRecord({
      success: function(res) {
        console.log(res.tempFilePath)
        if(_this.data.rt>1){
          wx.setStorageSync(ty_time,_this.data.rt)
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function(res) {
              wx.setStorageSync(ty,res.savedFilePath)
            }
          })
        }
      },
      fail: function(res) {
        console.log('录音失败')
      }
    })
  },
  // 结束录音
  endR:function(e){
    let ty = e.target.dataset.ty
    let rt = e.timeStamp - this.data.st
    rt = Math.ceil(rt/1000)
    this.setData({
      an1:false,
      an2:false,
      rt:rt
    })
    wx.hideLoading()
    wx.stopRecord()
    // 结束录音时根据时间判断是否要存下这段录音
    if(rt>1){
      if(ty=='content'){
        this.setData({
          content_rt:rt,
          rr1:true
        })
      }else{
        this.setData({
          notice_rt:rt,
          rr2:true
        })
      }
      // 秒数显示动画
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.width(30+rt*10).step()
      if(ty=='content'){
        this.setData({
          animationData1:animation.export()
        })
      }else{
        this.setData({
          animationData2:animation.export()
        })
      }
    }else{
      wx.showToast({
        title: '录音时间太短',
        image: '/img/tan.png',
        duration: 1000
      })
      if(ty=='content'){
        if(this.data.content_rt!=undefined){
          this.setData({
            rr1:true
          })
        }
      }else{
        if(this.data.notice_rt!=undefined){
          this.setData({
            rr2:true
          })
        }
      }
    }
  },
  // 播放录音
  playR:function(e){
    let _this = this;
    let ty = e.target.dataset.ty
    if(ty=='content'){
      if(_this.data.yy1){
        _this.setData({
          yy1:false
        })
        wx.stopVoice()
        return false;
      }
      _this.setData({
        yy1:true,
        yy2:false
      })
      setTimeout(function(){
        _this.setData({
          yy1:false
        })
      },_this.data.content_rt*1000)
    }else{
      if(_this.data.yy2){
        _this.setData({
          yy2:false
        })
        wx.stopVoice()
        return false;
      }
      _this.setData({
        yy2:true,
        yy1:false
      })
      setTimeout(function(){
        _this.setData({
          yy2:false
        })
      },_this.data.notice_rt*1000)
    }
    let tempFilePath = wx.getStorageSync(ty)
    console.log(tempFilePath)
    wx.stopVoice()
    wx.playVoice({
      filePath: tempFilePath,
      success: function(){
        console.log('播放录音')
      }
    })
  },
  editNum:function(e){
    let value =  e.detail.value
    console.log(value)
    if(value==''){
      this.setData({
        num:false,
        num_val:value
      })
    }else{
      this.setData({
        num:true,
        num_val:value
      })
    }
  },
  unlimitNum:function(){
    if(this.data.num){
      this.setData({
        num:false,
        num_val:''
      })
    }
  },
  goDetails:function(){
    wx.navigateTo({
      url: '../details/details'
    })
  },
  onLoad:function(options){
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
      title: '发起活动'
    })
    // 如果暂无缓存
    let remind = wx.getStorageSync('remind');
    let template_img = wx.getStorageSync('template_img');
    let notice_img = wx.getStorageSync('notice_img');
    if(remind==''){
      remind = '30分钟前'
    }
    if(template_img==''){
      template_img = '/img/bg2.png'
    }
    if(notice_img==''){
      notice_img = '/img/bg2.png'
    }
    this.setData({
      remind:remind,
      template_img:template_img,
      notice_img:notice_img
    })
    let label = wx.getStorageSync('label');
    // 如果缓存中不存在label，那么最初拿到的label是string，需转数组
    if(typeof label== 'string'){
      label = label.split('')
    }
    if(label.length==0){
      this.setData({
        label_state:false,
        label_sel:label
      })
    }else{
      this.setData({
        label_state:true,
        label_sel:label
      })
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})