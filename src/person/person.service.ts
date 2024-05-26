import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import {createPersonDto} from './Dto/create.person.dto'
import { updatePersonDto } from './Dto/update-person.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class PersonService {

    constructor(@InjectRepository(Person) private personRepository:Repository<Person>, private roleService:RolesService){}



    async createPerson (person:createPersonDto){

        const {name}= person
        const {lastname}= person
        const {ID_rol}= person

        if(!name){
            throw new HttpException("El nombre de la persona es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!lastname){
            throw new HttpException("Los apellidos de la persona son necesarios",HttpStatus.BAD_REQUEST)
        }
        if(!ID_rol){
            throw new HttpException("El rol debe ser asignado",HttpStatus.BAD_REQUEST)
        }
        const personFound = await this.personRepository.findOne({
            where:{
                name:person.name,
                lastname:person.lastname,
            }
        })

        const roleFound = await this.roleService.getRole(person.ID_rol)

        if (!roleFound){
            return new HttpException("Rol inexistente",HttpStatus.NOT_FOUND)
        }

        if(personFound){
            return new HttpException("La persona ya existe",HttpStatus.CONFLICT)
        }
        const newPerson = this.personRepository.create(person)
        return this.personRepository.save(newPerson)
    }

    getPersons(){
        return this.personRepository.find()
    }

    async getPerson (ID_person:number){
        const personFound = await this.personRepository.findOne({
            where:{
                ID_person
            }
        })
        if(!personFound){
            return new HttpException("Persona no encontrada",HttpStatus.NOT_FOUND)
        }
        return personFound
    }

    async deletePerson(ID_person:number){
        const personFound = await this.personRepository.findOne({
            where:{
                ID_person
            }
        })
        if(!personFound){
            return new HttpException("Persona no encontrada",HttpStatus.NOT_FOUND)
        }
        return this.personRepository.delete(ID_person)
    }

    async updatePerson(ID_person:number, person: updatePersonDto){
        const personFound = await this.personRepository.findOne({
            where:{
                ID_person
            }
        })
        if(!personFound){
            return new HttpException("La persona no existe",HttpStatus.NOT_FOUND)
        }
        const updatePerson = Object.assign(personFound, person)
        return this.personRepository.save(updatePerson)
    }
}
