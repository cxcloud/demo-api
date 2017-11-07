import {
  POST,
  GET,
  Path,
  PathParam,
  Context,
  ServiceContext
} from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Orders } from '@cxcloud/facade/dist/commerce';
import {
  Order,
  PaginatedOrderResult
} from '@cxcloud/facade/dist/sdk/types/orders';

interface ICreateOrder {
  cartId: string;
  cartVersion: number;
}

@Path('/orders')
export class OrdersController {
  @Context ctx: ServiceContext;

  @Tags('orders')
  @POST
  createOrder(body: ICreateOrder): Promise<Order> {
    const { cartId, cartVersion } = body;
    return Orders.create(
      cartId,
      cartVersion,
      this.ctx.response.locals.authToken
    );
  }

  @Tags('orders')
  @GET
  getOrders(): Promise<PaginatedOrderResult> {
    return Orders.fetchAll(this.ctx.response.locals.authToken);
  }

  @Path('/:id')
  @Tags('orders')
  @GET
  getOrderById(@PathParam('id') orderId: string): Promise<Order> {
    return Orders.findById(orderId, this.ctx.response.locals.authToken);
  }
}
