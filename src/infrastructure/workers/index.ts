// Import necessary modules
import { Job, Queue, Worker } from 'bullmq';
import logger from '../logger';
import { addRole, uploadImageProduct } from 'src/shared/utils';
import configuration from 'src/config/configuration';
import redisConnection from '../redis';

// Create a new queue
const myQueue = new Queue('myQueue', {
  connection: redisConnection,
});

// Define the first worker process for handling roles
const roleWorker = new Worker('myQueue', addRole, {
  connection: redisConnection,
  removeOnFail: { count: 0 },
});

// Define the second worker process for uploading to Cloudinary
const uploadToCloudinaryWorker = new Worker('image-upload', uploadImageProduct, {
  connection: redisConnection,
  removeOnFail: { count: 0 },
});

// Helper function to attach event listeners to workers
const attachListeners = (worker: Worker) => {
  worker.on('completed', (job: Job) => {
    logger.info(`Job ${job.id} has been completed successfully`);
  });
  worker.on('failed', (job: Job | undefined, err: any) => {
    logger.error(`Job ${job?.id} has failed with error:`, err);
  });
};

// Attach event listeners to both workers
attachListeners(roleWorker);
attachListeners(uploadToCloudinaryWorker);

export default myQueue;
