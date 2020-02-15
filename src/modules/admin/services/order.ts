import { Injectable } from '@nestjs/common';
import { IPaginationParams } from '../../common/interfaces/pagination';
import { Transaction, Page } from 'objection';

import { OrderRepository } from '../repositories/order';
import { Order } from 'modules/database/models/order';
import { IOrder } from 'modules/database/interfaces/order';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    return this.orderRepository.findAll(params, transaction);
  }

  public async save(model: IOrder, currentUser: ICurrentUser, transaction?: Transaction) {
    model.userId = currentUser.id;
    return this.orderRepository.insert(model, transaction);
  }

  public async remove(orderId: number, transaction?: Transaction) {
    return this.orderRepository.remove(orderId, transaction);
  }
}
