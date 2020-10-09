import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {

    constructor(private alunoService : AlunoService){}

    @Post()
    @ApiResponse({description : "True ou False, dependendo se foi inserido ou não"})
    async criar(@Body() aluno : Aluno) {
        return await this.alunoService.criarAluno(aluno);
    }

    @Put(':id')
    @ApiResponse({description : "True ou False, dependendo se foi inserido ou não"})
    async atualizar(@Param('id') id : number, @Body() aluno : Aluno){
        return await this.alunoService.atualizarAluno(id, aluno);
    }

    @Get(':id')
    @ApiResponse({description : "Retorna o aluno, caso não exista retorna false.\n Se o parametro for 'media' retorna os alunos cuja nota é maior que a media de todos os alunos"})
    async getPorId(@Param('id') id : number){
        if(id.toString() === 'media'){
            return await this.alunoService.getAlunosPorMedia();
        }
        return await this.alunoService.getAlunoPorId(id);    
    }

    @Get()
    @ApiResponse({description : "Retorna a lista de alunos, caso de errado retorna false"})
    async getTodos(){
        return await this.alunoService.getAlunos();
    }

    @Get(':id/endereco')
    @ApiResponse({description : "Retorna os endereços de um aluno"})
    async getEnderecos(@Param('id') id : number){
        return await this.alunoService.getAlunoEnderecos(id);
    }

    @Get('/:nota/criterio/:criterio')
    @ApiResponse({description : "Retorna os alunos cuja nota é maior ou menor que o critério passado"})
    async getPorNota(@Param('nota') nota : number, @Param('criterio') criterio : string){      
        return await this.alunoService.getAlunosPorNota(nota, criterio);
    }

}
