create table if not exists <database>.time_entries (
  COD_CL varchar(50) primary key,
  COGNOME varchar(100),
  NOME varchar(100),
  RAGIONE SOCIALE	varchar(50),
  ADEMPIMENTO varchar(4000),
  SCADENZA ADEMPIMENTO date	not null,
  ANNO CIVILE	varchar (10),
  PREDISPOSTO boolean not null,
  NOTE CLIENTE	varchar(4000)
)