import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EnderecoEntity } from 'src/endereco/endereco.entity';

@Entity()
export class AlunoEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nome : string;

    @Column()
    dataNascimento : Date;

    @Column({unique : true})
    CPF : string;

    @Column()
    nota : number;

    @OneToMany(type => EnderecoEntity, endereco => endereco.aluno)
    enderecos : EnderecoEntity[];

}