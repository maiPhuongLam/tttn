import { Job, Queue, Worker } from 'bullmq';
import logger from '../logger';
import { addRole, createCart, createProductItemSerial, uploadImageProduct } from 'src/shared/utils';
import { redisConnection } from '../cache';
import { WorkerNames } from 'src/shared/enums';

// Create a single queue
const jobQueue = new Queue('jobQueue', { connection: redisConnection });

// Worker to process jobs from the queue
const jobWorker = new Worker(
  'jobQueue',
  async (job: Job) => {
    switch (job.name) {
      case WorkerNames.ROLE:
        await addRole(job);
        break;
      case WorkerNames.IMAGE_UPLOAD:
        await uploadImageProduct(job);
        break;
      case WorkerNames.CREATE_PRODUCT_ITEM_SERIAL:
        await createProductItemSerial(job);
        break;
      default:
        logger.error(`Unknown job type: ${job.name}`);
        throw new Error(`Unknown job type: ${job.name}`);
    }
  },
  {
    connection: redisConnection,
    removeOnFail: { count: 0 },
    removeOnComplete: { count: 300 },
  },
);

// Helper function to attach event listeners to workers
const attachListeners = (worker: Worker) => {
  worker.on('completed', (job: Job) => {
    logger.info(`Job ${job.id} has been completed successfully`);
  });
  worker.on('failed', (job: Job | undefined, err: any) => {
    logger.error(`Job ${job?.id} has failed with error:`, err);
  });
};

// Attach event listeners to the worker
attachListeners(jobWorker);

export default jobQueue;

// Function to add jobs to the queue
export const addJobToQueue = async (jobType: WorkerNames, data: any) => {
  logger.info(jobType);
  const t = await jobQueue.add(jobType, data);
  logger.info(t.name);
};

// Example usage
// addJobToQueue(WorkerNames.ROLE, { /* role data */ });
// addJobToQueue(WorkerNames.IMAGE_UPLOAD, { /* image upload data */ });
// addJobToQueue(WorkerNames.CREATE_PRODUCT_ITEM_SERIAL, { /* product item serial data */ });
