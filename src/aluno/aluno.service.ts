import { Injectable } from '@nestjs/common';
import { Aluno } from './aluno';

@Injectable()
export class AlunoService {


    alunos: Aluno[] = [
        {id: 1,nome: 'Samuel1',dataNascimento: new Date(),CPF : '14963818741',nota : 9},
        {id: 2,nome: 'Samuel2',dataNascimento: new Date(),CPF : '14963818742',nota : 3},
        {id: 3,nome: 'Samuel3',dataNascimento: new Date(),CPF : '14963818743',nota : 1},
        {id: 4,nome: 'Samuel4',dataNascimento: new Date(),CPF : '14963818744',nota : 10},
        {id: 5,nome: 'Samuel5',dataNascimento: new Date(),CPF : '14963818754',nota : 2},
        {id: 6,nome: 'Samuel6',dataNascimento: new Date(),CPF : '14963818764',nota : 6},
        {id: 7,nome: 'Samuel7',dataNascimento: new Date(),CPF : '14963818774',nota : 7},
        {id: 8,nome: 'Samuel8',dataNascimento: new Date(),CPF : '14963818784',nota : 8.5},
        {id: 9,nome: 'Samuel9',dataNascimento: new Date(),CPF : '14963818794',nota : 7.7},
        {id: 10,nome: 'Samuel10',dataNascimento: new Date(),CPF : '14963818704',nota : 5.4},
        {id: 11,nome: 'Samuel11',dataNascimento: new Date(),CPF : '14963818144',nota : 3},
        {id: 12,nome: 'Samuel12',dataNascimento: new Date(),CPF : '14963818244',nota : 7.6},
        {id: 13,nome: 'Samuel13',dataNascimento: new Date(),CPF : '14963818344',nota : 6.4},
        {id: 14,nome: 'Samuel14',dataNascimento: new Date(),CPF : '14963818444',nota : 10},
        {id: 15,nome: 'Samuel15',dataNascimento: new Date(),CPF : '14963818544',nota : 5},
        {id: 16,nome: 'Samuel16',dataNascimento: new Date(),CPF : '14963818644',nota : 8},

    ];


    createAluno(aluno: Aluno){

        
    }

    updateAluno(id: number, aluno: Aluno){

        let novoAluno = this.alunos.find(aluno => aluno.id == id);

        if(novoAluno){

            novoAluno.nome = aluno.nome;
            novoAluno.CPF = aluno.CPF;
            novoAluno.dataNascimento = aluno.dataNascimento;
            novoAluno.nota = aluno.nota;

        }
        return novoAluno;

    }

    getAlunoById(id: number){
        return this.alunos.find(aluno => aluno.id == id);     
    }

    getAlunos(){
        return this.alunos;

    }

    getAlunoEnderecos(id: number){
        return 'Not Implemented';
    }

    getAlunosByNota(nota: number, criterio : String){
        if(criterio === '>')
            return this.alunos.filter(x => x.nota > nota);   
        return this.alunos.filter(x => x.nota < nota); 
        
    }

    getAlunosByMedia(){
        let soma = 0;

        for(let aluno of this.alunos){
            soma += aluno.nota;
        } 

        let media = soma/this.alunos.length;

        return this.alunos.filter(x => x.nota > media);
    }


}
