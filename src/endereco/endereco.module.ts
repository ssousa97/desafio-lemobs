import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoEntity } from 'src/aluno/aluno.entity';
import { EnderecoController } from './endereco.controller';
import { EnderecoEntity } from './endereco.entity';
import { EnderecoService } from './endereco.service';

@Module({
    imports : [TypeOrmModule.forFeature([EnderecoEntity]), TypeOrmModule.forFeature([AlunoEntity])],
    controllers: [EnderecoController],
    providers:[EnderecoService],
})
export class EnderecoModule {}
