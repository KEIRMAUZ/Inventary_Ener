import { IsNotEmpty } from "class-validator"

export class createPedidoDto{
    ID_pedido:number

    @IsNotEmpty({message:'El campo es requerido'})
    ID_person:number
    fecha:Date
    amount:number
}