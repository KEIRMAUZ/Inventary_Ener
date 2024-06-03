import { Controller,Post,Body,Get,Delete,Param ,ParseIntPipe,Patch,Render, UploadedFile,UseInterceptors,Res,HttpException,HttpStatus,NotFoundException} from '@nestjs/common';
import {join} from 'path'
import { promises as fs } from 'fs';
import { createProductDto } from './Dto/create-product.dto';
import { updateProductDto } from './Dto/update-product.dto';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';



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

    
    @Post('createProduct')
    @Render('products/create-product')
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(
        @Body() newProduct: createProductDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        if (image) {
        newProduct.image = `imagenes/${image.filename}`; 
        }
        return this.productsService.createProduct(newProduct);
    }

    
    @Get(':ID_folio/image')
    async getProductImage(@Param('ID_folio') ID_folio: number, @Res() res: Response) {
        const product = await this.productsService.getProduct(ID_folio);

        if (!product || !product.image) {
        throw new NotFoundException('Image not found');
        }

        const imagePath = join(__dirname, '../../public', product.image);

        try {
        await fs.access(imagePath); 
        res.sendFile(imagePath);
        } catch (err) {
        throw new NotFoundException('Image not found');
        }
    }

    @Get(':ID_folio')
    getProduct(@Param('ID_folio', ParseIntPipe) ID_folio:number){
        return this.productsService.getProduct(ID_folio)
    }

    @Get()
    getProducts(){
        return this.productsService.getProducts()
    }

    @Delete(':ID_folio')
    deleteProduct(@Param('ID_folio', ParseIntPipe) ID_folio:number){
        return this.productsService.deleteProduct(ID_folio)
    }

    
    @Patch(':ID_folio')
    @UseInterceptors(FileInterceptor('image'))
    async updateProduct(
        @Param('ID_folio') ID_folio: number,
        @Body() updateProductDto: updateProductDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        
        if (image) {
        updateProductDto.image = `imagenes/${image.filename}`;
        }

        const updatedProduct = await this.productsService.updateProduct(ID_folio, updateProductDto);
        if (!updatedProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'Producto actualizado de manera correcta' };
    }
}
