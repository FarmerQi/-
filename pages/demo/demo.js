// pages/demo/demo.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      photos:[],
      hidden:true,
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
  

   
})