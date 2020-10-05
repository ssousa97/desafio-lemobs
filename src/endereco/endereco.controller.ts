import { Param, Controller, Get } from '@nestjs/common';
import { EnderecoService } from './endereco.service';

@Controller('endereco')
export class EnderecoController {

    constructor(private enderecoService : EnderecoService){}


}
