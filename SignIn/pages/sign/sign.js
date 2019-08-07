// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据  
   */
  data: {
    signKey: "",
    id: "",
    latitude: "",
    longitude: ""
  },

  keyInput: function (e) {
    this.setData({
      signKey: e.detail.value
    })
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
        this.sign();
      },
      fail: function (res) {
        wx.showModal({
          title: '是否授权位置信息',
          content: '你需要授权位置信息才可以进行签到',
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
  sign: function () {
    var that = this;
    var userid = wx.getStorageSync('openid'); //用户id
    if (this.data.signKey != "") {
      wx.request({
        url: 'https://www.xxxx.com',
        data: {
          id: that.data.id,
          key:that.data.signKey,
          userid: userid,
          weidu: that.data.latitude,
          jingdu: that.data.longitude,
          flag:'sign'
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          if (res.data!='no') {
            if (res.data != 'over') {
              if (res.data!='false') {
                if (res.data != 'done') {
                  if (res.data != 'dis') {
                    wx.showToast({
                      title: '签到成功',
                      icon: 'success'
                    })
                    wx.redirectTo({
                      url: '../ssignlist/ssignlist'
                    })
                  } else {
                    wx.showToast({
                      title: '不在签到范围！',
                      icon: 'none'
                    })
                  }
                } else {
                  wx.showToast({
                    title: '已经签过了哟！',
                    icon: 'none'
                  })
                }
              } else {
                wx.showToast({
                  title: '签到口令错误！',
                  icon: 'none'
                })
              }
            } else {
              wx.showToast({
                title: '签到已经结束!',
                icon: 'none'
              })
            }
          } else {
            wx.showToast({
              title: '该课程没有发起签到!',
              icon: 'none'
            })
          }
        },
        fail: function (res) {
          console.log("签到失败");
         },
        complete: function (res) { },
      })
      //console.log(this.data.signKey)
    } else {
      wx.showToast({
        title: '签到口令为空',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.lessonid
    })
    wx.setNavigationBarTitle({
      title: options.slesson
    })
    wx.setStorageSync('lessonid', options.lessonid);

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