import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Product} from 'src/products/products.entity'
import {createProductDto} from './Dto/create-product.dto'
import { updateProductDto } from './Dto/update-product.dto';
import {CategorysService} from 'src/categorys/categorys.service'
import { QualityService } from 'src/qualitys/quality.service';


@Injectable()
export class ProductsService {
    
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>,private categoryService: CategorysService, private qualityService: QualityService){}

    async createProduct(product: createProductDto){

        const {ID_folio} = product
        const {ID_num_part} = product
        const {ID_cod_proveedor} = product
        const {name_product} = product
        const {unit_price} = product
        const {precio_mayoreo} = product
        const {ID_quality} = product
        const {ID_category} = product
        const {description} = product
        const {stock} = product
        const {para_que_maquina} = product
        const {tipo_maquina} = product
        
        if(!ID_folio){
            throw new HttpException("El ID del folio del producto es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!ID_num_part){
            throw new HttpException("El ID del numero de parte del producto es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!ID_cod_proveedor){
            throw new HttpException("El ID del proveedor del producto es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!name_product){
            throw new HttpException("El nombre del producto es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!unit_price){
            throw new HttpException("El precio unitario del producto es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!precio_mayoreo){
            throw new HttpException("El precio de mayoreo del producto es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!ID_quality){
            throw new HttpException("El ID de la calidad del producto es necesaria",HttpStatus.BAD_REQUEST)
        }
        if(!ID_category){
            throw new HttpException("El ID de la categoria del producto es necesario",HttpStatus.BAD_REQUEST)
        }
        if(!description){
            throw new HttpException("Es necesario agregar una descripcion del producto",HttpStatus.BAD_REQUEST)
        }
        if(!tipo_maquina){
            throw new HttpException("Es necesario especificar el tipo de maquina",HttpStatus.BAD_REQUEST)
        }
        if(!para_que_maquina){
            throw new HttpException("Es necesario indicar para que maquina es el producto",HttpStatus.BAD_REQUEST)
        }

        const categoryFound = await this.categoryService.getCategory(product.ID_category)

        if(!categoryFound){
            return new HttpException("Categoria no existente",HttpStatus.NOT_FOUND)
        };

        const qualityFound = await this.qualityService.getQuality(product.ID_quality)

        if(!qualityFound){
            return new HttpException("Calidad no existente",HttpStatus.NOT_FOUND)
        }

        if(!stock){
            return new HttpException("Es necesario indicar el stock", HttpStatus.BAD_REQUEST)
        }


        const productFound = await this.productRepository.findOne({
            where:{
                ID_folio: product.ID_folio
            }
        })
        if (productFound){
            return new HttpException(`El producto ya existe`,HttpStatus.CONFLICT)
        };
        const newProduct = this.productRepository.create(product)
        return this.productRepository.save(newProduct),{message:'Producto creado de manera correcta'}
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
