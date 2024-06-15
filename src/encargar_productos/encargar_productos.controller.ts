import { Controller, Body,Get,Render,Delete,Patch,Param,Post,ParseIntPipe } from '@nestjs/common';
import { EncargarProductosService } from './encargar_productos.service';
import { createEncargoDto } from './Dto/create-encargo.dto';
import { updateEncargoDto } from './Dto/update-encargo.dto';
import { Encargar_producto } from './encargar_productos.entity';

@Controller('encargar-productos')
export class EncargarProductosController {
    constructor(private encargoService:EncargarProductosService){}

    @Post('create')
    @Render('encargar_productos/encargar-create')
    createEncargo(@Body()newEncargo:createEncargoDto){
        return this.encargoService.createPedido(newEncargo)
    }

    @Get('get')
    @Render('encargar_productos/encargar-get')
    encargoGetView(){
        return{}
    }

    @Get('create')
    @Render('encargar_productos/encargar-create')
    encargoCreateView(){
        return{}
    }

    @Get('delete')
    @Render('encargar_productos/encargar-delete')
    encargodeleteView(){
        return{}
    }

    @Get()
    getEncargos():Promise<Encargar_producto[]>{
        return this.encargoService.getEncargos()
    }

    @Get(':ID_folio')
    getEncargo(@Param('ID_folio', ParseIntPipe) ID_encargar_productos:number){
        return this.encargoService.getEncargo(ID_encargar_productos)
    }

    @Delete(':ID_encargar_productos')
    deleteEncargo(@Param('ID_encargar_productos', ParseIntPipe) ID_encargar_productos:number){
        return this.encargoService.deleteEncargo(ID_encargar_productos)
    }

    @Patch(':ID_encargar_productos') 
    updateEncargo(@Param('ID_encargar_productos',ParseIntPipe) ID_encargar_productos:number, @Body() updateencargo:updateEncargoDto){
        return this.encargoService.updateEncargo(ID_encargar_productos,updateencargo)
    }
}
