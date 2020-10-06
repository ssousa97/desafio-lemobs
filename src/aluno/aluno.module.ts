import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoEntity } from 'src/endereco/endereco.entity';
import { AlunoController } from './aluno.controller';
import { AlunoEntity } from './aluno.entity';
import { AlunoService } from './aluno.service';

@Module({
    imports : [TypeOrmModule.forFeature([AlunoEntity, EnderecoEntity])],
    controllers: [AlunoController],
    providers: [AlunoService]
})
export class AlunoModule {}
