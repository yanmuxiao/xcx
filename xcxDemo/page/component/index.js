

var indexApp = getApp();//获取全局公用的属性或方法，即app.js中的变量



var indexData = {
        name : "小程序组件",
        title : "当前已完成的小程序组件演示",
        list : [
            {
                id: 'view',
                name: '视图容器',
                open: false,
                pages: ['view', 'scroll-view', 'swiper']
            },{
                id: 'content',
                name: '基础内容',
                open: false,
                pages: ['text', 'icon', 'progress']
            },{
                id: 'form',
                name: '表单组件',
                open: false,
                pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch']
            }, {
                id: 'feedback',
                name: '操作反馈',
                open: false,
                pages: ['action-sheet', 'modal', 'toast', 'loading']
            }, {
                id: 'nav',
                name: '导航',
                open: false,
                pages: ['navigator']
            }, {
                id: 'media',
                name: '媒体组件',
                open: false,
                pages: ['image', 'audio', 'video']
            }, {
                id: 'map',
                name: '地图',
                pages: ['map']
            }, {
                id: 'canvas',
                name: '画布',
                pages: ['canvas']
            }
        ]
};


Page({
    //页面的初始数据
    data : indexData,
    widgetsToggle : function(e){
        var id = e.currentTarget.id,list=this.data.list;
        for(var i=0;i<list.length;i++){
            if(list[i].id == id){
                list[i].open = !list[i].open;
            }else{
                list[i].open = false;
            }
        }

        this.setData({
            list : list
        })
    }

});

