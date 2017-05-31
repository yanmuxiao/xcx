Page({
  data: {
    items: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: true},
      {name: 'BRA', value: '巴西'},
      {name: 'JPN', value: '日本'},
      {name: 'ENG', value: '英国'},
      {name: 'FRA', value: '法国'}
    ],
    singleChecked: false
  },
  checkboxChange: function(e){
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);
  },
  singleChange: function(e){
      this.setData({
          singleChecked: !this.data.singleChecked
      })
      if(this.data.singleChecked){
        console.log(true);
      }else{
        console.log(false);
      }
  }
})