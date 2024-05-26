import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import {createQualityDto} from './Dto/create-quality.dto'
import {updateQualityDto} from './Dto/update-quality.dto'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Quality} from 'src/qualitys/quality.entity'
    
@Injectable()
export class QualityService {

    constructor(@InjectRepository(Quality) private qualityRepository:Repository<Quality>){}

    async createQuality (quality: createQualityDto){
        const {quality_name} = quality;

        if(!quality_name){
            throw new HttpException("El nombre de la calidad necesario",HttpStatus.BAD_REQUEST)
        }
        const qualityFound = await this.qualityRepository.findOne({
            where:{
                quality_name: quality.quality_name,
            }
        })
        if(qualityFound){
            return new HttpException("Calidad ya existente",HttpStatus.CONFLICT)
        }
        
        const newQuality = this.qualityRepository.create(quality)
        return this.qualityRepository.save(newQuality),{message:'Calidad creada de manera exitosa'}
        
    }


    getQualitys(){
        return this.qualityRepository.find()
    }

    async getQuality(ID_quality:number){
        const qualityFound = await this.qualityRepository.findOne({
            where:{
                ID_quality
            }
        })
        if(!qualityFound){
            return new HttpException("Calidad no existente",HttpStatus.NOT_FOUND)
        }
        return qualityFound
    }


    async deleteQuality(ID_quality:number){
        const qualityFound = await this.qualityRepository.findOne({
            where:{
                ID_quality
            }
        })
        if(!qualityFound){
            return new HttpException("Calidad no encontrada",HttpStatus.NOT_FOUND)
        }
        return this.qualityRepository.delete(ID_quality)
    }

    async updateQuality(ID_quality:number,quality:updateQualityDto){
        const qualityFound = await this.qualityRepository.findOne({
            where:{
                ID_quality
            }
        })
        if (!qualityFound){
            return new HttpException("Calidad no existente",HttpStatus.NOT_FOUND)
        }
        const updateQuality = Object.assign(qualityFound,quality)
        return this.qualityRepository.save(updateQuality)
    }
}
