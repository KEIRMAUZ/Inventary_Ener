import { Controller,Post,Body,Get,Delete,Param ,ParseIntPipe,Patch} from '@nestjs/common';
import {createCategoryDto} from './Dto/create-categorysdto'
import {Category} from 'src/categorys/categorys.entity'
import {CategorysService} from './categorys.service'
import { updateCategoryDto } from './Dto/update-category.dto';

@Controller('categorys')
export class CategorysController {
    constructor(private categoryService: CategorysService){}

    @Post()
    createCategory(@Body() newCategory: createCategoryDto){
        return this.categoryService.createCategory(newCategory)
    }

    @Get()
    getCategorys():Promise<Category[]>{
        return this.categoryService.getCategorys()
    }

    @Get(':ID_category')
    getCategory(@Param('ID_category', ParseIntPipe) ID_category:number){
        return this.categoryService.getCategory(ID_category)
    }

    @Delete(':ID_category')
    deleteCategory(@Param('ID_category',ParseIntPipe) ID_category:number){
        return this.categoryService.deleteCategory(ID_category)
    }

    @Patch(':ID_category')
    updateCategory(@Param('ID_category',ParseIntPipe) ID_category:number,@Body()category:updateCategoryDto){
        return this.categoryService.updateCategory(ID_category,category)
    }
}
