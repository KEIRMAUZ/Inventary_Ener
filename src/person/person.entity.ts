
import { Role } from 'src/roles/roles.entity'
import {Entity,Column,PrimaryGeneratedColumn, JoinColumn,ManyToOne} from 'typeorm'
import { Pedido } from 'src/pedidos/pedidos.entity'

@Entity({name:'persons'})
export class Person{

    @PrimaryGeneratedColumn()
    ID_person:number

    @Column({type:'varchar',length:20})
    name: string

    @Column({type:'varchar',length:20})
    lastname:string

    @Column({type:'bigint'})
    phone:number

    @Column({type:'int'})
    ID_rol:number

    @ManyToOne(() => Role)
    @JoinColumn({name:'ID_rol'})
    role: Role[] 

    

}