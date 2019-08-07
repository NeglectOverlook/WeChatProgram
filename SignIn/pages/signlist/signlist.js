// pages/signlist/signlist.js
Page({
  data: {
    signList: [],
    length1: 0,
    hiddenSign: false,
    lessonid: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    that.setData({
      lessonid: e.lessonid
    })
  },
  stopSign: function (e) {
    var that = this;
    this.onPullDownRefresh();
    var signKey = wx.getStorageSync('signKey'); //课程id
    var sList = wx.getStorageSync('sList') || [];
    wx.request({
      url: 'https://www.xxxx.com',
      data: {
        id: that.data.lessonid,
        flag:'stops'
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          hiddenSign: !that.data.hiddenSign
        })
        wx.showToast({
          title: '取消成功',
          icon: 'success'
        })
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onPullDownRefresh: function () { //下拉刷新
    var that = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载动画
    wx.request({
      url: 'https://www.xxxx.com',
      data: {
        lessonid: that.data.lessonid,
        flag: 'sslist' 
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          that.setData({
            signList: res.data,
            length1: res.data.length
          })
          wx.setStorageSync('signList', res.data); //将获取信息写入本地缓存
      },
      fail: function (res) {
        console.log("获取签到失败！");
      },
      complete: function (res) {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://www.xxxx.com',
      data: {
        lessonid: that.data.lessonid,
        flag: 'sslist'
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
          that.setData({
            signList: res.data,
            length1: res.data.length,
          })
      },
      fail: function (res) {
        console.log("展示失败！")
       },
      complete: function (res) { },
    })
  },
})