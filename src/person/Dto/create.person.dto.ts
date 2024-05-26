import { IsNotEmpty } from "class-validator"

export class createPersonDto{
    ID_person:number
    @IsNotEmpty({message:'El campo es requerido'})
    name:string
    @IsNotEmpty({message:'El campo es requerido'})
    lastname:string
    phone:number

    @IsNotEmpty({message:'El campo es requerido'})
    ID_rol:number
}