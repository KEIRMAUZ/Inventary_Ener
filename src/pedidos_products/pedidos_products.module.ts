import { Module } from '@nestjs/common';
import { PedidosProductsService } from './pedidos_products.service';
import { ProductoPedidoController } from './pedidos_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Pedido } from 'src/pedidos/pedidos.entity';
import {ProductoPedido} from '../pedidos_products/pedidos_products.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Product,Pedido,ProductoPedido])
  ],
  providers: [PedidosProductsService],
  controllers: [ProductoPedidoController],
  exports:[PedidosProductsService],
})
export class PedidosProductsModule {}
