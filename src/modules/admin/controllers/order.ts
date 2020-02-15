import { Controller, Get, Query, Param, ParseIntPipe, Delete, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';

import { OrderService } from '../services/order';
import { Order } from '../../database/models/order';
import { ListValidator } from '../validators/order/list';
import { SaveValidator } from '../validators/order/save';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListValidator) {
    return this.orderService.list(model);
  }

  @Post()
  @ApiResponse({ status: 201, type: Order })
  public async save(@Body() model: SaveValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.save(model, currentUser);
  }

  @Delete(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async remove(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }
}
