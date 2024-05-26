import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Product } from './products.entity';
import { CategorysModule } from 'src/categorys/categorys.module';
import { QualityModule } from 'src/qualitys/quality.module';
import { SurtirProductosModule } from 'src/surtir_productos/surtir_productos.module';
import { EncargarProductosModule } from 'src/encargar_productos/encargar_productos.module';


@Module({
    imports:[
        TypeOrmModule.forFeature([Product]),CategorysModule,QualityModule,SurtirProductosModule,EncargarProductosModule
    ],
    
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
