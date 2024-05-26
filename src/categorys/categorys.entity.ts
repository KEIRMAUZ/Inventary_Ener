import {Column,OneToMany,PrimaryGeneratedColumn,Entity} from 'typeorm'
import {Product} from 'src/products/products.entity'

@Entity({name:'categorys'})
export class Category{

    @PrimaryGeneratedColumn({type:'int'})
    ID_category:number

    @Column({type:'varchar',length:50})
    category_name:string

    @OneToMany(() => Product, product => product.category)
    product: Product[]
}