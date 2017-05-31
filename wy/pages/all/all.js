// pages/all/all.js
var app = getApp()
Page({
  data:{
    cur:0,
    edit:false,
    icon:'/img/down.png',
    toggle:false,
    label_state:true,
    label_value:'',
    label_sure:[],
    label_sel:[],
    fuzzy:[],
    exact:[],
    num:9,
    remind:'5分钟前',
    week:['SUN','MON','TUE','WED','THU','FRI','SAT',],
    hour:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    minute:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,56,57,58,59],
    month:[{day:30,state:false,today:false,trip:false},
            {day:31,state:false,today:false,trip:false},
            {day:1,state:true,today:false,trip:false},
            {day:2,state:true,today:false,trip:false},
            {day:3,state:true,today:false,trip:true},
            {day:4,state:true,today:false,trip:false},
            {day:5,state:true,today:false,trip:true},
            {day:6,state:true,today:false,trip:false},
            {day:7,state:true,today:false,trip:false},
            {day:8,state:true,today:true,trip:false},
            {day:9,state:true,today:false,trip:false},
            {day:10,state:true,today:false,trip:false},
            {day:11,state:true,today:false,trip:false},
            {day:12,state:true,today:false,trip:false},
            {day:13,state:true,today:false,trip:false},
            {day:14,state:true,today:false,trip:false},
            {day:15,state:true,today:false,trip:false},
            {day:16,state:true,today:false,trip:false},
            {day:17,state:true,today:false,trip:false},
            {day:18,state:true,today:false,trip:false},
            {day:19,state:true,today:false,trip:false},
            {day:20,state:true,today:false,trip:false},
            {day:21,state:true,today:false,trip:false},
            {day:22,state:true,today:false,trip:false},
            {day:23,state:true,today:false,trip:false},
            {day:24,state:true,today:false,trip:false},
            {day:25,state:true,today:false,trip:false},
            {day:26,state:true,today:false,trip:false},
            {day:27,state:true,today:false,trip:false},
            {day:28,state:true,today:false,trip:false},
            {day:29,state:true,today:false,trip:true},
            {day:30,state:true,today:false,trip:false},
            {day:1,state:false,today:false,trip:false},
            {day:2,state:false,today:false,trip:false},
            {day:3,state:false,today:false,trip:false}]
  },
  //日期的点击
  dayTap:function(e){
    if(this.data.num==e.currentTarget.dataset.num){
      this.setData({
        mark:true
      })
    }else if(e.currentTarget.dataset.state){
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
  // 编辑标签
  editLabel:function(){
    this.setData({
      edit:true
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
        edit:false
      })
      return false;
    }
    let label_sure = this.data.label_sure;
    let exact = this.data.exact;
    if(label_sure.indexOf(value)==-1){
      label_sure.push(value)
      exact.push(value)
    }
    this.setData({
      edit:false,
      label_sure:label_sure,
      exact:exact,
      label_value:''
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
    let fuzzy = this.data.fuzzy
    let exact = this.data.exact
    let surei = this.arrayFind(label_sure,value)
    let fuzzyi = this.arrayFind(fuzzy,value)
    let exacti = this.arrayFind(surei,value)
    if(surei>-1){
      label_sure.splice(surei, 1); 
      if(fuzzyi>-1){
        fuzzy.splice(fuzzyi, 1); 
      }else{
        exact.splice(exacti, 1);  
      }
    }
    this.setData({
      label_sure:label_sure,
      fuzzy:fuzzy,
      exact:exact
    })
  },
  // 可选标签的点击
  labelTap:function(e){
    let value = e.currentTarget.dataset.value
    let label_sure = this.data.label_sure
    let fuzzy = this.data.fuzzy
    // 点击选择，不管添加标签层状态如何，直接隐藏
    this.setData({
        edit:false
    })
    if(label_sure.indexOf(value)==-1){
      label_sure.push(value)
      fuzzy.push(value)
      this.setData({
        label_sure:label_sure,
        fuzzy:fuzzy,
        label_num:-1
      })
    }
  },
  // 查找字符串在数组中的位置
  arrayFind:function(array,str){
    for(var i=0;i<array.length;i++){
      if(array[i]==str)
       return i;
    }
    return -1;
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
      title: '所有活动'
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