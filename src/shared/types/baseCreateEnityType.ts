export type BaseCreateEntityType<T> = {
  [K in Exclude<keyof T, 'id' | 'createdAt' | 'updatedAt'>]: T[K];
};
