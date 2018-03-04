//index.js
//获取应用实例
const app = getApp();
Page({
  //事件处理函数
  data: {
    w: 0,
    h: 0
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onLoad: function (e) {
    let me = this;
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          w: res.windowWidth,
          h: res.windowHeight
        });
        me.hexagon({
          element: 'firstCanvas',
          x: (me.data.w) / 2,
          y: 65,
          maxR: 65,
          color: '#eee',
          width: '1',
          arc: [{ r: '20' }, { r: '35' }, { r: '50' }, { r: '65' }],
          standard: ["语文", "数学", "英语", "政治", "地理", "化学"]
        });
      }
    })

  },
  hexagon: function (config) {
    var context = wx.createCanvasContext(config.element);
    var x = config.x;//圆心的x坐标
    var y = config.y;//圆心的y坐标
    var maxR = config.maxR;//最大半径
    var standard = config.standard;//标准线
    var angle = 360 / standard.length * 2 * Math.PI / 360;
    context.setStrokeStyle(config.color || '#000000');
    context.setLineWidth(config.width || '1');
    var arc = config.arc || [];
    //绘制六边形
    for (let i = 0; i < arc.length; i++) {
      let r = arc[i].r;
      context.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      for (let i = 1; i < standard.length; i++) {
        context.lineTo(x + r * Math.cos(angle * (i + 1)), y + r * Math.sin(angle * (i + 1)));
      }
      context.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
    }
    //绘制标准线
    for (let i = 0; i < standard.length; i++) {
      context.moveTo(x, y);
      let lineX = x + maxR * Math.cos(angle * (i + 1));
      let lineY = y + maxR * Math.sin(angle * (i + 1));
      context.lineTo(lineX, lineY);
      //绘制文字
      if (lineX < x) {
        context.fillText(standard[i], lineX - 30, lineY);
      } else {
        context.fillText(standard[i], lineX + 10, lineY);
      }
    }
    context.stroke();
    context.draw();
  }
})
