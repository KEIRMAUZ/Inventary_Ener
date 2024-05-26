import { Controller,Post,Get,Delete,Body,Patch,Put,ParseIntPipe,Param } from '@nestjs/common';
import { Person } from './person.entity';
import { createPersonDto } from './Dto/create.person.dto';
import { updatePersonDto } from './Dto/update-person.dto';
import { PersonService } from './person.service';

@Controller('persons')
export class PersonController {

    constructor(private personService: PersonService){}

    @Post()
    createPerson(@Body() newPerson: createPersonDto){
        return this.personService.createPerson(newPerson)
    }

    @Get()
    getPersons():Promise<Person[]>{
        return this.personService.getPersons()
    }

    @Get(':ID_person')
    getPerson(@Param('ID_person', ParseIntPipe) ID_person:number){
        return this.personService.getPerson(ID_person)
    }

    @Delete(':ID_person')
    deletePerson(@Param('ID_person', ParseIntPipe)ID_person:number){
        return this.personService.deletePerson(ID_person)
    }

    @Put(':ID_person')
    updatePerson(@Param('ID_person',ParseIntPipe) ID_person:number, @Body() person:updatePersonDto){
        return this.personService.updatePerson(ID_person,person)
    }
}
