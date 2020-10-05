import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {

    constructor(private alunoService : AlunoService){}

    @Post()
    async create(@Body() aluno : Aluno) : Promise<void> {
        return this.alunoService.createAluno(aluno);
    }

    @Put(':id')
    async update(@Param('id') id : number, @Body() aluno : Aluno) : Promise<Aluno>{
        return this.alunoService.updateAluno(id, aluno);
    }

    @Get(':id')
    async getById(@Param('id') id : number){
        if(id.toString() === 'media'){
            return this.alunoService.getAlunosByMedia();
        }
        return this.alunoService.getAlunoById(id);    
    }

    @Get()
    async getAll():Promise<Aluno[]>{
        return this.alunoService.getAlunos();
    }

    @Get(':id/endereco')
    async getEndereco(@Param('id') id : number){
        return this.alunoService.getAlunoEnderecos(id);
    }

    @Get('/:id/criterio/:criterio')
    async getByNota(@Param('id') nota : number, @Param('criterio') criterio : String): Promise<Aluno[]>{      
        return this.alunoService.getAlunosByNota(nota, criterio);
    }


}
