import { Module } from '@nestjs/common';
import { SurtirAndProductosController } from './surtir-and-productos.controller';
import { SurtirAndProductosService } from './surtir-and-productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Surtir_producto } from 'src/surtir_productos/surtir_productos.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product,Surtir_producto])
  ],
  controllers: [SurtirAndProductosController],
  providers: [SurtirAndProductosService]
})
export class SurtirAndProductosModule {}
