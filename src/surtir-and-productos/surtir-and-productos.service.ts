import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Surtir_producto } from 'src/surtir_productos/surtir_productos.entity';
import { CreateProductToSurtirDto } from './Dto/createProductoToSurtir.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SurtirAndProductosService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Surtir_producto) private surtirRepository: Repository<Surtir_producto>,
    ) {}

    async addProductToSurtir(createProductToSurtirDto: CreateProductToSurtirDto) {
        const { ID_surtir, ID_folio } = createProductToSurtirDto;

        const surtir = await this.surtirRepository.findOne({ 
            where: { ID_surtir }, 
            relations: ['product'] 
        });

        const product = await this.productRepository.findOne({ 
            where: { ID_folio } 
        });


        if (!surtir) {
            throw new HttpException('Surtir not found', HttpStatus.NOT_FOUND);
        }

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        if (!surtir.product.some(p => p.ID_folio === product.ID_folio)) {
            surtir.product.push(product);
            await this.surtirRepository.save(surtir);
        } else {
            throw new HttpException('Product already added to Surtir', HttpStatus.BAD_REQUEST);
        }

        return surtir;
    }

    async removeProductFromSurtir(ID_surtir: number, ID_folio: number) {
        const surtir = await this.surtirRepository.findOne({ where: { ID_surtir }, relations: ['product'] });
        if (!surtir) {
            throw new HttpException('Surtir not found', HttpStatus.NOT_FOUND);
        }

        surtir.product = surtir.product.filter(product => product.ID_folio !== ID_folio);
        await this.surtirRepository.save(surtir);

        return surtir;
    }

    async getProductsBySurtir(ID_surtir: number) {
        const surtir = await this.surtirRepository.findOne({ where: { ID_surtir }, relations: ['product'] });
        if (!surtir) {
            throw new HttpException('Surtir not found', HttpStatus.NOT_FOUND);
        }

        return surtir.product;
    }

    async getAllSurtirWithProducts() {
        return this.surtirRepository.find({ relations: ['product'] });
    }
}
