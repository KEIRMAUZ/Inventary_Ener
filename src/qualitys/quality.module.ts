import { Module } from '@nestjs/common';
import { QualityService } from './quality.service';
import { QualityController } from './quality.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Quality } from './quality.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Quality])
  ],
  providers: [QualityService],
  controllers: [QualityController],
  exports:[QualityService]
})
export class QualityModule {}
