import { ApiProperty } from "@nestjs/swagger";

export class Endereco{
    id: number;

    @ApiProperty()
    rua: string;

    @ApiProperty()
    numero: string;

    @ApiProperty()
    complemento: string;

    @ApiProperty()
    bairro: string;
    
    alunoId: number;
}