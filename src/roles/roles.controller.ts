import { Controller,Post,Body,Get,Delete,Param,ParseIntPipe, Render,Patch } from '@nestjs/common';
import { createRolDto } from './Dto/create-rol.dto';
import { updateRolDto } from './Dto/update-rol.dto';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService:RolesService){}

    @Post('create')
    @Render('roles/roles-create')
    createRole(@Body() newRole:createRolDto){ 
        return this.rolesService.createRol(newRole)
    }

    @Get('getRoles')
    @Render('roles/roles-get')
    getRolesView(){
        return{};
    }

    @Get('create')
    @Render('roles/roles-create')
    createRoleView(){
        return{};
    }

    @Get('delete')
    @Render('roles/roles-delete')
    deleteRoleView(){
        return{};
    }

    @Get('update')
    @Render('roles/roles-update')
    updateRoleView(){
        return{};
    }
    

    @Get()
    getRoles():Promise<Role[]>{
        return this.rolesService.getRoles()
    }

    @Get(':ID_role')
    getRole(@Param('ID_role', ParseIntPipe) ID_role:number){
        return this.rolesService.getRole(ID_role)
    }

    @Delete(':ID_role')
    deleteRole(@Param('ID_role',ParseIntPipe) ID_role:number){
        return this.rolesService.deleteRole(ID_role)
    }

    @Patch(':ID_role')
    updateRole(@Param('ID_role',ParseIntPipe) ID_role:number,@Body() role:updateRolDto){
        return this.rolesService.updateRole(ID_role,role)
    }

}
