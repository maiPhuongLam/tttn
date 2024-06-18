import { BaseCreateEntityType, BaseUpdateEntityType } from 'src/shared/types';

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  add(data: BaseCreateEntityType<T>): Promise<T>;
  update(id: number, data: BaseUpdateEntityType<T>): Promise<T>;
  delete(id: number): Promise<T>;
}
