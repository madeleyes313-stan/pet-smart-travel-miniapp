const api = require('../../utils/api');

Page({
  data: {
    form: {
      origin: '长春',
      destination: '延吉',
      budget: '1200'
    },
    plan: {},
    booking: {}
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      form: {
        ...this.data.form,
        [field]: e.detail.value
      }
    });
  },

  async planTrip() {
    const app = getApp();
    wx.showLoading({ title: '规划中' });
    try {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
      const payload = {
        user_id: app.globalData.userId,
        pet_id: 'pet-demo-1',
        origin: this.data.form.origin,
        destination: this.data.form.destination,
        start_time: now.toISOString(),
        end_time: tomorrow.toISOString(),
        budget_cny: Number(this.data.form.budget || 0),
        travel_mode_preference: 'mixed'
      };
      const plan = await api.planTrip(payload);
      this.setData({ plan, booking: {} });
    } catch (err) {
      wx.showToast({ title: '规划失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  async getBooking() {
    const app = getApp();
    if (!this.data.plan.trip_id) {
      return;
    }
    wx.showLoading({ title: '加载推荐' });
    try {
      const booking = await api.getBooking({
        user_id: app.globalData.userId,
        trip_id: this.data.plan.trip_id,
        destination: this.data.form.destination
      });
      this.setData({ booking });
    } catch (err) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
});
