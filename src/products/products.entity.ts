import {Column,Entity,PrimaryColumn,ManyToOne,JoinColumn,JoinTable,ManyToMany} from 'typeorm'
import {Category} from 'src/categorys/categorys.entity'
import {Quality} from 'src/qualitys/quality.entity'
import { Surtir_producto } from 'src/surtir_productos/surtir_productos.entity'
import { Pedido } from 'src/pedidos/pedidos.entity'


@Entity('products')
export class Product {
    @PrimaryColumn({unique:true,type: 'int'})
    ID_folio:number

    @Column({type: 'int'})
    ID_num_part:number

    @Column({type: 'varchar', length:'20'})
    ID_cod_proveedor:string

    @Column({type: 'varchar',length:30})
    name_product:string

    @Column({type: 'double'})
    unit_price:number

    @Column({type: 'double'})
    precio_mayoreo:number

    @Column()
    description:string

    @Column({type: 'int'})
    stock:number

    @Column({type:'varchar',length:20, nullable:true})
    medidas:string

    @Column({type:'varchar',length:50})
    para_que_maquina:string

    @Column({type:'varchar',length:50})
    tipo_maquina:string

    @Column({nullable:true})
    image:string

    @Column()
    lugar_almacenamiento:string

    @Column({type: 'int'})
    ID_category:number

    @ManyToOne(() => Category, (category) => category.product)
    @JoinColumn({name:'ID_category'})
    category: Category

    @Column({type:'int'})
    ID_quality:number
    
    @ManyToOne(() => Quality)
    @JoinColumn({name:'ID_quality'})
    quality: Quality


    @ManyToMany(()=> Surtir_producto)
    surtirProducto: Surtir_producto[]

    @ManyToMany( ()=> Pedido)
    pedido:Pedido[]
}