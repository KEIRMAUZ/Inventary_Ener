import {IsNotEmpty} from 'class-validator'
export class createRolDto{

    ID_role:number
    @IsNotEmpty({message:'El campo es requerido'})
    role_name:string
    
}