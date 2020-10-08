import { ApiProperty } from "@nestjs/swagger";
import { Endereco } from "src/endereco/endereco";

export class Aluno{
    id: number;

    @ApiProperty()
    nome : string;
    
    @ApiProperty()
    dataNascimento: Date;
    
    @ApiProperty()
    CPF: string;

    @ApiProperty()
    nota: number;

    @ApiProperty()
    endereco : Endereco;
    
}