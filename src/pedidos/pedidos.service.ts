import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedidos.entity';
import { createPedidoDto } from './Dto/create-pedido.dto';
import { updatePedidoDto } from './Dto/update-pedido-dto';


@Injectable()
export class PedidosService {

    constructor(@InjectRepository(Pedido) private pedidoRepository:Repository<Pedido>){}

    async createPedido(pedido: createPedidoDto){

        const {ID_person} = pedido

        if(!ID_person){
            throw new HttpException("Campo ID de la persona necesario para la creacion del pedido",HttpStatus.BAD_REQUEST)
        }

        const pedidoFound = await this.pedidoRepository.findOne({
            where:{
                ID_pedido: pedido.ID_pedido
            }
        })
        if(pedidoFound){
            return new HttpException("Este pedido ya existe",HttpStatus.CONFLICT)
        }
        const newPedido = this.pedidoRepository.create(pedido)
        return this.pedidoRepository.save(newPedido)
    }

    getPedidos(){
        return this.pedidoRepository.find()    
    }

    async getPedido(ID_pedido:number){
        const pedidoFound = await this.pedidoRepository.findOne({
            where:{
                ID_pedido
            }
        })
        if(!pedidoFound){
            return new HttpException("Pedido no encontrado verifique el identificador",HttpStatus.NOT_FOUND)
        }
        return pedidoFound
    }

    async updatePedido(ID_pedido:number,pedido:updatePedidoDto){
        const pedidoFound = await this.pedidoRepository.findOne({
            where:{
                ID_pedido
            }
        })

        if(!pedidoFound){
            return new HttpException("El pedido no fue encontrado verifique el identificador",HttpStatus.NOT_FOUND)
        }

        const updatePedido = Object.assign(pedidoFound,pedido)

        return this.pedidoRepository.save(updatePedido)
    }

    async deletePedido(ID_pedido:number){

        const pedidoFound = await this.pedidoRepository.findOne({

            where:{
                ID_pedido
            }
        })

        if(!pedidoFound){

            return new HttpException("Identificador invalido",HttpStatus.NOT_FOUND)
        }

        return this.pedidoRepository.delete(ID_pedido)
    }
}
