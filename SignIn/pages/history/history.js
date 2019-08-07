// pages/history/history.js
Page({

  data: {
    student_lesson: [],
  },
  historyRecord:function(e){
    var lessonid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../historylist/historylist?lessonid=' + lessonid + ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = wx.getStorageSync('openid');//用户id
      wx.request({
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'https://www.xxxx.com',
        data: {
          userid: userid,
          flag: 'teacherc'
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            student_lesson: res.data
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '获取信息失败',
            icon: 'none'
          })
        },
        complete: function (res) {
          if (res.data == '') {
            wx.showToast({
              title: '还没有考勤记录哦！',
              icon: 'none'
            })
          }
        }
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