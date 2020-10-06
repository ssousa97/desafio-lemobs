import { Param, Controller, Get, Post, Body } from '@nestjs/common';
import { Endereco } from './endereco';
import { EnderecoService } from './endereco.service';

@Controller('endereco')
export class EnderecoController {

    constructor(private enderecoService : EnderecoService){}


    @Post()
    async create(@Body() endereco : Endereco){
        return await this.enderecoService.createEndereco(endereco);
    }

    @Get()
    async getEndereco(){
        return await this.enderecoService.getEnderecos();
    }

    @Get(':bairro')
    async getEnderecoPorBairro(@Param('bairro') bairro : string){
        return await this.enderecoService.getEnderecosPorBairro(bairro);
    }


}
