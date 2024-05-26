import { Controller,Post,Body,Get,Delete,Param ,ParseIntPipe,Patch,Render, UploadedFile,UseInterceptors} from '@nestjs/common';
import { createProductDto } from './Dto/create-product.dto';
import { updateProductDto } from './Dto/update-product.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){}

    @Get('inventario')
    @Render('products/get-products')
    getInventario(){
        return{};
    }
    
    @Get('createProduct')
    @Render('products/create-product')
    getCreateProduct(){
        return{}
    }

    @Get('delete')
    @Render('products/delete-product')
    deleteProductView(){
        return{}
    }

    @Get('update')
    @Render('products/update-product')
    updateProductView(){
        return{}
    }

    @Get('test')
    @Render('products/test')
    test(){
        return{}
    }

    @Post('createProduct')
    @Render('products/create-product')
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

    //@Patch(':ID_folio')
    //@UseInterceptors(FileInterceptor('image'))
    //async updateProduct( @Param('ID_folio') ID_folio: number, @Body() product: updateProductDto,
        //@UploadedFile() image: Express.Multer.File
    //) {
        //if (image) {
            //product.image = image.buffer;
        //}
        //return this.productsService.updateProduct(ID_folio, product);
    //}
}
