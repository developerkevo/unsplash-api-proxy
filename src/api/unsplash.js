const express = require('express');
const axios = require('axios');

const router = express.Router();
const BASE_URL = 'https://api.unsplash.com/photos?';
let cachedData;
let cacheTime;
const name = 'KEVIN KIHARA';


router.get('/', async (req, res, next) => {
  // in memory cache
  if (cacheTime && cacheTime > Date.now() - 20 * 1000) {
    return res.json(cachedData);
  }
  try {
    const params = new URLSearchParams(
      { client_id: process.env.client_id }
    );


    // 1 make a request to the unsplash api
    const { data } = await axios.get(`${BASE_URL}${params}`);
    // 2  respond with the photos
    cachedData = data;
    cacheTime = Date.now();
    data.cacheTime = cacheTime;
    data.name = name;

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
