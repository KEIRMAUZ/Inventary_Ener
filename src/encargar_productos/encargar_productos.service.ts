import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createEncargoDto } from './Dto/create-encargo.dto';
import { updateEncargoDto } from './Dto/update-encargo.dto';
import { Encargar_producto } from './encargar_productos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EncargarProductosService {

    constructor(@InjectRepository(Encargar_producto) private encargoRepository:Repository<Encargar_producto>){}

    async createPedido(encargo:createEncargoDto){

        const {ID_folio}=encargo
        if(!ID_folio){
            throw new HttpException("Es necesario indicar el producto (Campo vacio)",HttpStatus.BAD_REQUEST)
        }

        const pedidoFound = await this.encargoRepository.findOne({
            where:{
                ID_folio
            }
        })

        if(pedidoFound){
            return new HttpException("Este producto ya ha sido registrado en la lista de encargos",HttpStatus.CONFLICT)
        }

        const newPedido = this.encargoRepository.create(encargo)
        return this.encargoRepository.save(newPedido)
    }

    getEncargos(){
        return this.encargoRepository.find({
            relations:['product']
        })
    }

    async getEncargo(ID_folio:number){

        const encargoFound = await this.encargoRepository.findOne({
            where:{
                ID_folio
            }
        })

        if(!encargoFound){
            return new HttpException("El producto no se encuentra en la lista de encargos",HttpStatus.NOT_FOUND)
        }
        return encargoFound
    }

    async deleteEncargo(ID_encargar_productos:number){

        const encargoFound = await this.encargoRepository.findOne({
            where:{
                ID_encargar_productos
            }
        })

        if(!encargoFound){
            return new HttpException("Producto a encargar no encontrado",HttpStatus.NOT_FOUND)
        }

        return this.encargoRepository.delete(ID_encargar_productos)
    }

    async updateEncargo(ID_encargar_productos:number, encargo:updateEncargoDto){

        const encargoFound = await this.encargoRepository.findOne({
            where:{
                ID_encargar_productos
            }
        })

        if(!encargoFound){
            return new HttpException("ID de encargo no encontrada",HttpStatus.NOT_FOUND)
        }

        const updateencargo = Object.assign(encargoFound,encargo)
        return this.encargoRepository.save(updateencargo)
    }
}
