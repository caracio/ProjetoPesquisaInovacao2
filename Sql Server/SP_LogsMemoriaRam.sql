CREATE OR ALTER PROCEDURE [dbo].[SP_LogsMemoriaRam]   @ID_Computador    INTEGER
													 ,@ID_Loja          INTEGER
													 ,@memoriaUso       BIGINT OUTPUT
AS 
BEGIN
	IF EXISTS(SELECT * 
			  FROM MemoriaRam AS mram
			  	INNER JOIN Log_Memoriaram AS log_ram
			  		ON log_ram.FK_MemoriaRam  = mram.ID_MemoriaRam
			  	INNER JOIN  Computador AS c
			  		ON c.ID_Computador = mram.FK_Computador
			  WHERE mram.FK_Computador = @ID_Computador and c.Fk_loja = @ID_Loja)
	BEGIN 
		SELECT TOP 1  
			@memoriaUso = log_mram.QTD_MemoriaUso
		FROM Computador 				AS c
			INNER JOIN MemoriaRam       AS mram
					ON c.ID_Computador = mram.Fk_Computador
			INNER JOIN Log_MemoriaRam	AS log_mram
					ON mram.ID_MemoriaRam = log_mram.FK_MemoriaRam
		WHERE c.ID_Computador = @ID_Computador
				AND FK_Loja = @ID_Loja 
		ORDER BY log_mram.ID_Log_MemoriaRam  DESC;
	END
    ELSE 
        BEGIN
            SET @memoriaUso = 0
        END
END

DECLARE @memoriaUso BIGINT

EXEC  [dbo].[SP_LogsMemoriaRam] @ID_Computador  = 1
							  ,@ID_Loja			= 3
							  ,@memoriaUso		= @memoriaUso OUTPUT

SELECT @memoriaUso
