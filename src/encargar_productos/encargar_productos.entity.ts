import { Entity, PrimaryGeneratedColumn,Column, OneToOne, JoinColumn } from "typeorm";
import { Product } from "src/products/products.entity";

@Entity({name:'encargar_productos'})
export class Encargar_producto{
    
    @PrimaryGeneratedColumn()
    ID_encargar_productos:number

    @Column({type:'int'})
    ID_folio:number

    @OneToOne(()=>Product)
    @JoinColumn({
        name:'ID_folio'
    })
    product:Product
}