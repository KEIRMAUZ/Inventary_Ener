import { IsNotEmpty } from "class-validator"

export class createQualityDto{
    
    ID_quality : number
    
    @IsNotEmpty({message:'El campo es requerido'})
    quality_name : string    
}