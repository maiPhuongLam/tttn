// Import necessary modules
import { Job, Queue, Worker } from 'bullmq';
import logger from '../logger';
import { addRole, uploadImageProduct } from 'src/shared/utils';

// Create a new queue
const myQueue = new Queue('myQueue', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// Define the first worker process for handling roles
const roleWorker = new Worker(
  'myQueue',
  addRole,
  {
    connection: {
      host: '127.0.0.1',
      port: 6379,
    },
    removeOnFail: { count: 0 },
  },
);

// Define the second worker process for uploading to Cloudinary
const uploadToCloudinaryWorker = new Worker(
  'image-upload',
  uploadImageProduct,
  {
    connection: {
      host: '127.0.0.1',
      port: 6379,
    },
    removeOnFail: { count: 0 },
  },
);

// Helper function to attach event listeners to workers
const attachListeners = (worker: Worker) => {
  worker.on('completed', (job: Job) => {
    console.log(`Job ${job.id} has been completed successfully`);
  });
  worker.on('failed', (job: Job | undefined, err: any) => {
    logger.error(`Job ${job?.id} has failed with error:`, err);
  });
};

// Attach event listeners to both workers
attachListeners(roleWorker);
attachListeners(uploadToCloudinaryWorker);

export default myQueue;
