import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoModule } from './aluno/aluno.module';
import { EnderecoModule } from './endereco/endereco.module';

@Module({
  imports: [AlunoModule, EnderecoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
