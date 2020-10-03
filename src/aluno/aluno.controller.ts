import { Controller, Get, Post, Put } from '@nestjs/common';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {

    constructor(private alunoService : AlunoService){}


}
