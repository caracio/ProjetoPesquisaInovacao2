class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.Responsavel();
    this.Loja();
    this.Monitorador();
    this.Computador();
    this.MemoriaRam();
    this.Log_MemoriaRam();
    this.MemoriaMassa();
    this.Log_MemoriaMassa();
    this.Processador();
    this.Log_Processador();
  }
  //projetoPiFarmacia --> Criação das Tabelas no Banco de Dados
  Responsavel() {
    const sql = `
    CREATE TABLE IF NOT EXISTS  Responsavel(ID_Responsavel 	Integer PRIMARY KEY AUTO_INCREMENT
                                           ,Nome     		  	VARCHAR(40)  NOT NULL
                                           ,Email	      		VARCHAR(40)  NOT NULL
                                           ,Senha    		  	VARCHAR(40)  NOT NULL
         )AUTO_INCREMENT = 1;
`;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Responsavel -->" + error);
      }
      console.log("\nTabela Responsavel criada com sucesso!!!\n");
    });
  }
  Monitorador() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Monitorador (ID_Monitorador 		Integer PRIMARY KEY AUTO_INCREMENT
                                           ,FK_Loja 		     	Integer 
                                           ,Nome 			 	      VARCHAR(40) NOT NULL
                                           ,CPF 		    	 	  CHAR(11)	NOT NULL
                                           ,Email			 	      VARCHAR(40) NOT NULL
                                           ,Senha 		 		    VARCHAR(40) NOT NULL
                                    
                                          ,CONSTRAINT FK_Loja_Monitorador
                                                FOREIGN KEY (FK_Loja)
                                                      REFERENCES Loja(ID_Loja)

                                              )AUTO_INCREMENT = 1; `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Monitorador --->" + error);
      }
      console.log("Tabela Monitorador criada com sucesso!!!\n");
    });
  }

  Loja() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Loja (ID_Loja 		 	      Integer PRIMARY KEY AUTO_INCREMENT
                                    ,Nome 				      VARCHAR(70) NOT NULL
                                    ,Rua 			  	      VARCHAR(40) NOT NULL
                                    ,Bairro  			      VARCHAR(30) NOT NULL
                                    ,Numero  			      SMALLINT 	NOT NULL
                                    ,Cidade 			      VARCHAR(45) NOT NULL
                                    ,Estado				      CHAR(2)     NOT NULL
                                    ,CEP  				      CHAR(9) 	NOT NULL
                                    ,CNPJ 			      	CHAR(14)	NOT NULL
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
    CREATE TABLE IF NOT EXISTS Computador(ID_Computador 	Integer PRIMARY KEY
                                         ,Senha		 	    	VARCHAR(45)  NOT NULL
                                         ,FK_Loja 	  	  INTEGER 
                                            
                                        ,CONSTRAINT FK_Computador_Loja 
                                          FOREIGN KEY (FK_Loja)	
                                              REFERENCES Loja(ID_Loja)                                          						
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
    CREATE TABLE IF NOT EXISTS MemoriaMassa(ID_MemoriaMassa 		  INT PRIMARY KEY AUTO_INCREMENT
                                           ,FK_Computador		   	  INT
                                           ,Modelo      					TEXT
                                           ,EspacoArmazenamento		BIGINT
                        
                        ,CONSTRAINT FK_MemoriaMassa_Computador
                                FOREIGN KEY (FK_Computador)
                                      REFERENCES Computador(ID_Computador)
                  )AUTO_INCREMENT = 1;
        `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela MemoriaMassa--->" + error);
      }
      console.log("Tabela MemoriaMassa criada com sucesso!!!\n");
    });
  }

  Log_MemoriaMassa() {
    const sql = `
   CREATE TABLE IF NOT EXISTS Log_MemoriaMassa(ID_Log_MemoriaMassa     INT PRIMARY KEY AUTO_INCREMENT
										                          ,Fk_MemoriaMemoria       INT
                                              ,Leitura				         BIGINT
                                              ,Escrita         			   BIGINT
                                              ,TempoTranferencia       BIGINT 
                                              ,EspacoLivre         	   BIGINT
										   
										                          ,CONSTRAINT FK_Log_MemoriaMassa_MemoriaMassa
											                               	FOREIGN KEY (Fk_MemoriaMemoria)
														                                  REFERENCES MemoriaMassa(ID_MemoriaMassa)
						                 )AUTO_INCREMENT = 1;
        `;
    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Log_MemoriaMassa --->" + error);
      }
      console.log("Tabela Log_MemoriaMassa criada com sucesso!!!\n");
    });
  }

  MemoriaRam() {
    const sql = `
    CREATE TABLE IF NOT EXISTS MemoriaRam(ID_MemoriaRam 	         INT PRIMARY KEY AUTO_INCREMENT
                                         ,FK_Computador		   	     INT 		
                                         ,Total_Armazenamento      BIGINT
                        
                                        ,CONSTRAINT FK_MemoriaRam_Computador
                                              FOREIGN KEY (FK_Computador)
                                                    REFERENCES Computador(ID_Computador)
                              )AUTO_INCREMENT = 1;
                `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela MemoriaRam --->" + error);
      }
      console.log("Tabela MemoriaRam criada com sucesso!!!\n");
    });
  }

  Log_MemoriaRam() {
    const sql = `  
      CREATE TABLE IF NOT EXISTS Log_MemoriaRam(ID_Log_MemoriaRam   INT PRIMARY KEY AUTO_INCREMENT
                                               ,FK_MemoriaRam       INT
                                               ,QTD_MemoriaUso	    BIGINT 
                                               ,MemoriaDisponivel   BIGINT
       
                                               ,CONSTRAINT FK_Log_MemoriaRam_MemoriaRam
                                                          FOREIGN KEY (FK_MemoriaRam)
                                                                  REFERENCES MemoriaRam(ID_MemoriaRam)
                                                                              )AUTO_INCREMENT = 1;     
      
      `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Log_MemoriaRam --->" + error);
      }
      console.log("Tabela Log_MemoriaRam criada com sucesso!!!\n");
    });
  }

  Processador() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Processador(ID_Processador  	INT PRIMARY KEY AUTO_INCREMENT
                                          ,FK_Computador    INT 
                                          ,Modelo 		    	TEXT
                        
                        ,CONSTRAINT FK_Processador_Computador
                              FOREIGN KEY (FK_Computador)
                                   REFERENCES Computador(ID_Computador)
             )AUTO_INCREMENT = 1;    
    `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Processador --->" + error);
      }
      console.log("Tabela Processador criada com sucesso!!!\n");
    });
  }

  Log_Processador() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Log_Processador(ID_Log_Processador INT PRIMARY KEY AUTO_INCREMENT
                                              ,FK_Processador     INT
                                              ,Frequencia		      BIGINT
                                              ,Uso				        DOUBLE(4,2)

                                              ,CONSTRAINT FK_Log_Processador_Processado 
                                                      FOREIGN KEY (FK_Processador)
                                                            REFERENCES Processador(ID_Processador)
                          )AUTO_INCREMENT = 1;  
    `;

    this.conexao.query(sql, (error) => {
      if (error) {
        throw new Error("Erro ao Criar Tabela Log_Processador --->" + error);
      }
      console.log("Tabela Log_Processador criada com sucesso!!!\n");
    });
  }
}

module.exports = new Tabelas();
