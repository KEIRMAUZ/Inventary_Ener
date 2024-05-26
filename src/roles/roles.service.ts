import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createRolDto } from './Dto/create-rol.dto';
import { updateRolDto } from './Dto/update-rol.dto';
import { Role } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}

    async createRol(role:createRolDto){

        const {role_name} = role
        if(!role_name){
            throw new HttpException("El nombre del rol es necesario",HttpStatus.BAD_REQUEST)
        }
        const roleFound = await this.roleRepository.findOne({
            where:{
                role_name: role.role_name
            }
        })
        if(roleFound){
            return new HttpException("Este rol ya ha sido creado",HttpStatus.NOT_FOUND)
        }

        const newRole = this.roleRepository.create(role)
        return this.roleRepository.save(newRole)
    }

    getRoles(){
        return this.roleRepository.find()
    }

    async getRole(ID_role:number){
        const roleFound = await this.roleRepository.findOne({
            where:{
                ID_role
            }
        })
        if(!roleFound){
            return new HttpException("Role no existente",HttpStatus.NOT_FOUND)
        }
        return roleFound
    }

    async deleteRole(ID_role:number) {
        const roleFound = await this.roleRepository.findOne({
            where:{
                ID_role
            }
        })
        if(!roleFound){
            return new HttpException("El rol no existe",HttpStatus.NOT_FOUND)
        }

        return this.roleRepository.delete(ID_role)
    }

    async updateRole(ID_role:number, role:updateRolDto){

        const roleFound = await this.roleRepository.findOne({
            where:{
                ID_role
            }
        })
        if (!roleFound){
            return new HttpException("Rol no encontrado",HttpStatus.NOT_FOUND)
        }

        const updateRole = Object.assign(roleFound, role)
        return this.roleRepository.save(updateRole)
    }
}
