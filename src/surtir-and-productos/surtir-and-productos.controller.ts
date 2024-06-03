import { Controller, Post, Delete, Param, Body, Get, ParseIntPipe } from '@nestjs/common';
import { SurtirAndProductosService } from './surtir-and-productos.service';
import { CreateProductToSurtirDto } from './Dto/createProductoToSurtir.dto';

@Controller('surtir-and-productos')
export class SurtirAndProductosController {

    constructor(private readonly productToSurtirService: SurtirAndProductosService) {}

    @Get()
    async getAllSurtirWithProducts() {
        return this.productToSurtirService.getAllSurtirWithProducts();
    }

    @Post()
    addProductToSurtir(@Body() createProductToSurtirDto: CreateProductToSurtirDto) {
        return this.productToSurtirService.addProductToSurtir(createProductToSurtirDto);
    }

    @Delete(':ID_surtir/:ID_folio')
    removeProductFromSurtir(
        @Param('ID_surtir', ParseIntPipe) ID_surtir: number,
        @Param('ID_folio', ParseIntPipe) ID_folio: number,
    ) {
        return this.productToSurtirService.removeProductFromSurtir(ID_surtir, ID_folio);
    }

    @Get(':ID_surtir')
    getProductsBySurtir(@Param('ID_surtir', ParseIntPipe) ID_surtir: number) {
        return this.productToSurtirService.getProductsBySurtir(ID_surtir);
    }
}