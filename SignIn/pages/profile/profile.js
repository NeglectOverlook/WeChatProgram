const App = getApp();
Page({
  data: {
    userInfo: {},
    winHeight: 0,
    winWidth: 0,
    hiddenmodalput: true,
    viewhidden1: 'none',
    viewhidden2: 'block',
    slesson: "",
    sclass: ""
  },
  
  onLoad: function (options) {
    var that = this;
    var identify = wx.getStorageSync("identify");
    console.log("profile_identify:" + identify);
    if (identify == 'teacher') {
      that.setData({
        viewhidden1: 'block',
        viewhidden2: 'none'
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        console.log("高度：" + res.windowHeight);
        console.log("宽度：" + res.windowWidth);
        that.setData({
          winHeight: res.windowHeight,
          winWidth: res.windowWidth
        })
      }
    })
    this.getUserInfo();
  },

  getUserInfo() {
    var that=this;
    const infomation = App.globalData.userInfo
    console.log("我的页面用户信息" + infomation);
    if (infomation) {
      console.log("进了有信息"); 
      that.setData({
        userInfo: infomation
      })
      return
    }
    wx.getUserInfo({
      success(res) {
        console.log("我获取信息了");
        console.log(res.userInfo);
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  modalinput: function (e) {
    this.setData({
      hiddenmodalput: false,
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
    });
  },
  confirm: function (e) {
    var that = this;
    that.setData({
      hiddenmodalput: true,
    })
    if ((that.data.slesson && that.data.sclass) != '') {
      that.addCourse();
      that.setData({
        slesson: "",
        sclass: "",
      })
    } else {
      wx.showToast({
        title: '输入为空',
        icon: 'none'
      })
    }
  },
  addCourse: function () {
    var that = this;
    var userid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://www.xxxx.com',
      data: {
        userid: userid,
        slesson: that.data.slesson,
        sclass: that.data.sclass,
        flag: 'addc'
      },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '课程添加成功！',
          icon: 'success'
        })
      },
      fail: function (res) {
        console.log("课程添加失败");
      },
      complete: function (res) {
       }, 
    })
  },
  myInfomation: function () {
    wx.navigateTo({
      url: '../myinfo/myinfo'
    })

  },
  feedback:function(){
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  historykaoqin:function(){
    wx.navigateTo({
      url: '../history/history'
    })
  },
  aboutme:function(){
    wx.navigateTo({
      url: '../aboutWe/aboutWe'
    })
  },
  setlesson: function (e) {
    this.setData({ slesson: e.detail.value })
  },
  setclass: function (e) {
    this.setData({ sclass: e.detail.value })
  },
 

})