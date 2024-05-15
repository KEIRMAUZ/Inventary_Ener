import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import {createCategoryDto} from 'src/categorys/Dto/create-categorysdto'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Category} from 'src/categorys/categorys.entity'
import { updateCategoryDto } from './Dto/update-category.dto';

@Injectable()
export class CategorysService {

    constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>){}

    async createCategory (category : createCategoryDto){
        const categoryFound = await this.categoryRepository.findOne({
            where :{
                ID_category: category.ID_category
            }
        })
        if (categoryFound){
            return new HttpException('La categoria ya existe',HttpStatus.CONFLICT)
        }
        const newCategory = this.categoryRepository.create(category)
        return this.categoryRepository.save(newCategory)
    }

    getCategorys(){
        return this.categoryRepository.find()
    }

    async getCategory(ID_category:number){
        const categoryFound = await this.categoryRepository.findOne({
            where:{
                ID_category
            }
        })

        if(!categoryFound){
            return new HttpException("Esta categoria no existente",HttpStatus.NOT_FOUND)
        }
        return categoryFound
    }

    async deleteCategory(ID_category:number){
        const categoryFound = await this.categoryRepository.findOne({
            where:{
                ID_category
            }
        })

        if(!categoryFound){
            return new HttpException("Categoria no existente",HttpStatus.NOT_FOUND)
        }
        return this.categoryRepository.delete(ID_category)
    }

    async updateCategory(ID_category:number,category:updateCategoryDto){
        const categoryFound = await this.categoryRepository.findOne({
            where:{
                ID_category
            }
        })
        if (!categoryFound){
            return new HttpException("La categoria no existe",HttpStatus.NOT_FOUND)
        }

        const updateCategory = Object.assign(categoryFound,category)
        return this.categoryRepository.save(updateCategory)
    }
}
