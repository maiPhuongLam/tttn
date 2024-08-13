import { and, count, gte, lte, sql } from 'drizzle-orm';
import { injectable } from 'inversify';
import { DB } from 'src/infrastructure/database/connect';
import { orders, orderDetails } from 'src/infrastructure/database/schemas';
import { warranties } from 'src/infrastructure/database/schemas/warranty';
import { RevenueType } from 'src/shared/enums';
import { formatDate } from 'src/shared/utils';
interface RevenueData {
  period: string;
  totalRevenue: number;
  count: number;
}

interface FormattedData {
  period: string;
  orderRevenue: number;
  orderCount: number;
  warrantyRevenue: number;
  warrantyCount: number;
  revenueIn: number;
}


@injectable()
export class StatisticService {
  async getStastic(revenueType: RevenueType, payload: any) {
    let result;
    const startDate = new Date(payload.startDate)
    const endDate = new Date(payload.endDate)
    switch (revenueType) {
      case RevenueType.DAILY:
        result = await this.getDailyRevenue(startDate, endDate);
        break;
      case RevenueType.WEEKLY:
        result = await this.getWeeklyRevenue(startDate, endDate);
        break;
      case RevenueType.MONTHLY:
        result = await this.getMonthlyRevenue(startDate, endDate);
        break;
      case RevenueType.YEARLY:
        result = await this.getYearlyRevenue(startDate, endDate);
        break;
      default:
        result = await this.getDailyRevenue(startDate, endDate);
        break;
    }
    return this._formatRevenueData(result)
  }

  private async getDailyRevenue(startDate: Date, endDate: Date){
    try {
      const orderRevenue = await DB
        .select({
          period: sql<string>`DATE(${orders.orderDate})`,
          totalRevenue: sql<number>`cast(sum(${orders.totalPrice}) as float)`,
          count: count(),
        })
        .from(orders)
        .where(and(gte(orders.orderDate, startDate), lte(orders.orderDate, endDate)))
        .groupBy(sql`DATE(${orders.orderDate})`)
        .orderBy(sql`DATE(${orders.orderDate})`);

      const warrantyRevenue = await DB
        .select({
          period: sql<string>`DATE(${warranties.repairDate})`,
          totalRevenue: sql<number>`cast(sum(${warranties.totalCost}) as float)`,
          count: count(),
        })
        .from(warranties)
        .where(and(gte(warranties.repairDate, startDate), lte(warranties.repairDate, endDate)))
        .groupBy(sql`DATE(${warranties.repairDate})`)
        .orderBy(sql`DATE(${warranties.repairDate})`);
      return {
        orderRevenue,
        warrantyRevenue
      }
    } catch (error) {
      throw error;
    }
  }

  private async getWeeklyRevenue(startDate: Date, endDate: Date) {
    try {
      const orderRevenue = await DB
        .select({
          period: sql<string>`EXTRACT(WEEK FROM ${orders.orderDate})`,
          totalRevenue: sql<number>`cast(sum(${orders.totalPrice}) as float)`,
          count: count(),
        })
        .from(orders)
        .where(and(gte(orders.orderDate, startDate), lte(orders.orderDate, endDate)))
        .groupBy(sql`EXTRACT(WEEK FROM ${orders.orderDate})`)
        .orderBy(sql`EXTRACT(WEEK FROM ${orders.orderDate})`);
      
      const warrantyRevenue = await DB
        .select({
          period: sql<string>`EXTRACT(WEEK FROM ${warranties.repairDate})`,
          totalRevenue: sql<number>`cast(sum(${warranties.totalCost}) as float)`,
          count: count(),
        })
        .from(warranties)
        .where(and(gte(warranties.repairDate, startDate), lte(warranties.repairDate, endDate)))
        .groupBy(sql`EXTRACT(WEEK FROM ${warranties.repairDate})`)
        .orderBy(sql`EXTRACT(WEEK FROM ${warranties.repairDate})`);    
  
      return {
        orderRevenue,
        warrantyRevenue
      }
    } catch (error) {
      throw error;
    }
  }

  private async getMonthlyRevenue(startDate: Date, endDate: Date) {
    try {
      const orderRevenue = await DB
        .select({
          period: sql<string>`EXTRACT(MONTH FROM ${orders.orderDate})`,
          totalRevenue: sql<number>`cast(sum(${orders.totalPrice}) as float)`,
          count: count(),
        })
        .from(orders)
        .where(and(gte(orders.orderDate, startDate), lte(orders.orderDate, endDate)))
        .groupBy(sql`EXTRACT(MONTH FROM ${orders.orderDate})`)
        .orderBy(sql`EXTRACT(MONTH FROM ${orders.orderDate})`);
      
      const warrantyRevenue = await DB
        .select({
          period: sql<string>`EXTRACT(MONTH FROM ${warranties.repairDate})`,
          totalRevenue: sql<number>`cast(sum(${warranties.totalCost}) as float)`,
          count: count(),
        })
        .from(warranties)
        .where(and(gte(warranties.repairDate, startDate), lte(warranties.repairDate, endDate)))
        .groupBy(sql`EXTRACT(MONTH FROM ${warranties.repairDate})`)
        .orderBy(sql`EXTRACT(MONTH FROM ${warranties.repairDate})`);
          
      return {
        orderRevenue,
        warrantyRevenue
      }
    } catch (error) {
      throw error;
    }
  }

  private async getYearlyRevenue(startDate: Date, endDate: Date) {
    try {
      const orderRevenue = await DB
        .select({
          period: sql<string>`EXTRACT(YEAR FROM ${orders.orderDate})`,
          totalRevenue: sql<number>`cast(sum(${orders.totalPrice}) as float)`,
          count: count(),
        })
        .from(orders)
        .where(and(gte(orders.orderDate, startDate), lte(orders.orderDate, endDate)))
        .groupBy(sql`EXTRACT(YEAR FROM ${orders.orderDate})`)
        .orderBy(sql`EXTRACT(YEAR FROM ${orders.orderDate})`);
      
      const warrantyRevenue = await DB
        .select({
          period: sql<string>`EXTRACT(YEAR FROM ${warranties.repairDate})`,
          totalRevenue: sql<number>`cast(sum(${warranties.totalCost}) as float)`,
          count: count(),
        })
        .from(warranties)
        .where(and(gte(warranties.repairDate, startDate), lte(warranties.repairDate, endDate)))
        .groupBy(sql`EXTRACT(YEAR FROM ${warranties.repairDate})`)
        .orderBy(sql`EXTRACT(YEAR FROM ${warranties.repairDate})`);
      
      return {
        orderRevenue,
        warrantyRevenue
      }
    } catch (error) {
      throw error;
    }
  }

  private _formatRevenueData(data: { orderRevenue: RevenueData[]; warrantyRevenue: RevenueData[] }): FormattedData[] {
    const combinedData = new Map<string, FormattedData>();
  
    data.orderRevenue.forEach(order => {
      const period = order.period;
      combinedData.set(period, {
        period,
        orderRevenue: order.totalRevenue,
        orderCount: order.count,
        warrantyRevenue: 0,
        warrantyCount: 0,
        revenueIn: order.totalRevenue,
      });
    });
  
    data.warrantyRevenue.forEach(warranty => {
      const period = warranty.period;
      if (combinedData.has(period)) {
        const existing = combinedData.get(period)!;
        existing.warrantyRevenue = warranty.totalRevenue;
        existing.warrantyCount = warranty.count;
        existing.revenueIn += warranty.totalRevenue;
      } else {
        combinedData.set(period, {
          period,
          orderRevenue: 0,
          orderCount: 0,
          warrantyRevenue: warranty.totalRevenue,
          warrantyCount: warranty.count,
          revenueIn: warranty.totalRevenue
        });
      }
    });
  
    return Array.from(combinedData.values());
  }
}
