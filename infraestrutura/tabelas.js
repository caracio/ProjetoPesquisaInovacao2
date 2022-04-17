class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.Responsavel();
    this.Loja();
    this.Monitorador();
    this.Computador(); 
    this.Componentes();
    this.LOGS_Monitoramento();
  }
  //projetoPiFarmacia --> Criação das Tabelas no Banco de Dados
  Responsavel() {
    const sql = `
    CREATE TABLE if not exists  Responsavel(ID_Responsavel 	Integer PRIMARY KEY AUTO_INCREMENT
                                           ,NM_Rede		  	  VARCHAR(40)  NOT NULL
                                           ,Email		  	  	VARCHAR(40)  NOT NULL
                                           ,Senha 		    	VARCHAR(40)  NOT NULL
                 )AUTO_INCREMENT = 1;
`;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Responsavel -->" + error);
      }
      console.log("Tabela Responsavel criada com sucesso!!!\n");
    });
  }
  Monitorador() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Monitorador (ID_Monitorador 	Integer PRIMARY KEY AUTO_INCREMENT
                                           ,FK_Loja 		  	Integer 
                                           ,Nome 			 	    VARCHAR(40) NOT NULL
                                           ,CPF 			 	    CHAR(11)	  NOT NULL
                                           ,Email			 	    VARCHAR(40) NOT NULL
                                           ,Senha 		 	    VARCHAR(40) NOT NULL
                            
											,CONSTRAINT FK_Loja_Monitorador
													      	FOREIGN KEY (FK_Loja)
																        	REFERENCES Loja(ID_Loja)
                         )AUTO_INCREMENT = 1;
                         
  `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Monitorador --->" + error);
      }
      console.log("Tabela Monitorador criada com sucesso!!!\n");
    });
  }
  Loja() {
    const sql = `
    CREATE TABLE if not exists Loja (ID_Loja 		 	      Integer PRIMARY KEY AUTO_INCREMENT
                                    ,Nome 				      VARCHAR(70) NOT NULL
                                    ,Rua 				        VARCHAR(40) NOT NULL
                                    ,Bairro  			      VARCHAR(30) NOT NULL
                                    ,Numero  			      SMALLINT 	  NOT NULL
                                    ,Cidade 			      VARCHAR(45) NOT NULL
                                    ,Estado				      CHAR(2)     NOT NULL
                                    ,CEP  				      CHAR(9)     NOT NULL
                                    ,CNPJ 				      CHAR(14)	  NOT NULL
                                    ,FK_Responsavel   	Integer 
                                    ,FK_Filial        	Integer
      
        ,CONSTRAINT FK_Responsavel_Loja 
              FOREIGN KEY (FK_Responsavel)	
                    REFERENCES Responsavel(ID_Responsavel)
                    
        ,CONSTRAINT FK_Filial_Loja 
              FOREIGN KEY (FK_Filial)	
                    REFERENCES Loja(ID_Loja)                                          						
        );
  

  `;
  
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Loja --->" + error);
      }
      console.log("Tabela Loja criada com sucesso!!!\n");
    });
  }
  Computador() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Computador(ID_Computador 	Integer PRIMARY KEY AUTO_INCREMENT
                                         ,Nome 	    	  	VARCHAR(45)  NOT NULL
                                         ,MD_Computador 	VARCHAR(45)  NOT NULL
                                         ,FK_Filial 	  	Integer
                
                ,CONSTRAINT FK_Computador_Loja 
                            FOREIGN KEY (FK_Filial)	
                                        REFERENCES Loja(FK_Filial)                                          						
           )AUTO_INCREMENT = 100;
     `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Computador -->" + error);
      }
      console.log("Tabela Computador criada com sucesso!!!\n");
    });
  }
  Componentes() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Componentes (ID_Componentes 	Integer PRIMARY KEY AUTO_INCREMENT
                                           ,Processador    	VARCHAR(45) 
                                           ,GPU 		      	VARCHAR(45) 
                                           ,MemoriaRam 	    VARCHAR(45) 
                                           ,DiscoRigido	    VARCHAR(45) 
                                           ,SSD		        	VARCHAR(45) 
                                           ,FK_Computador   Integer
                                                
                                           ,CONSTRAINT FK_Computador_Componentes
                                                       FOREIGN KEY (Fk_Computador)
                                                                    REFERENCES Computador(ID_Computador)
                                            )AUTO_INCREMENT = 1;  
        `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Componentes--->" + error);
      }
      console.log("Tabela Componentes criada com sucesso!!!\n");
    });
  }
  Monitorador() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Monitorador (ID_Monitorador 		Integer PRIMARY KEY AUTO_INCREMENT
                                           ,FK_Loja 	    	 	Integer 
                                           ,Nome 			      	VARCHAR(40) NOT NULL
                                           ,CPF   			     	CHAR(11)	NOT NULL
                                           ,Email			    	  VARCHAR(40) NOT NULL
                                           ,Senha 		    		VARCHAR(40) NOT NULL
 
                                          ,CONSTRAINT FK_Loja_Monitorador
                                                FOREIGN KEY (FK_Loja)
                                                      REFERENCES Loja(ID_Loja)
                                              )AUTO_INCREMENT = 1;

                        
        `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Monitorador --->" + error);
      }
      console.log("Tabela Monitorador criada com sucesso!!!\n");
    });
  }

  LOGS_Monitoramento() {
    const sql = `
    CREATE TABLE IF NOT EXISTS LOGS_Monitoramento(ID_LogsMonitoramento  	INTEGER PRIMARY KEY AUTO_INCREMENT
                                                 ,FrequenciaProcessador 	VARCHAR(45) 
                                                 ,UsoMemoriaRAM			  	  VARCHAR(45) 
                                                 ,QTD_LeituraDisco 			  VARCHAR(45) 
                                                 ,QTD_LeituraSSD			    VARCHAR(45) 
                                                 ,FK_Componentes  	    	Integer
              
                                                ,CONSTRAINT FK_Componentes_LOG
                                                      FOREIGN KEY (FK_Componentes)
                                                          REFERENCES Componentes (ID_Componentes)
              );
                `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error(
          "Erro ao Criar Tabela LOGS_Monitoramento --->" + error
        );
      }
      console.log("Tabela LOGS_Monitoramento criada com sucesso!!!\n");
    });
  }
}
module.exports = new Tabelas();
