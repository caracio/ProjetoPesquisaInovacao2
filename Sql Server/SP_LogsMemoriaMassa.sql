CREATE OR ALTER PROCEDURE [dbo].[SP_LogsMemoriaMassa]  @ID_Computador    INTEGER
													  ,@FK_Loja 		 INTEGER
													  ,@espacoArmazenado BIGINT  OUTPUT
													  ,@espacoLivre 	 BIGINT	 OUTPUT
AS 
BEGIN 
	IF EXISTS(SELECT top 1 *
					FROM MemoriaMassa AS mMassa
					INNER JOIN Log_MemoriaMassa AS log_mm
							ON log_mm.FK_MemoriaMassa  = mMassa.ID_MemoriaMassa
					INNER JOIN  Computador AS c 
							ON mMassa.FK_Computador = c.ID_Computador
					WHERE mMassa.FK_Computador = @ID_Computador AND c.FK_Loja = @FK_Loja)
	BEGIN 
		SELECT TOP 1
			   	 @espacoArmazenado = mMassa.EspacoArmazenamento
			 	,@espacoLivre      = log_mm.EspacoLivre
		FROM Computador 			     AS c
			 INNER JOIN MemoriaMassa     AS mMassa
			 		ON c.ID_Computador = mMassa.Fk_Computador
			 INNER JOIN Log_MemoriaMassa AS log_mm
			 		ON mMassa.ID_MemoriaMassa = log_mm.FK_MemoriaMassa
	    WHERE c.ID_Computador = @ID_Computador AND c.FK_Loja = @FK_Loja
	    ORDER BY log_mm.ID_Log_MemoriaMassa DESC;
	END
	ELSE 
		BEGIN
			SET @espacoArmazenado = 0
			SET @espacoLivre = 0;

			SELECT @espacoArmazenado, @espacoLivre;
		END 
END

DECLARE @espacoArmazenado BIGINT
DECLARE @espacoLivre 	  BIGINT  

exec [dbo].[SP_LogsMemoriaMassa]  @ID_Computador     = 1
			   				     ,@FK_Loja 		     = 3
			   				     ,@espacoArmazenado  = @espacoArmazenado  OUTPUT 
			   				     ,@espacoLivre 	     = @espacoLivre 	  OUTPUT

SELECT @espacoArmazenado
	  ,@espacoLivre 
