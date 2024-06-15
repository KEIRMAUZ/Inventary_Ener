import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedidos.entity';
import { ProductoPedido } from 'src/pedidos_products/pedidos_products.entity';
import { createPedidoDto } from './Dto/create-pedido.dto';
import { updatePedidoDto } from './Dto/update-pedido-dto';

@Injectable()
    export class PedidosService {
    constructor(
        @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
        @InjectRepository(ProductoPedido) private productoPedidoRepository: Repository<ProductoPedido>,
    ) {}

    async createPedido(pedido: createPedidoDto) {
        const newPedido = this.pedidoRepository.create(pedido);
        return this.pedidoRepository.save(newPedido);
    }

    getPedidos() {
        return this.pedidoRepository.find({
        relations: ['productoPedidos', 'productoPedidos.product', 'person'],
        });
    }

    async getPedido(ID_pedido: number) {
        const pedidoFound = await this.pedidoRepository.findOne({
        where: {
            ID_pedido,
        },
        relations: ['productoPedidos', 'productoPedidos.product'],
        });
        if (!pedidoFound) {
        throw new HttpException("Pedido no encontrado", HttpStatus.NOT_FOUND);
        }
        return pedidoFound;
    }

    async updatePedido(ID_pedido: number, pedido: updatePedidoDto) {
        const pedidoFound = await this.pedidoRepository.findOne({
        where: {
            ID_pedido,
        },
        relations: ['productoPedidos', 'productoPedidos.product'],
        });

        if (!pedidoFound) {
        throw new HttpException("El pedido no fue encontrado", HttpStatus.NOT_FOUND);
        }

        const updatePedido = Object.assign(pedidoFound, pedido);

        return this.pedidoRepository.save(updatePedido);
    }

    async deletePedido(ID_pedido: number): Promise<DeleteResult> {
        
        const pedidoFound = await this.pedidoRepository.findOne({
            where: { ID_pedido },
            relations: ['productoPedidos'],
        });

        if (!pedidoFound) {
            throw new HttpException('Pedido no encontrado', HttpStatus.NOT_FOUND);
        }

        try {
            
            await Promise.all(pedidoFound.productoPedidos.map(async productoPedido => {
                await this.pedidoRepository.manager.remove(productoPedido);
            }));

            
            const deleteResult = await this.pedidoRepository.delete(ID_pedido);

            return deleteResult;
        } catch (error) {
            throw new HttpException(`Error al eliminar pedido: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}