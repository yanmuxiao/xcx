// pages/time/time.js
var app = getApp()
Page({
  data:{
    num:8,
    cur_value:[12,12],
    tran_value:[12,12],
    new_value:[12,12],
    remind:['5分钟前'],
    mark:false,
    tp:'hour',
    keyboard:[1,2,3,4,5,6,7,8,9,'prev',0,'next'],
    week:['SUN','MON','TUE','WED','THU','FRI','SAT',],
    hour:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    minute:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
    month:[{day:''},{day:''},{day:1,disabled:true},{day:2,disabled:true},{day:3,disabled:true,trip:true},{day:4,disabled:true},{day:5,disabled:true,trip:true},{day:6,disabled:true},{day:7,disabled:true},
{day:8,today:true},{day:9},{day:10},{day:11},{day:12},{day:13},{day:14},{day:15},{day:16},{day:17},{day:18},{day:19},{day:20},{day:21},{day:22},{day:23},{day:24},{day:25},{day:26},{day:27},{day:28},{day:29,trip:true},{day:30}],
    prevMonth:false,
    nextMonth:true
  },
  // 日期的点击
  dayTap:function(e){
    if(this.data.num==e.currentTarget.dataset.num){
      this.setData({
        mark:true
      })
    }else if(!e.currentTarget.dataset.disabled){
      this.setData({
        num:e.currentTarget.dataset.num
      })
    }
  },
  // 月份的点击
  monthTap:function(){
    this.setData({
        num:0
    })
  },
  // 提醒时间跳转
  goRemind:function(){
     wx.navigateTo({
      url: '../remind/remind'
    })
  },
  // 详情跳转
  goDetails:function(){
    wx.navigateTo({
      url: '../details/details'
    })
  },
  // 显示设置时间层
  showMrak:function(){
    this.setData({
      mark:true,
      tran_value:this.data.cur_value
    })
  },
  // 隐藏设置时间层
  hideMark:function(){
    this.setData({
      mark:false,
      // 输入改变当前值，取消要恢复当前值
      cur_value:this.data.tran_value,
      // 两边联动需要
      new_value:this.data.tran_value
    })
  },
  // 时间层确定按钮
  sureMark:function(){
    this.timeOk()
  },
  // 时间层滚动事件
  bindChange: function(e) {
    this.setData({
      new_value:e.detail.value
    })
  },
  // 时间层点击事件
  timeTap:function(e){
    this.setData({
        tp:e.currentTarget.dataset.tp
    })
  },
  // 数字键盘点击事件
  keyTap:function(e){
    let tp = this.data.tp;
    let value = this.data.cur_value;
    let num = e.currentTarget.dataset.num;
    // prev事件
    if(num=='prev'){
      return false;
    }
    // next事件
    if(num=='next'){
      return false;
    }
    // 时间控制
    if(tp == 'hour'){
      let pjh = value[0]*10+num;
      if(pjh<24){
        value[0] = pjh
      }else{
        value[0] = pjh%10
      }
    }else{
      let pjm = value[1]*10+num;
      if(pjm<60){
        value[1] = pjm
      }else{
        value[1] = pjm%10
      }
    }
    // 重新填值
    this.setData({
      cur_value:value,
      new_value:value
    })
  },
  // prev点击事件
  prevTap:function(){
    if(this.data.tp=='hour'){
      return false;
    }
    this.setData({
        tp:'hour'
    })
  },
  // next点击事件
  nextTap:function(){
    if(this.data.tp=='minute'){
      this.timeOk()
    }else{
      this.setData({
          tp:'minute'
      })
    }
  },
  // 时间层确定按钮事件
  timeOk:function(){
    let value = this.data.new_value;
    value[0] = parseInt(value[0])
    value[1] = parseInt(value[1])
    if(value[0]<10){
      value[0] = '0'+value[0]
    }
    if(value[1]<10){
      value[1] = '0'+value[1]
    }
    this.setData({
      mark:false,
      cur_value:value
    })
  },
  // 获取当月，下月，下下月的所有日期
  createMonthDay() {
    let month1 = [];
    let month2 = [];
    let month3 = [];
    let today = new Date().getDate();
    this.setData({
      num:today
    })
    let yy1 = new Date().getFullYear();
    let mm1 = new Date().getMonth() + 1;
    let yy2 = yy1;
    let yy3 = yy1;
    let mm2 = mm1+1;
    let mm3 = mm1+2;
    if(mm1 == 11){
      yy3 = yy1+1;
      mm3 = 1;
    }else if(mm1 == 12){
      yy2 = yy1+1;
      yy3 = yy1+1;
      mm2 = 1;
      mm3 = 2;
    }
    let day1 = new Date(yy1, mm1, 0).getDate();
    let day2 = new Date(yy2, mm2, 0).getDate();
    let day3 = new Date(yy3, mm3, 0).getDate();
    let empty1 = new Date(yy1+"/"+mm1/+"1").getDay();
    let empty2 = new Date(yy2+"/"+mm2/+"1").getDay();
    let empty3 = new Date(yy3+"/"+mm3/+"1").getDay();
    let td = {day:''}
    for(var j=0;j<empty1;j++){
      month1.push(td);
    };
    for(var j=0;j<empty2;j++){
      month2.push(td);
    };
    for(var j=0;j<empty3;j++){
      month3.push(td);
    };
    for(var i=1;i<=day1;i++){
      let tdtd = {day:i}
      // 是否是今天，是否今天之前
      if(i<today){
        tdtd['disabled'] =true
      }else if(i==today){
        tdtd['today'] =true
      }
      // 是否有行程
      if(i==18){
        tdtd['trip'] =true
      }
      month1.push(tdtd);
    };
    for(var i=1;i<=day2;i++){
      let tdtd = {day:i}
      month2.push(tdtd);
    };
    for(var i=1;i<=day3;i++){
      let tdtd = {day:i}
      month3.push(tdtd);
    }
    this.setData({
      month:month1,
      month1:month1,
      month2:month2,
      month3:month3
    })
  },
  // 月份的切换
  nextMonth:function(){
    if(this.data.prevMonth){
      this.setData({
        month:this.data.month3,
        nextMonth:false
      })
    }else{
      this.setData({
        month:this.data.month2,
        prevMonth:true
      })
    }
  },
  prevMonth:function(){
    if(this.data.nextMonth){
      this.setData({
        month:this.data.month1,
        prevMonth:false
      })
    }else{
      this.setData({
        month:this.data.month2,
        nextMonth:true
      })
    }
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
      title: '活动时间'
    })
    this.setData({
      remind:wx.getStorageSync('remind')
    })

    this.createMonthDay()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})