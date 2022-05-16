CREATE OR ALTER PROCEDURE dbo.SP_Cadastro_Loja @FK_Responsavel INTEGER
                                          ,@Nome    VARCHAR(70)
                                          ,@CNPJ    CHAR(14)
                                          ,@CEP     CHAR(9)
                                          ,@Estado  CHAR(2)
                                          ,@Cidade  VARCHAR(45)
                                          ,@Bairro  VARCHAR(30)
                                          ,@Rua     VARCHAR(40)
                                          ,@Numero  INTEGER
                                          ,@erro    VARCHAR(40) OUTPUT
                                          ,@message VARCHAR(40) OUTPUT

AS 
BEGIN 
    IF EXISTS(SELECT * FROM Loja WHERE CNPJ = @CNPJ)
    BEGIN
        SET @erro = 'ERROR1' 
        SET @message ='CNPJ já cadastrado';
    END
    ELSE 
        BEGIN

        INSERT INTO Loja(FK_Responsavel,Nome,CNPJ,CEP,Estado,Cidade,Bairro,Rua,Numero) VALUES
        (@FK_Responsavel,@Nome,@CNPJ,@CEP,@Estado,@Cidade,@Bairro,@Rua,@Numero);

        IF @@ROWCOUNT = 0
        BEGIN 
            SET @erro = 'ERROR2'
            SET @message ='Erro ao cadastrar a loja';
        END
        ELSE
        BEGIN 
            SET @erro = 'false'
            SET @message = ' cadastro efetuado com sucesso loja';
        END
    END 
END

select * from loja; 
SELECT * from Responsavel;