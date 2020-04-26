
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput1: true,
    hiddenmodalput2: true,
    sname: "",
    snum: "",
    tname: "",
    tnum: "",
  },
  modalinput1: function (e) {
    if (e.detail.userInfo) {
      this.setData({
        hiddenmodalput1: !this.data.hiddenmodalput1,
      });
    } else {
      wx.showToast({
        title: '需要授权哦！',
        icon: 'none'
      });
    }
  },
  modalinput2: function (e) {
  if(e.detail.userInfo){
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2,
    })
  } else {
    wx.showToast({
      title: '需要授权哦！',
      icon: 'none'
    });
  }
    
  },
  goLesson: function () {
    wx.navigateTo({ url: '../lesson/lesson' })
  },

  cancel1: function () {
    this.setData({
      hiddenmodalput1: true,
    });
  },
  cancel2: function () {
    this.setData({
      hiddenmodalput2: true,
    });
  },

  confirm1: function (e) {
    var that = this;
    this.setData({
      hiddenmodalput1: true,
    })
    if ((that.data.sname && that.data.snum)!='') {
      var userid = wx.getStorageSync('openid');
      
      wx.request({
        url: 'https://www.xxxx.com',
        data: {
          userid: userid,
          sname: that.data.sname,
          snum: that.data.snum,
          flag:'student'  
        },
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
            wx.showToast({
              title: '注册成功！',
              icon: 'success'
            })
          wx.setStorageSync("identify", "student");
          wx.switchTab({
            url: '/pages/student_index/student_index'
          });
            
        },
        fail: function (res) {
          
        },
        complete: function (res) { },
      })
    } else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
  },
  confirm2: function (e) {
    var that = this;
    this.setData({
      hiddenmodalput2: true,
    })
    if ((that.data.tname && that.data.tnum) != '') {
      var userid = wx.getStorageSync('openid');
      wx.request({
        url: 'https://www.xxxx.com',
        data: {
          userid: userid,
          tname: that.data.tname,
          tnum: that.data.tnum,
          flag:'teacher'
        },
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
            wx.showToast({
              title: '注册成功！',
              icon: 'success'
            })
          wx.setStorageSync("identify", "teacher");
          wx.switchTab({
            url: '/pages/student_index/student_index'
          });
        },
        fail: function (res) {
         
        },
        complete: function (res) { },
      })
      this.setData({
        tname: "",
        tnum: "",
      })
    } else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
  },

  //获取input的信息
  setname: function (e) {
    this.setData({ sname: e.detail.value })
  },
  setnum: function (e) {
    this.setData({ snum: e.detail.value })
  },
  setlesson: function (e) {
    this.setData({ tname: e.detail.value })
  },
  setclass: function (e) {
    this.setData({ tnum: e.detail.value })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var identify = wx.getStorageSync("identify");
    if(identify=='student'||identify=='teacher'){
      console.log("identify:" + identify);
  
    }
    
    
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
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
    this.setData({
      hiddenmodalput: true
    })

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
