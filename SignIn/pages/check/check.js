// pages/check/check.js
Page({

  data: {
    signKey: "",
    lessonid: '',
    latitude: "",
    longitude: ""
  },

  keyInput: function (e) {
    this.setData({
      signKey: e.detail.value
    })
    wx.setStorageSync('signKey', e.detail.value);
  },
  GPSsubmit: function (e) {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res);
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.kaoqin();
      },
      fail: function (res) { 
        wx.showModal({
          title: '是否授权位置信息',
          content: '你需要授权位置信息才可以发起签到',
          showCancel: true,//是否显示取消按钮
          cancelText: "否",//默认是“取消”
          cancelColor: 'black',//取消文字的颜色
          confirmText: "是",//默认是“确定”
          confirmColor: 'black',//确定文字的颜色
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success(res) {
                }
              })
            } else if (res.cancel) {
              wx.showToast({
                title: '你取消了授权！',
                icon: 'none'
              });
            }
          }
        });
      }

    }) 
  },
  kaoqin: function () {
    var that = this;
    if (that.data.signKey != "") {
      console.log(that.data.signKey);
      console.log("考勤时ID:"+that.data.lessonid);
      wx.request({
        url: 'https://www.xxxx.com',
        data: {
          id: that.data.lessonid,
          signKey: that.data.signKey,
          weidu:that.data.latitude,
          jingdu:that.data.longitude,
          flag:'saveSign'
        },
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res.data);
           //转到查看考勤名单页面
          wx.redirectTo({
            url: '../signlist/signlist?lessonid=' + that.data.lessonid + ''
          });
        },
      })
    } else {
      wx.showToast({
        title: '口令为不能为空',
        icon: 'none'
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({ title: options.slesson });
    this.setData({
      lessonid: options.lessonid
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