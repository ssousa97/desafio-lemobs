import { Param, Controller, Get, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Endereco } from './endereco';
import { EnderecoService } from './endereco.service';

@Controller('endereco')
export class EnderecoController {

    constructor(private enderecoService : EnderecoService){}


    @Post()
    @ApiResponse({description : "Retorna o endereço criado, caso contrário retorna false"})
    async create(@Body() endereco : Endereco){
        return await this.enderecoService.createEndereco(endereco);
    }

    @Get()
    @ApiResponse({description : "Retorna todos os endereços "})
    async getEndereco(){
        return await this.enderecoService.getEnderecos();
    }

    @Get(':bairro')
    @ApiResponse({description : "Retorna os endereços que pertecem a um bairro"})
    async getEnderecoPorBairro(@Param('bairro') bairro : string){
        return await this.enderecoService.getEnderecosPorBairro(bairro);
    }


}
