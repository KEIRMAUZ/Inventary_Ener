import { Controller,Post,Body,Get,Delete,Param ,ParseIntPipe,Patch} from '@nestjs/common';
import { createProductDto } from './Dto/create-product.dto';
import { updateProductDto } from './Dto/update-product.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){}
    
    @Post()
    createProduct(@Body() newProduct:createProductDto){
        return this.productsService.createProduct(newProduct)
    }

    @Get()
    getProducts():Promise<Product[]>{
        return this.productsService.getProducts()
    }

    @Get(':ID_folio')
    getProduct(@Param('ID_folio', ParseIntPipe) ID_folio:number){
        return this.productsService.getProduct(ID_folio)
    }

    @Delete(':ID_folio')
    deleteProduct(@Param('ID_folio', ParseIntPipe) ID_folio:number){
        return this.productsService.deleteProduct(ID_folio)
    }

    @Patch(':ID_folio')
    updateProduct(@Param('ID_folio',ParseIntPipe) ID_folio:number, @Body() product: updateProductDto){
        return this.productsService.updateProduct(ID_folio,product)
    }
}
