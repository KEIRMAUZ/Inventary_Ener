import { Controller,Post,Get,Delete,Body,Patch,Render,ParseIntPipe,Param } from '@nestjs/common';
import { Person } from './person.entity';
import { createPersonDto } from './Dto/create.person.dto';
import { updatePersonDto } from './Dto/update-person.dto';
import { PersonService } from './person.service';

@Controller('persons')
export class PersonController {

    constructor(private personService: PersonService){}

    @Post('create')
    @Render('persons/person-create')
    createPerson(@Body() newPerson: createPersonDto){
        return this.personService.createPerson(newPerson)
    }

    @Get()
    getPersons():Promise<Person[]>{
        return this.personService.getPersons()
    }

    @Get('getPersons')
    @Render('persons/person-get')
    getPersonsView(){
        return{};
    }
    @Get('create')
    @Render('persons/person-create')
    createPersonsView(){
        return{};
    }
    @Get('delete')
    @Render('persons/person-delete')
    deletePersonView(){
        return{};
    }

    @Get('update')
    @Render('persons/person-update')
    updatePersonView(){
        return{};
    }

    @Get(':ID_person')
    getPerson(@Param('ID_person', ParseIntPipe) ID_person:number){
        return this.personService.getPerson(ID_person)
    }

    @Delete(':ID_person')
    deletePerson(@Param('ID_person', ParseIntPipe)ID_person:number){
        return this.personService.deletePerson(ID_person)
    }

    @Patch(':ID_person')
    updatePerson(@Param('ID_person',ParseIntPipe) ID_person:number, @Body() person:updatePersonDto){
        return this.personService.updatePerson(ID_person,person)
    }
}
