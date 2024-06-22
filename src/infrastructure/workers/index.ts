// Import necessary modules
import { Queue, Worker } from 'bullmq';
import logger from '../logger';
import { UserRoles } from 'src/shared/enums';
import { DB } from '../database/connect';
import { admins, customers } from '../database/schemas';

// Create a new queue
const createRoleQueue = new Queue('createRole', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// Define worker process
const worker = new Worker(
  'createRole',
  async (job) => {
    console.log(job);
    const { role, userId } = job.data;
    try {
      if (role === UserRoles.CUSTOMER) {
        await DB.insert(customers).values({ userId }).execute();
      } else {
        await DB.insert(admins).values({ userId }).execute();
      }
    } catch (error) {
      logger.error(`Error processing job ${job.id}:`, error);
      throw error; // This will make BullMQ handle retries, etc., based on your configuration
    }
  },
  {
    connection: {
      host: '127.0.0.1',
      port: 6379,
    },
    removeOnFail: { count: 0 },
  },
);

// Event listener for completed jobs (optional)
worker.on('completed', (job) => {
  console.log(`Job ${job.id} has been completed successfully`);
});

// Event listener for failed jobs (optional)
worker.on('failed', (job: any, err: any) => {
  console.error(`Job ${job.id} has failed with error:`, err);
});

export default createRoleQueue;
