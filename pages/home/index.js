const api = require('../../utils/api');

Page({
  data: {
    question: '',
    qaResult: {},
    simpleMode: false,
    largeFont: true
  },

  onShow() {
    const app = getApp();
    this.setData({
      simpleMode: app.globalData.simpleMode,
      largeFont: app.globalData.largeFont
    });
  },

  onQuestionInput(e) {
    this.setData({ question: e.detail.value });
  },

  toggleSimpleMode() {
    const app = getApp();
    app.globalData.simpleMode = !app.globalData.simpleMode;
    this.setData({ simpleMode: app.globalData.simpleMode });
  },

  toggleLargeFont() {
    const app = getApp();
    app.globalData.largeFont = !app.globalData.largeFont;
    this.setData({ largeFont: app.globalData.largeFont });
  },

  mockVoiceInput() {
    this.setData({ question: '这株植物有毒吗？狗狗误食后怎么办？' });
  },

  async submitQa() {
    const app = getApp();
    if (!this.data.question) {
      wx.showToast({ title: '请先输入问题', icon: 'none' });
      return;
    }

    wx.showLoading({ title: 'AI分析中' });
    try {
      const result = await api.qaMultimodal({
        user_id: app.globalData.userId,
        question: this.data.question,
        image_urls: ['https://example.com/plant.jpg']
      });
      this.setData({ qaResult: result });
    } catch (err) {
      wx.showToast({ title: '分析失败，请稍后重试', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  goEmergency() {
    wx.switchTab({ url: '/pages/risk/index' });
  }
});
