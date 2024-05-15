import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {TypeOrmModule} from '@nestjs/typeorm'

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
    ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
