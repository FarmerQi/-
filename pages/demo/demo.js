// pages/demo/demo.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      photos:[],
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
            items.push({
              src:tempFilePaths[i]
            })
          }
          myThis.setData({
            photos:items
          })
        },
      })
   }
})