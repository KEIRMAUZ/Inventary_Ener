import { Controller,Post,Body,Get,Delete,Param ,ParseIntPipe,Patch, Render,Res} from '@nestjs/common';
import {Quality} from './quality.entity'
import {createQualityDto} from './Dto/create-quality.dto'
import {updateQualityDto} from './Dto/update-quality.dto'
import { QualityService } from './quality.service';




@Controller('qualitys')
export class QualityController {

    constructor(private qualityService: QualityService){}

    @Get('create')
    @Render('qualitys/qualitys-create')
    getCreateForm(){
        return{};
    }

    @Get('getQualitys')
    @Render('qualitys/qualitys-get')
    getViewQualitys(){
        return{};
    }

    @Get('delete')
    @Render('qualitys/qualitys-delete')
    deleteQualitys(){
        return{};
    }

    @Get('update')
    @Render('qualitys/qualitys-update')
    updateQualitys(){
        return{};
    }

    @Post('create')
    @Render('qualitys/qualitys-create')
    createQuality(@Body() newQuality:createQualityDto){
        return this.qualityService.createQuality(newQuality)
    }
    

    @Get()
    getQualitys():Promise<Quality[]>{
        return this.qualityService.getQualitys()
    }

    @Get(':ID_quality')
    getQuality(@Param('ID_quality', ParseIntPipe) ID_quality:number){
        return this.qualityService.getQuality(ID_quality)
    }

    @Delete(':ID_quality')
    deleteQuality(@Param('ID_quality',ParseIntPipe) ID_quality:number){
        return this.qualityService.deleteQuality(ID_quality)
    }

    

    @Patch(':ID_quality')
    updateQuality(@Param('ID_quality',ParseIntPipe) ID_quality:number, @Body() quality:updateQualityDto){
        return this.qualityService.updateQuality(ID_quality,quality)
    }

}
