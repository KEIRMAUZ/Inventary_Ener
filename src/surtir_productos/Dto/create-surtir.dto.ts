import {IsNotEmpty} from 'class-validator'

export class createSurtirDto{
    ID_surtir:number
    @IsNotEmpty({message:'El campo es requerido'})
    nombre_empresa:string
    localizacion:string
    contacto:string
}