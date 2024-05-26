import { Controller, Post,Patch,Delete,Body,Param,Get, ParseIntPipe } from '@nestjs/common';
import { Pedido } from './pedidos.entity';
import { createPedidoDto } from './Dto/create-pedido.dto';
import { updatePedidoDto } from './Dto/update-pedido-dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {

    constructor(private pedidoService:PedidosService){}

    @Post()
    createPedido(@Body() newPedido:createPedidoDto){

        return this.pedidoService.createPedido(newPedido)
    }

    @Get()
    getPedidos():Promise<Pedido[]>{
        return this.pedidoService.getPedidos()
    }

    @Get(':ID_pedido')
    getPedido(@Param('ID_pedido', ParseIntPipe) ID_pedido:number){
        return this.pedidoService.getPedido(ID_pedido)
    }

    @Delete(':ID_pedido')
    deletePedido(@Param('ID_pedido', ParseIntPipe) ID_pedido:number){
        return this.pedidoService.deletePedido(ID_pedido)
    }

    @Patch(':ID_pedido')
    updatePedido(@Param('ID_pedido', ParseIntPipe) ID_pedido:number, @Body() pedido:updatePedidoDto){
        return this.pedidoService.updatePedido(ID_pedido,pedido)
    }
}
