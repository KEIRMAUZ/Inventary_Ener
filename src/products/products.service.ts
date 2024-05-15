import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Product} from 'src/products/products.entity'
import {createProductDto} from './Dto/create-product.dto'
import { updateProductDto } from './Dto/update-product.dto';


@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async createProduct(product:createProductDto){
        const productFound = await this.productRepository.findOne({
            where:{
                ID_folio: product.ID_folio
            }
        })
        if (productFound){
            return new HttpException(`El producto ya existe`,HttpStatus.CONFLICT)
        }
        const newProduct = this.productRepository.create(product)
        return this.productRepository.save(newProduct)
    }

    getProducts(){
        return this.productRepository.find()
    }

    async getProduct(ID_folio:number){

        const productFound = await this.productRepository.findOne({
            where:{
                ID_folio
            }
        })

        if (!productFound){
            return new HttpException("No se encontro el producto",HttpStatus.NOT_FOUND)
        }
        return productFound
    }
    
    async deleteProduct(ID_folio:number){
        const productFound = await this.productRepository.findOne({
            where : {
                ID_folio
            }
        })

        if(!productFound){
            return new HttpException("No se encontro un producto a eliminar",HttpStatus.NOT_FOUND)
        }

        return this.productRepository.delete(ID_folio)
    }

    async updateProduct(ID_folio:number, product:updateProductDto){
        const productFound = await this.productRepository.findOne({
            where:{
                ID_folio
            }
        })

        if (!productFound){
            return new HttpException("No se encontro el producto a actualizar",HttpStatus.NOT_FOUND)
        }

        const updateProduct = Object.assign(productFound,product)
        return this.productRepository.save(updateProduct)
    }
}
