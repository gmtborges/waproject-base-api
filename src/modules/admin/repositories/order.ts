import { Injectable } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Transaction } from 'objection';
import { IPaginationParams } from 'modules/common/interfaces/pagination';

@Injectable()
export class OrderRepository {
  public async findAll(params: IPaginationParams, transaction: Transaction = null) {
    let query = Order.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `${params.term}%`);
      });
    }
    return query;
  }

  public async findById(id: string, transaction: Transaction = null): Promise<Order> {
    return Order.query(transaction).findById(id);
  }

  public async insert(model: IOrder, transaction: Transaction = null): Promise<Order> {
    return Order.query(transaction).insertAndFetch(model as any);
  }

  public async update(model: IOrder, transaction: Transaction = null): Promise<Order> {
    return Order.query(transaction).patchAndFetchById(model.id, model as any);
  }

  public async remove(orderId: number, transaction: Transaction = null): Promise<void> {
    await Order.query(transaction).deleteById(orderId);
  }
}
