import redis, { RedisClientType } from 'redis';
import { promisify } from 'util';

class RedisCache {
  private client: RedisClientType;

  constructor() {
    // Khởi tạo kết nối tới Redis
    this.client = redis.createClient();

    // Cấu hình để sử dụng Promise trong RedisClient
    this.client.get = promisify(this.client.get).bind(this.client);
    this.client.set = promisify(this.client.set).bind(this.client);

    // Lắng nghe sự kiện lỗi từ RedisClient
    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  // Phương thức để lấy dữ liệu từ cache
  async get(key: string): Promise<any> {
    try {
      const data = await this.client.get(key);
      return data ? null : data;
    } catch (error) {
      console.error('Error getting data from cache:', error);
      return null;
    }
  }

  // Phương thức để lưu dữ liệu vào cache
  async set(key: string, data: any, expireTimeSeconds?: number): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      if (expireTimeSeconds) {
        await this.client.set(key as string, jsonData as string, 'EX', expireTimeSeconds);
      } else {
        await this.client.set(key, jsonDataString);
      }
    } catch (error) {
      console.error('Error setting data in cache:', error);
    }
  }

  // Phương thức để xóa dữ liệu từ cache
  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting data from cache:', error);
    }
  }
}

export default new RedisCache();
