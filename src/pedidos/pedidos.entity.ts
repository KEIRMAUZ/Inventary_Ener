import { Entity,Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Person } from "src/person/person.entity";
import { Product } from "src/products/products.entity";

@Entity({name:'pedidos'})
export class Pedido {

    @PrimaryGeneratedColumn()
    ID_pedido:number

    @Column()
    ID_person:number

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fecha:Date

    @Column()
    amount:number

    @ManyToOne(()=>Person)
    @JoinColumn({
        name:'ID_person'
    })
    person:Person[]

    @ManyToMany(()=>Product)
    @JoinTable({
        name:'pedidos_products',
        joinColumn:{
            name:'ID_pedido'
        },
        inverseJoinColumn:{
            name:'ID_folio'
        }
    })
    product: Product[]
    
}