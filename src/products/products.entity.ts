import {Column,Entity,PrimaryColumn} from 'typeorm'

@Entity('products')
export class Product {
    @PrimaryColumn({unique:true,type: 'int'})
    ID_folio:number

    @Column({unique:true,type: 'int'})
    ID_num_part:number

    @Column({unique:true,type: 'int'})
    ID_cod_proveedor:number

    @Column({type: 'varchar',length:30})
    name_product:string

    @Column({type: 'double'})
    unit_price:number

    @Column({type: 'double'})
    precio_mayoreo:number

    @Column({type: 'int'})
    ID_category:number

    @Column({type:'int'})
    ID_quality:number

    @Column()
    description:string

    @Column({type: 'int'})
    stock:number

    @Column({type:'varchar',length:20})
    medidas:string

    @Column({type:'varchar',length:50})
    para_que_maquina:string

    @Column({type:'varchar',length:50})
    tipo_maquina:string

    @Column({type:'blob'})
    image:Blob

    @Column()
    lugar_almacenamiento:string
}