const app = getApp();

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.apiBase}${url}`,
      method,
      data,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
          return;
        }
        reject({
          statusCode: res.statusCode,
          data: res.data
        });
      },
      fail: reject
    });
  });
}

module.exports = {
  qaMultimodal(payload) {
    return request('/ai/qa-multimodal', 'POST', payload);
  },
  planTrip(payload) {
    return request('/trip/plan', 'POST', payload);
  },
  evaluateRisk(payload) {
    return request('/trip/risk-evaluate', 'POST', payload);
  },
  createPet(ownerId, payload) {
    return request(`/pets?owner_id=${ownerId}`, 'POST', payload);
  },
  getBooking(params) {
    const q = `user_id=${params.user_id}&trip_id=${params.trip_id}&destination=${params.destination}`;
    return request(`/booking/recommendations?${q}`, 'GET');
  },
  subscribeAlerts(payload) {
    return request('/alerts/subscribe', 'POST', payload);
  },
  seedMock(payload) {
    return request('/alerts/mock/seed', 'POST', payload);
  },
  emergencyNearby(payload) {
    return request('/emergency/nearby', 'POST', payload);
  }
};
