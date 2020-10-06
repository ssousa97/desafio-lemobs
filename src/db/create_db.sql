
create table if not exist aluno_entity(
    id serial primary key,
    nome varchar (50) not null,
    dataNascimento date not null,
    CPF varchar(11) unique not null,
    nota integer not null

);

create table if not exist endereco_entity(
    id serial primary key,
    aluno_id int, 
    rua varchar(50) not null,
    bairro varchar(50) not null,
    numero varchar(20) default "s/n",
    complemento varchar(20) default "",
    constraint fk_aluno foreign key (aluno_id) references aluno_entity(id)

    
)
