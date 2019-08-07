// pages/historylist/historylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [],
    index: ""
  },
  chooserecord: function (e) {
    var checkid = e.currentTarget.dataset.keyid;
    console.log("看看考勤ID:" + checkid);
    wx.navigateTo({
      url: '../hsignlist/hsignlist?checkid=' + checkid + ''
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.xxxx.com',
      data: {
        lessonid: options.lessonid,
        flag:'history'
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        if (res.data == null||res.data=='') {
          wx.showToast({
            title: '暂无考勤纪录',
            icon: 'none',
            duration:2500
          })
        } else {
          that.setData({
            record: res.data
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

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

  }
})