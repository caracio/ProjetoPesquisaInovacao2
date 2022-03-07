class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.RedeFarmacia();
    this.Filial();
    this.Computador();
    this.MemoriaMassa();
    this.Monitoramento();
    this.MonitoradoresFiliais();
  }
  //projetoPiFarmacia --> Criação das Tabelas no Banco de Dados
  RedeFarmacia() {
    const sql = `
    create table if not exists projetoPiFarmacia.RedeFarmacia (
      idRedeFarmacia int primary key auto_increment,
      CNPJ char(14),
      nomeRede varchar (15),
                  email varchar(30),
                  senha varchar(25)
                  );
        `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Filial -->" + error);
      }
      console.log("Tabela RedeFarmacia criada com sucesso!!!\n");
    });
  }
  Filial() {
    const sql = `
    create table if not exists Filial (
      idFilial int primary key auto_increment,
      rua varchar(40),
      bairro varchar(30),
                cidade varchar(30),
                numero tinyint,
                grauAcesso char(2),
                fkRedeFarmacia int,
                constraint fk_redeFarmacia_Filial
          foreign key (fkRedeFarmacia)
            references redeFarmacia(idRedeFarmacia),
              constraint Acesso
                check (grauAcesso = 'P' or grauAcesso = 'T')
      );

  `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Filial --->" + error);
      }
      console.log("Tabela Filial criada com sucesso!!!\n");
    });
  }
  Computador() {
    const sql = `
     create table if not exists projetoPiFarmacia.Computador (
      idComputador int primary key auto_increment,
                  processador varchar(30),
                  GPU varchar(30),
                  qtdMemoria tinyint,
                  fkFilial int,
                  constraint fk_Filial_Computador
           foreign key (fkFilial)
            references Filial(idFilial)
      );
     `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Computador -->" + error);
      }
      console.log("Tabela Computador criada com sucesso!!!\n");
    });
  }
  MemoriaMassa() {
    const sql = `
        create table IF NOT EXISTS projetoPiFarmacia.MemoriaMassa (
          idMemoriaMassa int primary key auto_increment,
                      nome varchar(30),
                      tipo char(3),
                      memoriaTotal double,
                      unidadeMedida char(2),
                      fkComputador int,
                      constraint fk_Computador_MemoriaMassa
            foreign key(fkComputador)
                references Computador(idComputador),
          constraint Medida 
            check (unidadeMedida = 'MB' or unidadeMedida = 'GB' or unidadeMedida = 'TB'),
          constraint TipoMM 
            check (tipo = 'HDD' or tipo = 'SDD')
          );
        `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela MemoriaMassa--->" + error);
      }
      console.log("Tabela MemoriaMassa criada com sucesso!!!\n");
    });
  }
  Monitoramento() {
    const sql = `
        create table if not exists projetoPiFarmacia.Monitoramento (
          idMonitoramento int auto_increment,
                        fkComputador int,
                        temperaturaCPU double,
                        velocidadeCPU double,
                        utilizacaoCPU tinyint,
          memoriaEmUso float,
                        velocidadeLeitura float,
                        TempoAtividadeDisco float,
                        dataHora datetime,
                        primary key(idMonitoramento,fkComputador),
                        constraint fk_Computador_Monitoramento
              foreign key(fkComputador) 
                references Computador(idComputador)
          );
                        
        `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Monitoramento --->" + error);
      }
      console.log("Tabela Monitoramento criada com sucesso!!!\n");
    });
  }

  MonitoradoresFiliais() {
    const sql = `
                create table if not exists projetoPiFarmacia.MonitoradoresFiliais (
								  fkMonitorador int,
                                  fkRedeFarmacia int,
                                  fkFilial int,
                                  login varchar(30),
                                  senha varchar(30),
                                  constraint fkMonitorador_MonitoradoresFiliais
										foreign key (fkMonitorador)
											references Monitorador(idMonitorador),
								   constraint fkRedeFarmacia_MonitoradoresFiliais
										foreign key(fkRedeFarmacia)
											references  Monitorador(fkRedeFarmacia),
									constraint fkFilial_MonitoradoresFiliais 
										foreign key (fkFilial)
											references Filial(idFilial),
									primary key (fkMonitorador,fkRedeFarmacia,fkFilial)
							
									);
                `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela MonitoradoresFiliais --->" + error);
      }
      console.log("Tabela MonitoradoresFiliais criada com sucesso!!!\n");
    });
  }
}
module.exports = new Tabelas();
