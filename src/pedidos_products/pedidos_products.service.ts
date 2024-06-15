import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/pedidos/pedidos.entity';
import { Product } from 'src/products/products.entity';
import {createPedidoProductsDto} from './Dto/create-pedidos_products.dto'
import { ProductoPedido } from 'src/pedidos_products/pedidos_products.entity';
@Injectable()
    export class PedidosProductsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
        @InjectRepository(ProductoPedido) private productoPedidoRepository: Repository<ProductoPedido>,
    ) {}

    async getAllPedidosProductos() {
        return this.pedidoRepository.find({
            relations: ['productoPedidos', 'productoPedidos.product'],
        });
    }

    async getProductByPedido(ID_pedido: number) {
        const pedido = await this.pedidoRepository.findOne({
            where: { ID_pedido },
            relations: ['productoPedidos', 'productoPedidos.product'],
        });
    
        if (!pedido) {
            throw new HttpException("Pedido no encontrado", HttpStatus.NOT_FOUND);
        }
    
        return pedido.productoPedidos.map(pp => pp.product);
    }

    async removeProductFromPedido(ID_pedido: number, ID_folio: number): Promise<{ message: string }> {
        const productoPedido = await this.productoPedidoRepository.findOne({
            where: {
                ID_pedido,
                ID_folio,
            },
        });

        if (!productoPedido) {
            throw new HttpException("Producto no encontrado en el pedido", HttpStatus.NOT_FOUND);
        }

        await this.productoPedidoRepository.remove(productoPedido);

        return { message: 'Producto eliminado del pedido' };
    }
    
    async createPedidoProducts(createPedidoProductsDto: createPedidoProductsDto) {
        const { ID_pedido, ID_folio, cantidad } = createPedidoProductsDto;
    
        try {
            
            const pedido = await this.pedidoRepository.findOne({ where: { ID_pedido } });
            if (!pedido) {
                throw new HttpException(`Pedido con ID ${ID_pedido} no encontrado`, HttpStatus.NOT_FOUND);
            }
    
            
            const producto = await this.productRepository.findOne({ where: { ID_folio } });
            if (!producto) {
                throw new HttpException(`Producto con folio ${ID_folio} no encontrado`, HttpStatus.NOT_FOUND);
            }
    
            
                const pedidoProducto = new ProductoPedido();
                pedidoProducto.pedido = pedido;
                pedidoProducto.product = producto;
                pedidoProducto.Cantidad = cantidad;
    
            
            await this.productoPedidoRepository.save(pedidoProducto);
    
            return pedidoProducto; 
        } catch (error) {
            throw new HttpException(`Error al agregar producto al pedido: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
}