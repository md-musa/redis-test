const express = require('express');
const app = express();
const redis = require('redis');

const publisher = redis.createClient({
  url: 'redis://localhost:6379',
});
publisher.on('error', err => console.log('Redis error'));
publisher.on('connect', err => console.log('Redis connected'));
(async () => {
  await publisher.connect();
})();

publisher.subscribe('message', data => {
  console.log(data);
});

app.get('/', async (req, res) => {});

app.listen(5001, () => console.log('Sub is listening at:5001'));
