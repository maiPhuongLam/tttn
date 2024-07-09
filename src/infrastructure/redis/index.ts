import Redis from 'ioredis';
import configuration from 'src/config/configuration';

const redisConnection = new Redis({
  host: configuration.REDIS_HOST,
  port: configuration.REDIS_PORT,
  maxRetriesPerRequest: null,
});

export default redisConnection