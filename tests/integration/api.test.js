const axios = require('axios');

const BASE_URL = 'https://petstore3.swagger.io/api/v3';

describe('Petstore API - Integration / Contract Tests', () => {

  test('GET /pet/findByStatus returns 200 with array', async () => {
    const res = await axios.get(`${BASE_URL}/pet/findByStatus?status=available`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test('Response items have required contract fields', async () => {
    const res = await axios.get(`${BASE_URL}/pet/findByStatus?status=available`);
    if (res.data.length > 0) {
      const pet = res.data[0];
      expect(pet).toHaveProperty('id');
      expect(pet).toHaveProperty('name');
      expect(pet).toHaveProperty('status');
    }
  });

  test('GET /pet/findByStatus with sold status returns 200', async () => {
    const res = await axios.get(`${BASE_URL}/pet/findByStatus?status=sold`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });


  test('GET /pet/9999999 returns 404 for missing pet', async () => {
    try {
      await axios.get(`${BASE_URL}/pet/9999999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });


  test('Content-Type header is application/json', async () => {
    const res = await axios.get(`${BASE_URL}/pet/findByStatus?status=available`);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});