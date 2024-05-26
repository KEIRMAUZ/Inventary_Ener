
import { Person } from "src/person/person.entity";
import { Entity, Column,PrimaryGeneratedColumn,OneToMany } from "typeorm";

@Entity({name:'roles'})
export class Role {

    @PrimaryGeneratedColumn()
    ID_role:number

    @Column()
    role_name:string

}