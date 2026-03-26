const api = require('../../utils/api');

Page({
  data: {
    form: {
      name: '旺财',
      breed: '柯基',
      age_years: '3',
      weight_kg: '12',
      shoulder_height_cm: '31'
    },
    pet: {}
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

  async savePet() {
    const app = getApp();
    wx.showLoading({ title: '保存中' });
    try {
      const payload = {
        name: this.data.form.name,
        breed: this.data.form.breed,
        age_years: Number(this.data.form.age_years || 0),
        sex: 'male',
        neutered: true,
        weight_kg: Number(this.data.form.weight_kg || 0),
        shoulder_height_cm: Number(this.data.form.shoulder_height_cm || 0),
        personality: '活泼亲人',
        vaccinated: true,
        health_notes: '',
        diet_habits: '一天两餐',
        social_with_humans: true,
        social_with_dogs: true
      };
      const pet = await api.createPet(app.globalData.userId, payload);
      this.setData({ pet });
      wx.showToast({ title: '已保存', icon: 'success' });
    } catch (err) {
      wx.showToast({ title: '保存失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
});
