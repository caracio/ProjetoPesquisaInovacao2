CREATE OR ALTER PROCEDURE [dbo].[SP_Logs_Processador] @ID_Computador INTEGER
										   			 ,@FK_Loja		 INTEGER
													 ,@Frequencia    BIGINT  OUTPUT
													 ,@Uso		 	 FLOAT   OUTPUT
AS 
BEGIN 
	IF EXISTS(
		      SELECT
			  		 TOP 1 *
			  FROM Processador AS p
			  INNER JOIN Log_Processador AS log_p
			  		ON log_p.FK_Processador  = p.ID_Processador
			  INNER JOIN  Computador AS c 
			  		ON p.FK_Computador = c.ID_Computador
			  WHERE  p.FK_Computador = @ID_Computador AND c.FK_Loja = @FK_Loja)
	BEGIN 
			SELECT TOP 1			
						 @Frequencia = log_p.Frequencia
						,@Uso =log_p.Uso
			FROM Computador 			        AS c
					INNER JOIN Processador      AS p
							ON c.ID_Computador = p.Fk_Computador
					INNER JOIN Log_Processador  AS log_p
							ON p.ID_Processador = log_p.FK_Processador
			WHERE c.ID_Computador  = @ID_Computador
			      AND c.FK_Loja    = @FK_Loja
			ORDER BY log_p.ID_Log_Processador DESC 
	END
	ELSE
		BEGIN
			SET @Frequencia  = 0
			SET @Uso		 = 0
		END
END 

DECLARE @Frequencia BIGINT
DECLARE @Uso  		FLOAT 

EXEC [dbo].[SP_Logs_Processador] @ID_Computador = 1
								,@FK_Loja	    = 3
							  	,@Frequencia    = @Frequencia OUTPUT
								,@Uso		    = @Uso        OUTPUT

select @Frequencia, @Uso