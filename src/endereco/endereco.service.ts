import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoEntity } from 'src/aluno/aluno.entity';
import { Repository } from 'typeorm';
import { Endereco } from './endereco';
import { EnderecoEntity } from './endereco.entity';

@Injectable()
export class EnderecoService {

    constructor(
        @InjectRepository(EnderecoEntity)
        private enderecoRepository : Repository<EnderecoEntity>,
        @InjectRepository(AlunoEntity)
        private alunoRepository : Repository<AlunoEntity>){}

    async createEndereco(endereco: Endereco){
        try{

            let novoEndereco = new EnderecoEntity();

            novoEndereco.rua = endereco.rua;
            novoEndereco.numero = endereco.numero;
            novoEndereco.bairro = endereco.bairro;
            novoEndereco.complemento = endereco.complemento;
            novoEndereco.aluno = await this.alunoRepository.findOne({id : endereco.alunoId});

            return await this.enderecoRepository.save(novoEndereco);
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
