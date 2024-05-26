import { IsNotEmpty } from "class-validator"

export class createEncargoDto {
    ID_encargar_productos:number

    @IsNotEmpty({message:'El campo es requerido'})
    ID_folio:number
}