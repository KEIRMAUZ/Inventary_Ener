import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Product} from 'src/products/products.entity'
import {createProductDto} from './Dto/create-product.dto'
import { updateProductDto } from './Dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    createProduct(product:createProductDto){
        const newProduct = this.productRepository.create(product)
        return this.productRepository.save(newProduct)
    }

    getProducts(){
        return this.productRepository.find()
    }

    getProduct(ID_folio:number){
        return this.productRepository.findOne({
            where:{
                ID_folio
            }
        })
    }
    
    deleteProduct(ID_folio:number){
        return this.productRepository.delete({ID_folio})
    }

    updateProduct(ID_folio:number, product:updateProductDto){
        return this.productRepository.update({ID_folio},product)
    }
}
