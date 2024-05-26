import {Column,PrimaryGeneratedColumn,Entity, ManyToMany,JoinTable} from 'typeorm'
import { Product } from 'src/products/products.entity'

@Entity({name:'surtir'})
export class Surtir_producto{

    @PrimaryGeneratedColumn({type:'int'})
    ID_surtir:number

    @Column({type:'varchar',length:50})
    nombre_empresa:string

    @Column()
    localizacion:string

    @Column()
    contacto:string

    @ManyToMany(()=>Product)
    @JoinTable({
        name:'surtirandproductos',
        joinColumn:{
            name:'ID_surtir'
        },
        inverseJoinColumn:{
            name:'ID_folio'
        }
    })
    product:Product[]
}