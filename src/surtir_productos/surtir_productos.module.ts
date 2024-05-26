import { Module } from '@nestjs/common';
import { SurtirProductosService } from './surtir_productos.service';
import { SurtirProductosController } from './surtir_productos.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Surtir_producto } from './surtir_productos.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Surtir_producto])
  ],
  providers: [SurtirProductosService],
  controllers: [SurtirProductosController],
  exports:[SurtirProductosService]
})
export class SurtirProductosModule {}
