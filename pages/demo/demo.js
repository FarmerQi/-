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
      duration: 500,
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

  //  预览照片
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

  //  删除图片
   deleteImage:function(e){
     console.log(e)
     var index = e.currentTarget.dataset.index;
     var photos = this.data.photos;
     photos.splice(index,1);
     this.setData({
       photos:photos,
     })
   },

  //  重写点击事件函数，来解决longtap 和tap冲突
  touchend:function(){
    if(this.data.tapLock){
      setTimeout(() => {
        this.setData({
          tapLock:false
        }),100
      })
    }
  },

  // 改变删除元素的显示状态，同时控制动画流程
   changeHiddenStatus:function(){
     var status = this.data.hidden;
     this.setData({
       tapLock:true,
       hidden: !status
     })

     this.animation.scale(2).step()
     this.animation.rotate(90).step()
     this.animation.rotate(-90).step()
     

     var height = wx.getSystemInfoSync().windowHeight;
     var moveHeight = height * 0.15;
     console.log(moveHeight);
     this.animationBottom.translateY(-moveHeight).step();

     this.setData({
       animation: this.animation.export(),
       animationBottom: this.animationBottom.export()
     })
   },

  // 让元素放大2倍并正反旋转90度
   scale:function(){
     this.animation.scale(2).step()
     this.animation.rotate(90).step()
     this.animation.rotate(-90).step()
     this.setData({
       animation:this.animation.export()
     })
   },

  //  与上方函数功能相反
   scaleBack:function(){
     this.animation.scale(1).step()
     this.animation.rotate(-90).step()
     this.animation.rotate(90).step()
     this.setData({
       animation:this.animation.export()
     })
   },
  // 元素旋转
   rotate:function(){
     this.animation.rotate(90).step()
     this.animation.rotate(-90).step()
      this.setData({ animation: this.animation.export() })
   },
  // 隐藏按钮
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
    // 使删除图标回复
    this.animation.scale(1).step()
    

    var status = this.data.hidden;
    var myThis = this;
    this.setData({
      animationBottom: this.animationBottom.export(),
      animation: this.animation.export(),
      hidden: !status,
      
    })
   },

  //  显示按钮
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