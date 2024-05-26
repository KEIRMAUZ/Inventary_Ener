import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedidos.entity';
import { Person } from 'src/person/person.entity';
import { Product } from 'src/products/products.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Pedido]),Person,Product
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports:[PedidosService]
})
export class PedidosModule {}
