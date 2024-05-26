import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { createSurtirDto } from './Dto/create-surtir.dto';
import { updateSurtirDto } from './Dto/update-surtir.dto';
import { Surtir_producto } from './surtir_productos.entity';
import { SurtirProductosService } from './surtir_productos.service';

@Controller('surtir-productos')
export class SurtirProductosController {
    constructor(private surtirService: SurtirProductosService){}

    @Post()
    createSurtir(@Body() newSurtir: createSurtirDto){
        return this.surtirService.createSurtir(newSurtir)
    }

    @Get()
    getSurtir():Promise<Surtir_producto[]>{
        return this.surtirService.getSurtir()
    }

    @Get(':ID_surtir')
    getSurtirOne(@Param('ID_surtir',ParseIntPipe) ID_surtir:number){
        return this.surtirService.getSurtirOne(ID_surtir)
    }

    @Delete(':ID_surtir')
    deleteSurtir(@Param('ID_surtir',ParseIntPipe) ID_surtir:number){
        return this.surtirService.deleteSurtir(ID_surtir)
    }

    @Patch(':ID_surtir')
    updateSurtir(@Param('ID_surtir',ParseIntPipe) ID_surtir:number, @Body() surtir:updateSurtirDto){
        return this.surtirService.updateSurtir(ID_surtir,surtir)
    }
}
