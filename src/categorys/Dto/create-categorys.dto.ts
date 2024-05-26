import { IsNotEmpty } from "class-validator"

export class createCategoryDto{

    ID_category:number

    @IsNotEmpty({message:'El campo es requerido'})
    category_name: string
}