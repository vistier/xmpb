//index.js
//获取应用实例
import config from '../../config';

var app = getApp();

Page({
  data: {
    userInfo: {},
    longitude: 118.125000,
    latitude: 24.500000,
    markers:[],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      });
    });

    app.getLocation(res => {
        let {longitude, latitude, speed, accuracy} = res;
        console.info(res);
        let {markers} = that.data;
        markers.unshift({
          id: 0,
          latitude,
          longitude
        });
        that.setData({
          longitude, 
          latitude,
          markers,
        })
    });

    // 加载自行车点
    let markers = config.map(({id, name, lng, lat}) => {
        console.log(id, name, lng, lat)
        return {
          longitude: lng, 
          latitude: lat,
          id,
          title: name,
        };
    })

    this.setData({
      markers
    });
  },

  onMarkerClick({markerId}) {
    let marker = config.filter(item => item.id === markerId);
    console.log(marker);
  }
})
