import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Endereco } from 'src/endereco/endereco';
import { EnderecoEntity } from 'src/endereco/endereco.entity';
import { Repository } from 'typeorm';
import { Aluno } from './aluno';
import { AlunoEntity } from './aluno.entity';

@Injectable()
export class AlunoService {

    constructor(
        @InjectRepository(AlunoEntity)
        private alunoRepository : Repository<AlunoEntity>,
        @InjectRepository(EnderecoEntity)
        private enderecoRepository : Repository<EnderecoEntity>){}


    async criarAluno(aluno: Aluno, endereco : Endereco){
        try{
            if(! await this.alunoRepository.findOne({CPF : aluno.CPF})){

                let novoAluno = new AlunoEntity();
                let novoEndereco = new EnderecoEntity();
        
                novoAluno.nome = aluno.nome;
                novoAluno.CPF = aluno.CPF;
                novoAluno.dataNascimento = new Date(aluno.dataNascimento);
                novoAluno.nota = aluno.nota;
        
                await this.alunoRepository.save(novoAluno); 
        
                novoEndereco.bairro = endereco.bairro;
                novoEndereco.complemento = endereco.complemento;
                novoEndereco.numero = endereco.numero;
                novoEndereco.rua = endereco.rua;
                novoEndereco.aluno = novoAluno;
        
                await this.enderecoRepository.save(novoEndereco);
    
                return true;
            }
        }catch(e){
            console.error(e);
            return false;
        }

    }

    async atualizarAluno(id: number, aluno: Aluno){

        let editarAluno = await this.alunoRepository.findOne({id : id});
        if(editarAluno){
            //check if its undefined, if it is, then do not change.
            editarAluno.CPF = aluno.CPF ? aluno.CPF : editarAluno.CPF;
            editarAluno.dataNascimento = aluno.dataNascimento ? aluno.dataNascimento : editarAluno.dataNascimento;
            editarAluno.nome = aluno.nome ? aluno.nome : editarAluno.nome;
            editarAluno.nota = aluno.nota ? aluno.nota : editarAluno.nota;

            await this.alunoRepository.save(editarAluno);
            return true;
        }
        return false;

    }

    async getAlunoPorId(id: number){
        return await this.alunoRepository.findOne({id : id});
    }

    async getAlunos(){
        return await this.alunoRepository.find();  
    }

    async getAlunoEnderecos(id: number){
        let enderecos = this.enderecoRepository.findAndCount({
            aluno : await this.alunoRepository.findOne({id : id})
        });

        let enderecosFormatados = enderecos[0].map(endereco => {
            return {
             endereço : `Rua ${endereco.rua}, ${endereco.numero} - ${endereco.complemento}`,
             bairro : endereco.bairro
            }
        });

        return {total : enderecos[1], endereços : enderecosFormatados};
    }

    async getAlunosPorNota(nota: number, criterio : String){
        if(criterio === '>'){
            return await this.alunoRepository
            .createQueryBuilder('aluno_entity')
            .where('aluno_entity.nota > :nota',{nota : nota})
            .getMany();
        }else{
            return await this.alunoRepository
            .createQueryBuilder('aluno_entity')
            .where('aluno_entity.nota < :nota',{nota : nota})
            .getMany();
        }           
    }

    async getAlunosPorMedia(){

        let alunos = await this.alunoRepository
        .createQueryBuilder('aluno_entity')
        .getManyAndCount();

        let sum = 0;

        for(const aluno of alunos[0])    {
            sum += aluno.nota;    
        }
        let media = sum / alunos[1];


        return await this.alunoRepository
        .createQueryBuilder('aluno_entity')
        .where('aluno_entity.nota > :media', {media : media})
        .getMany();
    
    }


}
