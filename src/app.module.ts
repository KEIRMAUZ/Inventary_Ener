import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { CategorysModule } from './categorys/categorys.module';
import { QualityModule } from './qualitys/quality.module';
import { SurtirProductosModule } from './surtir_productos/surtir_productos.module';
import { PersonModule } from './person/person.module';
import { RolesModule } from './roles/roles.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { EncargarProductosModule } from './encargar_productos/encargar_productos.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port:3306,
      username: 'root',
      password:'',
      database:'inventario',
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    ProductsModule,
    CategorysModule,
    QualityModule,
    SurtirProductosModule,
    PersonModule,
    RolesModule,
    PedidosModule,
    EncargarProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
