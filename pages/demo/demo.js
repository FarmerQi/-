// pages/demo/demo.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      iconSize:20,
      animation:{},
      animationBottom:{},
      photos:[],
      hidden:true,
      tapLock:false,
      isBottomHide:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration:500,
      timingFunction: 'ease',      
    })
    this.animationBottom = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 
   *添加图片 */ 
   chooseImage:function(){
      var myThis = this;
      var items = myThis.data.photos;
      wx.chooseImage({
        count:9,
        sizeType: ['original','compressed'],
        sourceType: ['album','camera'],
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          for(var i = 0; i < tempFilePaths.length; i++){
            console.log(tempFilePaths[i])
            items.push(
              tempFilePaths[i]
            )
          }
          myThis.setData({
            photos:items
          })
        },
      })
   },
   previewImage:function(e){
     if(this.data.tapLock){
       return;
     }
     console.log("这是tap")
     console.log(e);
     console.log(e.currentTarget.dataset.index)
     var current = e.currentTarget.dataset.src;    
     wx.previewImage({
       current: current,
       urls: this.data.photos,
     })
     console.log(this.data.photos)
   },
   deleteImage:function(e){
     console.log(e)
     var index = e.currentTarget.dataset.index;
     var photos = this.data.photos;
     photos.splice(index,1);
     this.setData({
       photos:photos,
     })
   },
  touchend:function(){
    if(this.data.tapLock){
      setTimeout(() => {
        this.setData({
          tapLock:false
        }),100
      })
    }
  },
   changeHiddenStatus:function(){
     this.setData({
       tapLock:true
     })
     console.log('这是longPress')
     var status = this.data.hidden;
     this.setData({
       hidden:!status
     })
     this.showButton();
     this.scale();
   },

   scale:function(){
     this.animation.scale(2).step()
     this.animation.rotate(90).step()
     this.animation.rotate(-90).step()
     this.setData({
       animation:this.animation.export()
     })
   },
   scaleBack:function(){
     this.animation.scale(1).step()
     this.animation.rotate(-90).step()
     this.animation.rotate(90).step()
     this.setData({
       animation:this.animation.export()
     })
   },

   rotate:function(){
     this.animation.rotate(90).step()
     this.animation.rotate(-90).step()
      this.setData({ animation: this.animation.export() })
   },

  hideButton:function(){
    var height = wx.getSystemInfoSync().windowHeight;
    var width = wx.getSystemInfoSync().windowWidth;
    var screenHeight = wx.getSystemInfoSync().screenHeight;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    console.log("height: " + height +"; width: " + width);
    console.log("screenHeight: " + screenHeight + ";screenWidth: " + screenWidth);
    var moveHeight = height * 0.15;
    console.log(moveHeight)
    this.animationBottom.translateY(moveHeight).step();
    
    // 使删除图标回复原本状态
    this.animation.scale(1).step()
    var status = this.data.hidden;
    var myThis = this;
    this.setData({
      animationBottom: this.animationBottom.export(),
      animation: this.animation.export(),
      hidden: !status,
      
    })
   },
   showButton:function(){
     var height = wx.getSystemInfoSync().windowHeight;
     var moveHeight = height * 0.15;
     console.log(moveHeight);
     this.animationBottom.translateY(-moveHeight).step();
     this.setData({
       animationBottom: this.animationBottom.export()
     })
   }   
})