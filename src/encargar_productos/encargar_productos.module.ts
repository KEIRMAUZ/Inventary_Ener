import { Module } from '@nestjs/common';
import { EncargarProductosService } from './encargar_productos.service';
import { EncargarProductosController } from './encargar_productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encargar_producto } from './encargar_productos.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Encargar_producto])
  ],
  providers: [EncargarProductosService],
  controllers: [EncargarProductosController],
  exports:[EncargarProductosService]
})
export class EncargarProductosModule {}
