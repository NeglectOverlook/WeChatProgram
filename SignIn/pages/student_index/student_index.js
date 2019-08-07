// pages/student_index/student_index.js
Page({
  data: {
    student_lesson: [],
    bgcolor1: "gainsboro",
    bgcolor2: "white",
    viewhidden1:'block', 
    viewhidden2:'none',
    ismine: false
  },
  all: function () {
    var that = this;
    wx.request({
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: 'https://www.xxxx.com',
      data: {
        flag: 'allc'
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
        // wx.showLoading({
        //   title: '加载中',
        // })
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 1000)
        if (res.data == '') {
          wx.showToast({
            title: '还没有创建课程哟！',
            icon: 'none'
          })
        }
      }
    })
    this.setData({
      bgcolor1: "gainsboro",
      bgcolor2: "white",
      ismine: false
    })
  },
  mine: function () {
    this.setData({
      bgcolor1: "white",
      bgcolor2: "gainsboro",
      ismine: true
    })
    var that = this;
    var userid = wx.getStorageSync('openid');//用户id
    wx.request({
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: 'https://www.xxxx.com',
      data: {
        userid: userid,
        flag:'myc'
      },
      success: function (res) {
        //console.log(res.data);
        if (res.data == null) {
          that.setData({
            student_lesson: ""
          })
        } else {
          that.setData({
            student_lesson: res.data
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
      complete: function (res) {
        // wx.showLoading({
        //   title: '加载中',
        // })
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 1000)
      }
    })
  },
  addlesson: function (e) {
    var lessonid = e.currentTarget.dataset.id;
    console.log('课程编号：'+lessonid);
    var slesson = e.currentTarget.dataset.lesson;
    console.log('课程名：' + slesson);
    var userid = wx.getStorageSync('openid');//用户id
    if (this.data.ismine == false) {
      wx.showModal({
        title: slesson,
        content: '是否添加到"我的课程"?',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.xxxx.com',
              data: {
                lessonid: lessonid,
                userid: userid,
                flag:'saddc'
              },
              method: 'POST',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                if (res.data === "yes") {
                  wx.showToast({
                    title: '已经添加过了',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: '添加成功',
                    icon: 'success'
                  })
                }
              },
              fail: function (res) {
                console.log("添加课程失败学生");
               },
            })
          } else {
            console.log('用户点击取消');
          }

        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/sign/sign?lessonid=' + lessonid + '&slesson=' + slesson + ''
      })
    }
  },
  chooselesson:function(e){
    var lessonid = e.currentTarget.dataset.id;
    console.log('进入考勤获取ID：' + lessonid);
    var slesson = e.currentTarget.dataset.lesson;
    console.log('课程名：' + slesson);
    wx.request({
      url: 'https://www.xxxx.com',
      data: {
        id: lessonid,
        flag:'judge'
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == 1) {
          wx.navigateTo({
            url: '../signlist/signlist?lessonid=' + lessonid + ''
          })
        } else {
          wx.navigateTo({
            url: '../check/check?lessonid=' + lessonid + '&slesson=' + slesson + ''
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })

  }, 
  deletelesson:function(e){
    var lessonid = e.currentTarget.dataset.id;
    console.log('进入删除获取ID：' + lessonid);
    var slesson = e.currentTarget.dataset.lesson;
    console.log('删除课程名：' + slesson);
    wx.showModal({
      title: '删除课程',
      content: '确定要删除《' + slesson + '》吗。会删除相关的所有记录。',
      showCancel: true,//是否显示取消按钮
      cancelText: "取消",//默认是“取消”
      cancelColor: 'black',//取消文字的颜色
      confirmText: "确定",//默认是“确定”
      confirmColor: 'black',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.request({
            url: 'https://www.xxxx.com',
            data: {
              id: lessonid,
              flag: 'delete'
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })

            },
            fail: function (res) { },
            complete: function (res) {

            },
          })

        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
    

  },
  onPullDownRefresh: function () { //下拉刷新
    var that = this;
    var identify = wx.getStorageSync("identify");
    if (identify == 'teacher') {
      wx.showNavigationBarLoading(); //在标题栏中显示加载动画
      var userid = wx.getStorageSync('openid');
      wx.request({
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'https://www.xxxx.com',
        data: {
          userid: userid,
          flag: 'teacherc'
        },
        success: function (res) {
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
          wx.hideNavigationBarLoading(); //完成停止加载
          wx.stopPullDownRefresh(); //停止下拉刷新
        },
      })
    } else {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var identify = wx.getStorageSync("identify");
    console.log("identify:"+identify);
    var userid = wx.getStorageSync('openid');//用户id
    if(identify=='teacher'){
      that.setData({
        viewhidden1: 'none',
        viewhidden2: 'block'
      })
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
          // wx.showLoading({
          //   title: '加载中',
          // })
          // setTimeout(function () {
          //   wx.hideLoading()
          // }, 1000)
          if (res.data == '') {
            wx.showToast({
              title: '还没有创建课程哟！',
              icon: 'none'
            })
          }
        }
      })


    }
    else{
      wx.request({
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'https://www.xxxx.com',
        data: {
          flag: 'allc'
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
          wx.showLoading({
            title: '加载中',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
          if (res.data == '') {
            wx.showToast({
              title: '还没有创建课程哟！',
              icon: 'none'
            })
          }
        }
      })

    }
    

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