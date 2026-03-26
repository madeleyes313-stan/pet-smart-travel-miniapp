const api = require('../../utils/api');

Page({
  data: {
    location: '延吉',
    risk: {},
    emergency: {}
  },

  onLocationInput(e) {
    this.setData({ location: e.detail.value });
  },

  async evaluateRisk() {
    const app = getApp();
    wx.showLoading({ title: '识别中' });
    try {
      const risk = await api.evaluateRisk({
        user_id: app.globalData.userId,
        trip_id: 'trip-demo-1',
        location: this.data.location
      });
      this.setData({ risk, emergency: {} });
    } catch (err) {
      wx.showToast({ title: '评估失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  async subscribeAlerts() {
    const app = getApp();
    if (!this.data.risk.id) {
      return;
    }
    try {
      const result = await api.subscribeAlerts({
        user_id: app.globalData.userId,
        trip_id: this.data.risk.trip_id || 'trip-demo-1',
        push_enabled: true,
        sms_enabled: true,
        vibration_enabled: true,
        calendar_enabled: true,
        daily_summary_time: '08:00'
      });
      wx.showToast({ title: `已订阅:${result.channels.join(',')}`, icon: 'none' });
    } catch (err) {
      wx.showToast({ title: '订阅失败', icon: 'none' });
    }
  },

  async loadEmergencyPlan() {
    const app = getApp();
    wx.showLoading({ title: '生成预案' });
    try {
      const emergency = await api.emergencyNearby({
        user_id: app.globalData.userId,
        pet_id: 'pet-demo-1',
        location: this.data.location,
        carried_items: ['止血纱布', '电解质水']
      });
      this.setData({ emergency });
    } catch (err) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
});
