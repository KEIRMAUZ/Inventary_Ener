import { IsNotEmpty } from "class-validator"

export class createPedidoDto{
    ID_pedido:number
    ID_person?:number
    name_person?:string
    fecha:Date
    descuento:number
    amount:number

}