import { DB } from "src/infrastructure/database/connect";
import { UserRoles } from "../enums";
import { admins, customers, products } from "src/infrastructure/database/schemas";
import logger from "src/infrastructure/logger";
import { Job } from "bullmq";
import { eq } from "drizzle-orm";
import { updateProductIndex } from "./search";

export const addRole = async (job: Job) => {
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
}

export const uploadImageProduct = async (job: Job) => {
  const { imagePath, product } = job.data;
  try {
    // if (product.image?.public_id !== undefined) {
    //   await cloudinary.v2.uploader.destroy(product.image.public_id as string);
    // }

    // const result = await cloudinary.v2.uploader.upload(imagePath, {
    //   folder: "wanderMap",
    //   width: 1200,
    //   height: 630,
    //   crop: "fill",
    //   gravity: "center"
    // });

    const [updatedProduct] = await DB.update(products).set({ image: imagePath }).where(eq(products.id, product.id)).returning().execute()

    await updateProductIndex(updatedProduct);
  } catch (error) {
    console.error("Image upload failed:", error);
  }
}