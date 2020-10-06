import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './endereco';
import { EnderecoEntity } from './endereco.entity';

@Injectable()
export class EnderecoService {

    constructor(
        @InjectRepository(EnderecoEntity)
        private enderecoRepository : Repository<EnderecoEntity>){}

    async createEndereco(endereco: Endereco){
        try{
            return await this.enderecoRepository.save(endereco);
        }catch(e){
            console.error(e);
            return false;
        }
        
    }

    async getEnderecos(){
        try{
            return await this.enderecoRepository.find();
        }catch(e){
            console.error(e);
            return false;
        }
    }

    async getEnderecosPorBairro(bairro : string){
        try{
            return await this.enderecoRepository
            .createQueryBuilder('endereco_entity')
            .where('bairro = :bairro',{bairro : bairro})
            .getMany();
        }catch(e){
            console.error(e);
            return false;
        }

    }

}
