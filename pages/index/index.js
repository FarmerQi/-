//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '阿心',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    confirmButton:'再见',
    exitButton:'loading',
    imageSrc:'../../resource/icons/scan/scan.png',
    paySrc: '../../resource/icons/pay/alipay.png',
    pic: '../../resource/icons/pic/pic.png',
    picPath: '../../resource/icons/pic/picNotFound.png'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  choosePic:function(){
    var picThis = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album','camera'],
      success: function(res) {
        console.log(res.tempFiles)
        var picSize = res.tempFiles[0].size
        var picPath = res.tempFiles[0].path
        var picSizeFormatted = picSize/1024;
        picThis.setData({
            picPath: picPath,
            motto: picSizeFormatted.toFixed(2) + ' byte',
        })
      },
      fail: function(){
        
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scanQR:function(e){
    var myThis = this;
    wx.scanCode({
      success(res){
        console.log(res)
        myThis.setData({
          motto: res.result,
        })
      }
    })
  },
  scanQRAndLoadPage:function(e){
    var myThis = this;
    wx.scanCode({
      success(res){
        wx.navigateTo({
          url: '../web/web?url=' + res.result,
        })
      }
    })
  },
  loadNewPage:function(e){
    wx.navigateTo({
      url: '../camera/camera',
    })
  }
})
