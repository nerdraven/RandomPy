export default {
  core: {
    secretKey: process.env.SECRET_KEY,
    gameSize: process.env.GAME_SIZE
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
};