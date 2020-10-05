import { Module } from '@nestjs/common';
import { Endereco } from './endereco';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';

@Module({
    controllers: [EnderecoController],
    providers:[EnderecoService]
})
export class EnderecoModule {}
