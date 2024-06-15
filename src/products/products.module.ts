import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Product } from './products.entity';
import { CategorysModule } from 'src/categorys/categorys.module';
import { QualityModule } from 'src/qualitys/quality.module';
import { SurtirProductosModule } from 'src/surtir_productos/surtir_productos.module';
import { EncargarProductosModule } from 'src/encargar_productos/encargar_productos.module';
import * as multer from 'multer'
import { MulterModule } from '@nestjs/platform-express';
import {ProductoPedido} from 'src/pedidos_products/pedidos_products.entity'

@Module({
    imports:[
        TypeOrmModule.forFeature([Product,ProductoPedido]),CategorysModule,QualityModule,SurtirProductosModule,EncargarProductosModule,MulterModule.register({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'src/public/imagenes');
                },
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
                }),
            }),
    ],
    
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
