CREATE OR ALTER PROCEDURE [dbo].[SP_ReloadDatas] @Email		  Varchar(40)
												,@erro        VARCHAR(40)  OUTPUT
												,@message     Varchar(255) OUTPUT
AS 
BEGIN 
	IF EXISTS (SELECT * 
			   FROM dbo.Responsavel
			   WHERE Email = @Email)
		BEGIN 
            SET @message = 'Responsavel';  
             select
                    r.ID_Responsavel AS 'id_Responsavel'
                   ,r.Nome           AS 'nome'
                   ,r.Email          AS 'email'
                   ,@message         AS 'tipo'
                   ,'lojas' =(
             SELECT
                     l.ID_Loja AS id_Loja
                    ,l.Nome    AS nome
                    ,l.Cidade  AS cidade
                    ,l.Estado  AS estado
                    ,'computadores' = (
                        select ID_Computador
                        from Computador as c
                        where l.ID_Loja = c.FK_Loja
                        FOR JSON PATH
                        )
                from Responsavel AS r 
                INNER JOIN  Loja as l 
                    ON r.ID_Responsavel = l.FK_Responsavel
                where r.Email = @Email
                FOR JSON PATH
                ) from Responsavel as r
                WHERE Email = @Email
                FOR JSON PATH, without_array_wrapper
		END;

	ELSE IF EXISTS (SELECT  m.Email
						   ,m.Senha
						   ,l.ID_Loja
						   ,l.Nome
					FROM Monitorador AS m
					INNER JOIN Loja AS l
					ON  m.FK_Loja = l.ID_Loja
					WHERE m.Email = @Email 
                    )

		 BEGIN
            SET @message = 'Monitorador';

			SELECT                     
				 m.ID_Monitorador AS id_monitorador
				,m.Email          AS email
				,m.Senha          AS senha
				,'lojas' = (
					 SELECT TOP 1
					 	 l.ID_Loja AS id_Loja
					 	,l.Nome    AS nome
					 	,l.Cidade  AS cidade
					 	,l.Estado  AS estado
					 	,'computadores' = (
					 				select ID_Computador
					 				from Computador as c
					 				where l.ID_Loja = c.FK_Loja
					 				FOR JSON PATH
						)
					   FROM Loja AS l
					   WHERE l.ID_Loja = m.ID_Monitorador
					   FOR JSON PATH
				   )

			FROM Monitorador AS m
			WHERE m.Email = @Email
			FOR JSON PATH, without_array_wrapper

		 END;
    ELSE
        BEGIN
            SET @erro = 'ERROR2';
            SET @message = 'erro de sistema';
            SELECT @erro     AS erro
                  ,@message  AS [message]; 
        END
END ;

declare @erro         VARCHAR(40)  
declare @message      Varchar(255) 

 exec  [dbo].[SP_ReloadDatas] @Email		= 'Matias@drogariasp.com.br'
									  ,@erro        = @erro    OUTPUT
									  ,@message     = @message OUTPUT