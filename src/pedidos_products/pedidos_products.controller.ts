import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { PedidosProductsService } from './pedidos_products.service';
import {createPedidoProductsDto} from 'src/pedidos_products/Dto/create-pedidos_products.dto'

@Controller('pedido-productos')
    export class ProductoPedidoController {
    constructor(private readonly pedidosProductsService: PedidosProductsService) {}

    @Get()
    getAllPedidosProductos() {
        return this.pedidosProductsService.getAllPedidosProductos();
    }

    @Get(':id/pedidos')
    getProductByPedido(@Param('id') id: number) {
        return 
        this.pedidosProductsService.getProductByPedido(id);
    }

    @Post()
    async create(@Body() createPedidoProductsDto: createPedidoProductsDto) {
        return this.pedidosProductsService.createPedidoProducts(createPedidoProductsDto);
    }

    @Delete(':pedidoId/product/:productId')
    removeProductFromPedido(
        @Param('pedidoId') pedidoId: number,
        @Param('productId') productId: number
    ) {
        return this.pedidosProductsService.removeProductFromPedido(pedidoId, productId);
    }
    }