import {Column,PrimaryColumn,PrimaryGeneratedColumn,Entity} from 'typeorm'

@Entity({name:'categorys'})
export class Category{

    @PrimaryGeneratedColumn({type:'int'})
    ID_category:number

    @Column({type:'varchar',length:50})
    category_name:string
}