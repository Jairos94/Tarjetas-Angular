CREATE DATABASE TarjetaCredito
GO

USE TarjetaCredito
GO

CREATE TABLE TarjetaCredito
(
id int identity(1,1) primary key not null,
titular varchar(250) not null,
numeroTarjeta varchar(16) not null,
fechaExpiracion varchar(5) not null,
cvv varchar(250)not null

)