import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import {Category} from 'src/categorys/categorys.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports:[
    TypeOrmModule.forFeature([Category])
  ],
  providers: [CategorysService],
  controllers: [CategorysController]
})
export class CategorysModule {}
