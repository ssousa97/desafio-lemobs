import { ApiProperty } from "@nestjs/swagger";

export class Aluno{
    id: number;

    @ApiProperty()
    nome : string;
    
    @ApiProperty({example : "MM/DD/YYYY"})
    dataNascimento: Date;
    
    @ApiProperty({example : "11122233344"})
    CPF: string;

    @ApiProperty()
    nota: number;

    @ApiProperty()
    rua: string;

    @ApiProperty()
    numero: string;

    @ApiProperty()
    complemento: string;

    @ApiProperty()
    bairro: string;
    
}