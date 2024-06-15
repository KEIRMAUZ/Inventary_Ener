import { Entity,Column, PrimaryGeneratedColumn,ManyToOne, OneToMany,JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Person } from "src/person/person.entity";

import { ProductoPedido } from 'src/pedidos_products/pedidos_products.entity'
//import {PedidoProduct} from '../pedidos_products/pedidos_products.entity'

@Entity({name:'pedidos'})
export class Pedido {

    @PrimaryGeneratedColumn()
    ID_pedido:number

    @Column({nullable:true})
    ID_person:number

    @Column({type:'varchar', length:30})
    name_person:string

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fecha:Date

    @Column()
    descuento:number

    @Column()
    amount:number

    @ManyToOne(()=>Person)
    @JoinColumn({
        name:'ID_person'
    })
    person:Person[]


    @OneToMany(() => ProductoPedido, productoPedido => productoPedido.pedido)
    productoPedidos: ProductoPedido[];
    
}