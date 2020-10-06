import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Endereco } from 'src/endereco/endereco';
import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {

    constructor(private alunoService : AlunoService){}

    @Post()
    async criar(@Body() aluno : Aluno, @Body() endereco : Endereco) {
        return await this.alunoService.criarAluno(aluno, endereco);
    }

    @Put(':id')
    async atualizar(@Param('id') id : number, @Body() aluno : Aluno){
        return await this.alunoService.atualizarAluno(id, aluno);
    }

    @Get(':id')
    async getPorId(@Param('id') id : number){
        if(id.toString() === 'media'){
            return await this.alunoService.getAlunosPorMedia();
        }
        return await this.alunoService.getAlunoPorId(id);    
    }

    @Get()
    async getTodos(){
        return await this.alunoService.getAlunos();
    }

    @Get(':id/endereco')
    async getEnderecos(@Param('id') id : number){
        return await this.alunoService.getAlunoEnderecos(id);
    }

    @Get('/:nota/criterio/:criterio')
    async getPorNota(@Param('nota') nota : number, @Param('criterio') criterio : string){      
        return await this.alunoService.getAlunosPorNota(nota, criterio);
    }


}
