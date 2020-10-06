import { AlunoEntity } from 'src/aluno/aluno.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class EnderecoEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    rua : string;

    @Column({default : 's/n'})
    numero : string;

    @Column({default : ''})
    complemento : string;

    @Column()
    bairro : string;

    @ManyToOne(type => AlunoEntity, aluno => aluno.enderecos)
    aluno : AlunoEntity;


}
