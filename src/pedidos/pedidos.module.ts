import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedidos.entity';
import { Person } from 'src/person/person.entity';
import {ProductoPedido} from 'src/pedidos_products/pedidos_products.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Pedido,ProductoPedido]),Person,
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports:[PedidosService]
})
export class PedidosModule {}
