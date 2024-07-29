import { sql } from "drizzle-orm";
import { injectable } from "inversify";
import { DB } from "src/infrastructure/database/connect";
import { orders, orderDetails } from "src/infrastructure/database/schemas";
import { RevenueType } from "src/shared/enums";
import { formatDate } from "src/shared/utils";
interface RevenueData {
  date?: string;
  weekStart?: string | Date;
  month?: string;
  year?: number;
  revenue: number;
}


@injectable()
export class StatisticService {
  async getStastic(revenueType: RevenueType, payload: any) {
    console.log(revenueType);
    
    let result
    switch (revenueType) {
      case RevenueType.DAILY:
        result = await this.getDailyRevenue(payload.startDate, payload.endDate)
        break;
      case RevenueType.WEEKLY:
        result = await this.getWeeklyRevenue(payload.startDate, payload.endDate)
        break;
      case RevenueType.MONTHLY:
        result = await this.getMonthlyRevenue(payload.year)
        break;
      case RevenueType.YEARLY:
        result = await this.getYearlyRevenue()
        break;
      default:
        break;
    }
    console.log(result);
    
    return result
  }

  private async getDailyRevenue(startDate: Date, endDate: Date): Promise<RevenueData[]> {
    try {
      const results = await DB
        .select({
          date: sql<string>`date(${orders.orderDate}) as date`,
          revenue: sql<number>`sum(${orders.totalPrice}) as revenue`,
        })
        .from(orders)
        .innerJoin(orderDetails, sql<string>`${orders.id} = ${orderDetails.orderId}`)
        .where(sql<string>`${orders.orderDate} between ${startDate} and ${endDate}`)
        .groupBy(sql<string>`date(${orders.orderDate})`)
        .orderBy(sql<string>`date(${orders.orderDate})`);

      return results.map(row => ({
        date: row.date,
        revenue: row.revenue,
      }));
    } catch (error) {
      throw error
    }
  }


  private async getWeeklyRevenue(startDate: Date, endDate: Date): Promise<RevenueData[]> {
    const results = await DB
      .select({
        weekStart: sql<Date>`date_trunc('week', ${orders.orderDate}) as week_start`,
        revenue: sql<number>`sum(${orders.totalPrice}) as revenue`,
      })
      .from(orders)
      .innerJoin(orderDetails, sql`${orders.id} = ${orderDetails.orderId}`)
      .where(sql<string>`${orders.orderDate} between ${startDate} and ${endDate}`)
      .groupBy(sql<Date>`date_trunc('week', ${orders.orderDate})`)
      .orderBy(sql<Date>`date_trunc('week', ${orders.orderDate})`);

    return results.map(row => ({
      weekStart: row.weekStart,
      revenue: row.revenue,
    }));
  }
  
  private async getMonthlyRevenue(year: number): Promise<RevenueData[]> {
    const results = await DB
      .select({
        month: sql<string>`to_char(${orders.orderDate}, 'YYYY-MM') as month`,
        revenue: sql<number>`sum(${orders.totalPrice}) as revenue`,
      })
      .from(orders)
      .innerJoin(orderDetails, sql`${orders.id} = ${orderDetails.orderId}`)
      .where(sql`extract(year from ${orders.orderDate}) = ${year}`)
      .groupBy(sql<string>`to_char(${orders.orderDate}, 'YYYY-MM')`)
      .orderBy(sql<string>`to_char(${orders.orderDate}, 'YYYY-MM')`);
  
    return results.map(row => ({
      month: row.month,
      revenue: row.revenue,
    }));
  }
  
  private async getYearlyRevenue(): Promise<RevenueData[]> {
    const results = await DB
      .select({
        year: sql<number>`extract(year from ${orders.orderDate}) as year`,
        revenue: sql<number>`sum(${orders.totalPrice}) as revenue`,
      })
      .from(orders)
      .innerJoin(orderDetails, sql`${orders.id} = ${orderDetails.orderId}`)
      .groupBy(sql<string>`extract(year from ${orders.orderDate})`)
      .orderBy(sql<string>`extract(year from ${orders.orderDate})`);
  
    return results.map(row => ({
      year: row.year,
      revenue: row.revenue,
    }));
  }
}