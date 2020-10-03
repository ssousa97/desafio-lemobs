import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoController } from './aluno/aluno.controller';
import { EnderecoController } from './endereco/endereco.controller';
import { AlunoService } from './aluno/aluno.service';
import { EnderecoService } from './endereco/endereco.service';

@Module({
  imports: [],
  controllers: [AppController, AlunoController, EnderecoController],
  providers: [AppService, AlunoService, EnderecoService],
})
export class AppModule {}
