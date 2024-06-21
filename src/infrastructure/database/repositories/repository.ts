import { IRepository } from 'src/domain/repositories';
import { BaseCreateEntityType } from 'src/shared/types';
import { DB } from '../connect';
import { eq } from 'drizzle-orm';
import { inject, injectable, unmanaged } from 'inversify';
import { PgTable, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@injectable()
export class Repository<T> implements IRepository<T> {
  protected db;
  private table;

  constructor(@unmanaged() table: PgTableWithColumns<any>) {
    this.table = table;
    this.db = DB; // Initialize the DB connection
  }

  async findAll(): Promise<T[]> {
    return (await this.db.select().from(this.table)) as T[];
  }

  async findById(id: number): Promise<T | null> {
    const [result] = await this.db.select().from(this.table).where(eq(this.table.id, id));
    return (result as T) || null;
  }

  async add(data: BaseCreateEntityType<T>): Promise<T> {
    const [result] = (await this.db
      .insert(this.table)
      .values(data)
      .returning()
      .execute()) as Record<string, any>[];
    return result as T;
  }

  async update(id: number, data: Partial<BaseCreateEntityType<T>>): Promise<T> {
    const [result] = (await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning()
      .execute()) as Record<string, any>[];
    return result as T;
  }

  async delete(id: number): Promise<T> {
    const [result] = (await this.db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning()
      .execute()) as Record<string, any>[];
    return result as T;
  }
}
