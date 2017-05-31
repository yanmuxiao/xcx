
var Mock  = require('../../utils/mock.js');



var contentClist = ['广告主', '品牌', '形式', '数量', '任务地址', '活动名称'];
var courselImg = ['coursel-01.jpg', 'coursel-02.jpg', 'coursel-03.jpg', 'coursel-04.jpg'];
var oIndex = 0;//加载次数限制


Page({
  data: {
      coursel: courselImg,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1200,
      contentClist: contentClist
  },
  onLoad: function () {

      var initTaskList = Mock.mock({
          'taskList|10': [{
            'taskName|10-40': '',
            'taskTime|1': '2016-10-16 至 2016-12-01',
            'taskContent': ['Adidas', 'Running', '拍照', Math.floor(Math.random()*20), 'South Shanxi Road2016_adidas_running_SHM_Oct_OOH(Pre)', '我是活动名称'],
            'taskFoot': ['上刊23', '刊中5', '换画9', '下刊16']
          }]
      });
      this.setData({
          taskList: initTaskList.taskList
      })


      // Mock.mock('http://g.cn', {
      //     'list|1-10': [{
      //       'taskName|10-40': '',
      //       'taskTime|1': '2016-10-16 至 2016-12-01',
      //       'taskContent': ['Adidas', 'Running', '拍照', '5', 'South Shanxi Road2016_adidas_running_SHM_Oct_OOH(Pre)', '我是活动名称'],
      //       'taskFoot': ['上刊23', '刊中5', '换画9', '下刊16']
      //     }]
      // });
      // var _this = this;
      // wx.request({
      //   url: 'http://g.cn',
      //   dataType:'json',
      //   success: function(res){
      //     console.log(res)
      //       _this.setData({
      //           taskList: res.data.taskList
      //       })
      //   }
      // })
      
     
    
  },
   onPullDownRefresh: function () {

        // console.log('onPullDownRefresh', new Date());

        var newTaskList = Mock.mock({
            'taskList|5': [{
                'taskName|1': '我是筛新后的任务',
                'taskTime|1': '2016-10-16 至 2016-12-01',
                'taskContent': ['Adidas', 'Running', '拍照', Math.floor(Math.random()*20), 'South Shanxi Road2016_adidas_running_SHM_Oct_OOH(Pre)', '我是活动名称'],
                'taskFoot': ['上刊23', '刊中5', '换画9', '下刊16']
            }]
        });


        this.data.taskList = newTaskList.taskList;
        var _this = this;
        setTimeout(function(){
            wx.stopPullDownRefresh();
            oIndex = 0;
            _this.setData({
                taskList: _this.data.taskList
            });
        },1000)
    },
   onReachBottom:function(){

      var addTaskList = Mock.mock({
            'taskList|5': [{
                'taskName|1': '多加载了5个任务',
                'taskTime|1': '2016-10-16 至 2016-12-01',
                'taskContent': ['Adidas', 'Running', '拍照', oIndex, 'South Shanxi Road2016_adidas_running_SHM_Oct_OOH(Pre)', '我是活动名称'],
                'taskFoot': ['上刊23', '刊中5', '换画9', '下刊16']
            }]
        });
        if(oIndex <= 3){
            this.data.taskList = this.data.taskList.concat(addTaskList.taskList);
            this.setData({
                taskList: this.data.taskList
            });
            oIndex++;
        }else{
            wx.showToast({title:"没有更多内容了"});
        }
  }
});
