import {Column,Entity,PrimaryGeneratedColumn, OneToMany,JoinColumn} from 'typeorm'
import {Product} from 'src/products/products.entity'

@Entity({name:'qualitys'})
export class Quality{

    @PrimaryGeneratedColumn({type:'int'})
    ID_quality: number

    @Column({type:'varchar',length:40})
    quality_name: string

    //@OneToMany(() => Product, product => product.quality)
    //product: Product[]
}