import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
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

    
    async criarAluno(aluno : Aluno){
        try{
            if(! await this.alunoRepository.findOne({CPF : aluno.CPF})){
                if(!this.validarCPF(aluno.CPF.toString())) {
                    return 'CPF Inválido';
                }

                let novoAluno = new AlunoEntity();
                let novoEndereco = new EnderecoEntity();
        
                novoAluno.nome = aluno.nome;
                novoAluno.CPF = aluno.CPF;
                novoAluno.dataNascimento = new Date(aluno.dataNascimento);
                novoAluno.nota = aluno.nota;
        
                await this.alunoRepository.save(novoAluno); 
            
                novoEndereco.bairro = aluno.bairro;
                novoEndereco.complemento = aluno.complemento;
                novoEndereco.numero = aluno.numero;
                novoEndereco.rua = aluno.rua;
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

        try{
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

        }catch(e){
            console.error(e);
            return false;
        }


    }

    async getAlunoPorId(id: number){

        try{

            let aluno = await this.alunoRepository.findOne({id : id});
            this.formatarCPF(aluno);
    
            return aluno;

        }catch(e){

            console.error(e);
            return false;
        }

    }

    async getAlunos(){
        try{

            let alunos = await this.alunoRepository.find();
            alunos.forEach(aluno => this.formatarCPF(aluno));
    
            return alunos; 

        }catch(e){
            console.error(e);
            return false;
        }
 
    }

    async getAlunoEnderecos(id: number){

        try{
            let enderecos = await this.enderecoRepository
            .createQueryBuilder('endereco_entity')
            .where('endereco_entity.aluno_id = :id',{id : id})
            .getManyAndCount();
    
            let enderecosFormatados = enderecos[0].map(endereco => {
                return {
                 endereço : `Rua ${endereco.rua}, ${endereco.numero} - ${endereco.complemento}`,
                 bairro : endereco.bairro
                }
            });
    
            return {total : enderecos[1], endereços : enderecosFormatados};

        }catch(e){
            console.error(e);
            return false;
        }


    }

    async getAlunosPorNota(nota: number, criterio : String){
        try{

            let alunos = await this.alunoRepository
            .createQueryBuilder('aluno_entity')
            .where(`aluno_entity.nota ${criterio} :nota`,{nota : nota})
            .getMany();

            alunos.forEach(this.formatarCPF);
            return alunos;

        }catch(e){
            console.error(e);
            return false;
        }
          
    }

    @ApiResponse({description : "Retorna os alunos cuja nota é maior que a média de todos os alunos"})
    async getAlunosPorMedia(){
        try{

            let qtdAlunos = await this.alunoRepository
            .createQueryBuilder('aluno_entity')
            .getManyAndCount();
    
            let sum = 0;
    
            for(const aluno of qtdAlunos[0])    {
                sum += aluno.nota;    
            }
            let media = sum / qtdAlunos[1];
    
    
            let alunos = await this.alunoRepository
            .createQueryBuilder('aluno_entity')
            .where('aluno_entity.nota > :media', {media : media})
            .getMany();
            
            alunos.forEach(this.formatarCPF);

            return alunos;

        }catch(e){

            console.error(e);
            return false;

        }   
    }

    formatarCPF(aluno : AlunoEntity){

        aluno.CPF = `${aluno.CPF.substring(0,3)}.${aluno.CPF.substring(3,6)}.${aluno.CPF.substring(6,9)}-${aluno.CPF.substring(9,11)}`;
        
    }

    validarCPF(CPF : string){
        

        let parteSemDigito = CPF.substring(0,9);
        let primeiroDigitoValidador = CPF.substring(9,10);
        let segundoDigitoValidador = CPF.substring(10,11);
        let soma = 0;
        
        for(let i = 0; i < parteSemDigito.length;i++){
            soma += parseInt(parteSemDigito[i]) * (10 - i);
        }
        let resto = (soma * 10) % 11;

        if(resto === 10) resto = 0;

        if(resto !== parseInt(primeiroDigitoValidador)) return false;
        
        soma = 0;

        let parteComPrimeiroDigito = parteSemDigito + primeiroDigitoValidador;
        
        for(let i = 0; i < parteComPrimeiroDigito.length;i++){
            soma += parseInt(parteComPrimeiroDigito[i]) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if(resto === 10) resto = 0;
        if(resto !== parseInt(segundoDigitoValidador)) return false;
        
        return true;
    }


}
