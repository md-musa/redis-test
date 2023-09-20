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

app.get('/', async (req, res) => {
  const id = Math.floor(Math.random() * 10);
  const data = {
    id,
    message: `message - ${id}`,
  };
  await publisher.publish('message', JSON.stringify(data));
  res.send(data);
});

app.listen(5000, () => console.log('Pub is listening at:5000'));
