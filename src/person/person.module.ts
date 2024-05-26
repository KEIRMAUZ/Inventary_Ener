import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import {Person} from './person.entity'
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Person]), RolesModule
  ],
  providers: [PersonService],
  controllers: [PersonController],
  exports:[PersonService]
})
export class PersonModule {}
