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
        
        return await this.enderecoRepository.save(endereco);
    }

    async getEnderecos(){
        return await this.enderecoRepository.find();
    }

}
