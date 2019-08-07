# WeChatProgram
 这是一个**微信小程序**，用于**课堂签到**的。
 小程序客户端这边，我是这样设计的：任何一个用户在第一次使用时会进入一个“角色创建”的页面，他可以选择“老师”或“学生”的身份，填入相应的信息后点击注册按钮，就会进入首页页面。这要分两种情况，因为老师和学生看到的页面信息是不一样的：
1. 如果是老师创建，则进入的主页面有“我的课程”内容，在“我的”页面会有“添加课程”的按钮，可以通过该按钮进行课程创建。
2. 如果是学生创建，进入主页面后，不但有“我的课程”，还有“全部课程”。在“我的”页面没有课程创建按钮。
然后，当这个用户再次使用小程序时，不会再进入“角色创建”页面，而是直接进入“首页”。
### 老师角色：
 在“首页”有该用户创建的所有课程，点击其中任一课程，又要分两种情况：如果这么课程上次签到尚未停止，则进入“签到列表”页面；如果该课程上次签到结束了，则会进入“考勤页面”。在考勤页面输入考勤口令，点击考勤，即可进入“签到列表”页面。在签到列表页面有停止考勤按钮。老师可以随时停止，而不是像其他的设置一个时间，比如说：设置考勤时间为2分钟，但很多时候因为网络等各种原因，总有人签到时间过了，还没签到，老师不得不再发起一次签到，效率低下。而我设置停止按钮，老师的主动权大大提升，便于掌控。按下停止签到按钮后，停止按钮就会消失，页面会列出缺勤人员名单。老师可以在“我的”页面的考勤历史可以看到以往的考勤记录。长按课程可以删除该课程，同时也会删除该课程的考勤记录，选了该课程的学生信息也会被删除，签到信息会被删除，总之与该课程相关的一切信息会被同步删除。同时老师也可以在我的页面里查看考勤历史，可以看到以往每门课的每一次签到，会显示签到的学生列表。
 ### 学生角色：
   在“首页”可以看到“全部课程”和“我的课程”。学生可以通过在全部课程里选择相应的课程进行添加，然后在我的课程里就会看到已经添加的课程。点击“我的课程”会进行一次判断，首先会判断该课程有没有发起签到，如果没有就弹出消息“该课程尚未进行签到”如果该课程有了签到，继续判断签到是否已经结束，如果结束就弹出提醒。否则继续判断签到口令是否正确，如果口令不正确，则弹出提醒。否则继续判断是否已经签过到，如果签过了已经，就弹出提醒。否则继续判断是否在教室（这里我设置的距离是160米，超过160米的距离无法进行签到，已经是计算了60米的误差在里面了），如果不在则弹出提醒。否则就进入签到列表。
  效果图如下：
  ![ChooseIdentity](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/1.JPG "角色创建")
  
 ![consultation](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/2.jpg "客服咨询")
  ![aboutme](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/3.jpg "关于页面")
   ![feedback](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/4.jpg "意见反馈")
    ![mine](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/5.jpg "我的页面")
     ![history](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/6.jpg "历史记录")
     ![已签到名单](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/7.jpg "已签到名单")
     ![history](https://github.com/NeglectOverlook/WeChatProgram/blob/master/picture/8.jpg "历史记录")
