import { IsNotEmpty } from "class-validator"
export class createProductDto{
    
    @IsNotEmpty({message:'El campo es requerido'})
    ID_folio: number
    @IsNotEmpty({message:'El campo es requerido'})
    ID_num_part: number
    @IsNotEmpty({message:'El campo es requerido'})
    ID_cod_proveedor: string
    @IsNotEmpty({message:'El campo es requerido'})
    name_product : string
    @IsNotEmpty({message:'El campo es requerido'})
    unit_price:number
    @IsNotEmpty({message:'El campo es requerido'})
    ID_category:number
    @IsNotEmpty({message:'El campo es requerido'})
    ID_quality:number
    @IsNotEmpty({message:'El campo es requerido'})
    description:string
    @IsNotEmpty({message:'El campo es requerido'})
    stock:number
    medidas:string
    @IsNotEmpty({message:'El campo es requerido'})
    para_que_maquina:string
    @IsNotEmpty({message:'El campo es requerido'})
    tipo_maquina:string
    image:string
    lugar_almacenamiento:string
    @IsNotEmpty({message:'El campo es requerido'})
    precio_mayoreo:number
}