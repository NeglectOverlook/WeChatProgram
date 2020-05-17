//app.js
App({
  onLaunch: function () {
   
    var OPEN_ID = '';
    wx.login({
      success: function (res) { 
        

        var code = res.code;
        if (code) {
          wx.request({  
            url: 'https://www.xxxx.com',
            data: {
              js_code: code,
              flag:'login'
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              OPEN_ID = res.data.openid;
              var SESSION_KEY = res.data.session_key;
              
              wx.setStorageSync('openid', OPEN_ID); 
              wx.request({
                url: 'https://www.xxxx.com',
                data: {
                  userid: OPEN_ID,
                  flag: 'guide'
                },
                method: 'POST',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  var state = res.data;
                  if (state == 'student') {
                    wx.setStorageSync("identify", state);
                    wx.switchTab({
                      url: '/pages/student_index/student_index'
                    });
                  }
                  else if (state == 'teacher') {
                    wx.setStorageSync("identify", state);
                    wx.switchTab({
                      url: '/pages/student_index/student_index'
                    });
                   
                  }
                  else {
                    console.log("unknow");
                    wx.redirectTo({ 
                      url: '/pages/index/index',
                    });
                  }
                },
                fail: function (res) {
                },
                complete: function (res) { },
              })

            }
          })
        }
        else { 
         
        }
      },
      fail: function (res) {
        
      },
      complete: function (res) { },
    })
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)

  },
   globalData: {
    userInfo: null
  },
})
