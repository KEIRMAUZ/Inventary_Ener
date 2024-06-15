import { Entity, Column, ManyToOne,JoinColumn,PrimaryGeneratedColumn } from "typeorm";
import {Pedido} from '../pedidos/pedidos.entity'
import {Product} from '../products/products.entity'

@Entity({name:"pedido_productos"})
export class ProductoPedido {

    @PrimaryGeneratedColumn()
    ID:number

    @Column()
    ID_pedido:number

    @Column()
    ID_folio:number

    @Column()
    Cantidad:number

    @ManyToOne(() => Pedido, pedido => pedido.productoPedidos)
    @JoinColumn({ name: 'ID_pedido' })
    pedido: Pedido;

    @ManyToOne(() => Product, product => product.productoPedidos)
    @JoinColumn({ name: 'ID_folio' })
    product: Product;

}