CREATE OR ALTER PROCEDURE [dbo].[SP_Cadastro_Monitorador] 
 @FK_Loja   INTEGER
,@Nome      VARCHAR(40)
,@CPF       CHAR(11)
,@Email     VARCHAR(40)
,@Senha     VARCHAR(40)
,@erro      VARCHAR(20) OUTPUT
,@message   VARCHAR(50) OUTPUT
AS
BEGIN
    DECLARE @usuarioTmp  AS TABLE (Email VARCHAR(40));

    INSERT INTO @usuarioTmp
            SELECT Email
        FROM Monitorador
    UNION ALL
        SELECT Email
        FROM Responsavel;

    IF EXISTS (SELECT *
    FROM @usuarioTmp
    WHERE Email = @Email)
    BEGIN
        SET @erro = 'ERROR1'
        SET @message = 'Email já cadastrado!'
    END 
    ELSE
        BEGIN
        
        INSERT INTO Monitorador (FK_Loja,Nome,CPF,Email,Senha)
        VALUES
            (@FK_Loja, @Nome, @CPF, @Email, @Senha);
         IF @@ROWCOUNT = 0  
         BEGIN 
            SET @erro       = 'ERROR2';
            SET @message    = 'O usuario não foi cadastro';
        END 
        
        ELSE
            BEGIN
                SET @erro       = 'false';
                SET @message    = 'O usuario  foi cadastrado com sucesso!';
            END
    END

END

select *
from monitorador


