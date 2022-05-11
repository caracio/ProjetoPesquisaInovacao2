CREATE TABLE Responsavel(ID_Responsavel 	INTEGER  PRIMARY KEY IDENTITY
					    ,Nome 		  		VARCHAR(40)	 COLLATE Latin1_General_CI_AS NOT NULL
					    ,Email				VARCHAR(40)	 COLLATE Latin1_General_CI_AS NOT NULL
					    ,Senha 		  		VARCHAR(40)  COLLATE Latin1_General_CS_AS NOT NULL);

CREATE TABLE Loja (ID_Loja 		 	Integer PRIMARY KEY IDENTITY
			   	  ,Nome 			VARCHAR(70) NOT NULL
			   	  ,Rua 				VARCHAR(40) NOT NULL
			   	  ,Bairro  			VARCHAR(30) NOT NULL
			   	  ,Numero  			SMALLINT 	NOT NULL
			   	  ,Cidade 			VARCHAR(45) NOT NULL
			   	  ,Estado			CHAR(2)     NOT NULL
			   	  ,CEP  			CHAR(9) 	NOT NULL
			   	  ,CNPJ 			CHAR(14)	NOT NULL
			   	  ,FK_Responsavel	Integer	  
			   	  ,FK_Filial		Integer
					 
									,CONSTRAINT FK_Responsavel_Loja 
												FOREIGN KEY (FK_Responsavel)	
															REFERENCES Responsavel(ID_Responsavel)
															
									,CONSTRAINT FK_Filial_Loja 
												FOREIGN KEY (FK_Filial)	
															REFERENCES Loja(ID_Loja)                                          						
                  );

                  
CREATE TABLE Monitorador (ID_Monitorador 		Integer PRIMARY KEY IDENTITY
						 ,FK_Loja 		 	    Integer 
						 ,Nome 			 	    VARCHAR(40)								 NOT NULL
						 ,CPF 			 	    CHAR(11)								 NOT NULL
						 ,Email			 	    VARCHAR(40)	COLLATE Latin1_General_CI_AS NOT NULL
						 ,Senha 		 		VARCHAR(40) COLLATE Latin1_General_CS_AS NOT NULL
								
						 ,CONSTRAINT FK_Loja_Monitorador
						 			FOREIGN KEY (FK_Loja)
						 						REFERENCES Loja(ID_Loja)
                         );



CREATE TABLE  Computador(ID_Computador 	Integer PRIMARY KEY 
					    ,Senha		 	VARCHAR(45) COLLATE Latin1_General_CS_AS NOT NULL
					    ,FK_Loja 	  	INTEGER 
                       
					    ,CONSTRAINT FK_Computador_Loja 
					    		FOREIGN KEY (FK_Loja)	
					   	      			REFERENCES Loja(ID_Loja)                                          						
                  );


CREATE TABLE MemoriaMassa(ID_MemoriaMassa 		INT PRIMARY KEY IDENTITY
		   	   		     ,FK_Computador			INT 
                         ,Modelo 				TEXT
                         ,EspacoArmazenamento	BIGINT
                                       
                        ,CONSTRAINT FK_MemoriaMassa_Computador
							FOREIGN KEY (FK_Computador)
									REFERENCES Computador(ID_Computador)
						 );

CREATE TABLE Log_MemoriaMassa(ID_Log_MemoriaMassa INT PRIMARY KEY IDENTITY
							  ,FK_MemoriaMassa	  INT
                              ,Leitura			  INT
                              ,Escrita			  INT
                              ,TempoTranferencia  BIGINT 
                              ,EspacoLivre  	  BIGINT
							  ,DataLog  		  DATETIME DEFAULT CURRENT_TIMESTAMP

							  ,CONSTRAINT FK_Log_MemoriaMassa_MemoriaMassa
												FOREIGN KEY (Fk_MemoriaMassa)
														REFERENCES MemoriaMassa(ID_MemoriaMassa)
						  );


CREATE TABLE MemoriaRam(ID_MemoriaRam 	       INT PRIMARY KEY IDENTITY
					   ,FK_Computador		   INT 		
					   ,Total_Armazenamento    BIGINT
                                     
                       ,CONSTRAINT FK_MemoriaRam_Computador
							FOREIGN KEY (FK_Computador)
								REFERENCES Computador(ID_Computador)
						);


CREATE TABLE Log_MemoriaRam(ID_Log_MemoriaRam	INT PRIMARY KEY IDENTITY
					   	   ,FK_MemoriaRam		INT
					   	   ,QTD_MemoriaUso		BIGINT
                           ,MemoriaDisponivel	BIGINT
					   	   ,DataLog  			DATETIME DEFAULT CURRENT_TIMESTAMP
					    
						   ,CONSTRAINT FK_Log_MemoriaRam_MemoriaRam
					   			FOREIGN KEY (FK_MemoriaRam)
					   				REFERENCES MemoriaRam(ID_MemoriaRam)
						);


CREATE TABLE Processador(ID_Processador  	INT PRIMARY KEY IDENTITY 
				   	    ,FK_Computador      INT 
				        ,Modelo 			TEXT
				                      
				        ,CONSTRAINT FK_Processador_Computador
								FOREIGN KEY (FK_Computador)
												REFERENCES Computador(ID_Computador)
					  );


CREATE TABLE Log_Processador(ID_Log_Processador INT PRIMARY KEY IDENTITY
							,FK_Processador     INT
							,Frequencia			BIGINT
                            ,Uso			    FLOAT
                            ,DataLog  		    DATETIME DEFAULT CURRENT_TIMESTAMP
                           
						   ,CONSTRAINT FK_Log_Processador_Processado 
									FOREIGN KEY (FK_Processador)
								    			 REFERENCES Processador(ID_Processador)
							);

drop database farmagraphsolutions


