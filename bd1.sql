/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     2/11/2022 8:11:06 p. m.                      */
/*==============================================================*/


/*==============================================================*/
/* Table: EMPLEADO                                              */
/*==============================================================*/
create table EMPLEADO 
(
   NOMBRES              VARCHAR2(40)         not null,
   APELLIDOS            VARCHAR2(40)         not null,
   CORREO               VARCHAR2(50)         not null,
   CONTRASENA           VARCHAR2(20)         not null,
   constraint PK_EMPLEADO primary key (CORREO)
);

