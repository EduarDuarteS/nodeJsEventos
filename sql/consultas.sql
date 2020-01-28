
-- poblar bases de datos
INSERT INTO public."Users"(nombres, apellidos, email, contrasena)
	VALUES ('Eduard E', 'Duarte S', 'eduard.duarte@hotmail.com', 'contrasena');

INSERT INTO public."Users"(nombres, apellidos, email, contrasena)
	VALUES ('CARLOS', 'FORERO', 'CARLOS@hotmail.com', 'contrasena');
	

INSERT INTO public.categorias( nombre) VALUES ( 'Conferencia');
INSERT INTO public.categorias( nombre) VALUES ( 'Seminario');
INSERT INTO public.categorias( nombre) VALUES ( 'Congreso');
INSERT INTO public.categorias( nombre) VALUES ( 'Curso');


INSERT INTO public.eventos(
	 id_user, nombre, lugar, direccion, date_inicio, date_fin, tipo_evento, id_categoria)
	VALUES (3, 'CONFERENCIA NODEJS', 'COLFERIAS', 'CARRERA 33', '2020/01/30', '2020/02/15', 'presencial', 2);

INSERT INTO public.eventos(
	 id_user, nombre, lugar, direccion, date_inicio, date_fin, tipo_evento, id_categoria)
	VALUES (3, 'CONFERENCIA NODEJS', 'COLFERIAS', 'CARRERA 33', '2020/01/30', '2020/02/15', 'presencial', 2);

-- consultas

Select * from public."Users";
Select * from public."categorias";
Select * from public."eventos"; 


--DELETES

DELETE FROM public."Users"
	WHERE ID_USER =2;

--restricciones tablas

ALTER TABLE "eventos" 
   ADD CONSTRAINT fk_id_user
   FOREIGN KEY (id_user) 
   REFERENCES "Users"(id_user);
  
ALTER TABLE "eventos" 
   ADD CONSTRAINT fk_categorias
   FOREIGN KEY (id_categoria) 
   REFERENCES "categorias"(id);
   
ALTER TABLE eventos ADD COLUMN created_at TIMESTAMP;
ALTER TABLE eventos ALTER COLUMN created_at SET DEFAULT now();

CREATE TYPE evento AS ENUM ('presencial', 'virtual');
  