import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Surtir_producto} from 'src/surtir_productos/surtir_productos.entity'
import { createSurtirDto } from './Dto/create-surtir.dto';
import { updateSurtirDto } from './Dto/update-surtir.dto';

@Injectable()
export class SurtirProductosService {
    constructor(@InjectRepository(Surtir_producto) private surtirRepository:Repository<Surtir_producto>){}

    async createSurtir (surtir: createSurtirDto){

        const {nombre_empresa} = surtir
        
        if(!nombre_empresa){
            throw new HttpException("El nombre de la empresa es necesario",HttpStatus.BAD_REQUEST)
        }

        const surtirFound = await this.surtirRepository.findOne({
            where:{
                nombre_empresa: surtir.nombre_empresa
            }
    })
        if (surtirFound){
            return new HttpException("Empresa ya regisrada",HttpStatus.CONFLICT)
        }

        const newSurtir = this.surtirRepository.create(surtir)
        return this.surtirRepository.save(newSurtir)
    }

    getSurtir(){
        return this.surtirRepository.find()
    }

    async getSurtirOne(ID_surtir:number){
        const surtirFound = await this.surtirRepository.findOne({
            where:{
                ID_surtir
            }
        })
        if (!surtirFound){
            return new HttpException("Empresa no encontrada",HttpStatus.NOT_FOUND)
        }

        return surtirFound
    }


    async deleteSurtir(ID_surtir:number){
        const surtirFound = await this.surtirRepository.findOne({
            where:{
                ID_surtir
            }
        })
        if(!surtirFound){
            return new HttpException("Producto no encontrado",HttpStatus.NOT_FOUND)
        }
        return this.surtirRepository.delete(ID_surtir)
    }

    async updateSurtir(ID_surtir:number, surtir: updateSurtirDto){
        const surtirFound = await this.surtirRepository.findOne({
            where:{
                ID_surtir
            }
        })
        if(!surtirFound){
            return new HttpException("Producto no encontrado",HttpStatus.NOT_FOUND)
        }
        const updateSurtir = Object.assign(surtirFound, surtir)
        return this.surtirRepository.save(updateSurtir)
    }
}
