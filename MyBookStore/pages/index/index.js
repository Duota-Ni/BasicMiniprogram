//index.js
//获取应用实例


Page({
  data: {
    isDownloading: false,
    percentNum: 0,
    bookList: [{
        id: '001',
        title: 'Java编程思想',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s27243455.jpg',
        /*
        用Tomcat服务器存储book001.pdf,使用时先打开Tomcat的startup.bat，
        文件路径为C:\Program Files\apache-tomcat-9.0.31\webapps\ROOT\books
         */
        //fileUrl: 'http://localhost:8080/books/book001.pdf'
        fileUrl: 'http://localhost/books/book001.pdf'
      },
      {
        id: '002',
        title: '计算机科学概论',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s6069865.jpg',
        /*
        用IIS服务器存储book003.pdf,
        文件路径为C:\inetpub\wwwroot\books\book002.pdf
        */
        fileUrl: 'http://localhost/books/book002.pdf'
      },
      {
        id: '003',
        title: '安徒生童话',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s28036746.jpg',
        fileUrl: 'http://localhost/books/book003.pdf'
      },
      {
        id: '004',
        title: '三体1',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s2768378.jpg',
        fileUrl: 'http://localhost/books/book004.pdf'
      },
      {
        id: '005',
        title: '三体2',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s3078482.jpg',
        fileUrl: 'http://localhost/books/book005.pdf'
      },
      {
        id: '006',
        title: '三体3',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s26012674.jpg',
        fileUrl: 'http://localhost/books/book006.pdf'
      },
    ]
  },

  //封装showModal方法
  showTips: function (content) {
    wx.showModal({
      title: '提醒',
      content:content,
      showCancel: 'false'
    })
  },

  //打开图书
  openBook: function (path) {
    wx.openDocument({
      filePath: path,
      success: function (res) {
        console.log('打开图书成功')
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  saveBook:function (id,path) {
    var that = this
    wx.saveFile({
      tempFilePath: path,
      success: function (res) {
        let newPath = res.savedFilePath
        wx.setStorageSync(id, newPath)
        that.openBook(newPath)
      },
      fail: function (error) {
        console.log(error)
        that.showTips('文件保存失败！')
      }
    })
  },

  //阅读图书
  readBook: function (e) {
    
    var that = this
    let id = e.currentTarget.dataset.id
    let fileUrl = e.currentTarget.dataset.file
    let path = wx.getStorageSync(id)
    if (path == '') {
      that.setData({
        isDownloading: true
      })
      const downloadTask = wx.downloadFile({
        url: fileUrl,
        success: function (res) {
          that.setData({
            isDownloading: false
          })
          if (res.statusCode == 200) {
            path = res.tempFilePath
            that.saveBook(id, path)
          } else {
            that.showTips('暂时无法下载！')
          }
        },
        fail: function (e) {
          that.setData({
            isDownloading: false
          })
          that.showTips('无法连接到服务器！')
        }
      })

      //监听当前文件下载进度
      downloadTask.offProgressUpdate(function (res) {
        let progress = res.progress;
        that.setData({
          percentNum: progress
        })
      })
    }
    //之前下载过的，直接打开
    else {
      that.openBook(path)
    }
    wx.getSavedFileList({
      success: savedFileInfo => {
        let list = savedFileInfo.fileList
        console.log("list:", savedFileInfo.fileList)
        for (let i = 0; i < list.length; i++) {
          wx.removeSavedFile({
            filePath: list[i].filePath,
          })
          wx.clearStorage({

          })
        }
      }

    })

  }

})