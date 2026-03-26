const api = require('../../utils/api');

Page({
  data: {
    enableDemoTools: false
  },

  onShow() {
    const app = getApp();
    this.setData({
      enableDemoTools: !!app.globalData.enableDemoTools
    });
  },

  requestLocation() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: () => wx.showToast({ title: '位置授权成功', icon: 'success' }),
      fail: () => wx.showToast({ title: '位置授权失败', icon: 'none' })
    });
  },

  requestRecord() {
    wx.authorize({
      scope: 'scope.record',
      success: () => wx.showToast({ title: '录音授权成功', icon: 'success' }),
      fail: () => wx.showToast({ title: '录音授权失败', icon: 'none' })
    });
  },

  requestAlbum() {
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success: () => wx.showToast({ title: '相册授权成功', icon: 'success' }),
      fail: () => wx.showToast({ title: '相册授权失败', icon: 'none' })
    });
  },

  toggleSimpleMode() {
    const app = getApp();
    app.globalData.simpleMode = !app.globalData.simpleMode;
    wx.showToast({ title: app.globalData.simpleMode ? '已开启简化模式' : '已关闭简化模式', icon: 'none' });
  },

  toggleLargeFont() {
    const app = getApp();
    app.globalData.largeFont = !app.globalData.largeFont;
    wx.showToast({ title: app.globalData.largeFont ? '已开启大字号' : '已关闭大字号', icon: 'none' });
  },

  async seedSuccessMode() {
    wx.showLoading({ title: '造数中' });
    try {
      const result = await api.seedMock({ mode: 'success' });
      wx.showToast({
        title: `成功模式: ${result.dispatched_events}条`,
        icon: 'none',
        duration: 2200
      });
    } catch (err) {
      wx.showToast({ title: `失败: ${this._errText(err)}`, icon: 'none', duration: 2800 });
    } finally {
      wx.hideLoading();
    }
  },

  async seedStressMode() {
    wx.showLoading({ title: '压测中' });
    try {
      const result = await api.seedMock({ mode: 'stress' });
      wx.showToast({
        title: `压测告警: ${result.triggered_alerts}条`,
        icon: 'none',
        duration: 2200
      });
    } catch (err) {
      wx.showToast({ title: `失败: ${this._errText(err)}`, icon: 'none', duration: 2800 });
    } finally {
      wx.hideLoading();
    }
  },

  _errText(err) {
    if (!err) return '网络异常';
    if (err.statusCode) return `${err.statusCode}`;
    if (err.errMsg) return err.errMsg;
    return '请求失败';
  }
});
