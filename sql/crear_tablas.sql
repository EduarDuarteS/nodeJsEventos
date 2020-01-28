-- Table: public."Users"

-- DROP TABLE public."Users";

CREATE TABLE public."Users"
(
    id_user integer NOT NULL DEFAULT nextval('"Users_id_user_seq"'::regclass),
    nombres character varying(150) COLLATE pg_catalog."default",
    apellidos character varying(150) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    contrasena character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT "Users_pkey" PRIMARY KEY (id_user)
)

TABLESPACE pg_default;

ALTER TABLE public."Users"
    OWNER to eduard;


----------------------------------------------------------------------------------
-- Table: public.categorias

-- DROP TABLE public.categorias;

CREATE TABLE public.categorias
(
    id integer NOT NULL DEFAULT nextval('categoria_id_seq'::regclass),
    nombre character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categoria_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.categorias
    OWNER to eduard;
	
-----------------------------------------------------------------------------------------------

-- Table: public.eventos

-- DROP TABLE public.eventos;

CREATE TABLE public.eventos
(
    id integer NOT NULL DEFAULT nextval('eventos_id_seq'::regclass),
    id_user integer NOT NULL DEFAULT nextval('eventos_id_uiser_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default",
    lugar character varying(50) COLLATE pg_catalog."default",
    direccion character varying(50) COLLATE pg_catalog."default",
    date_inicio date,
    date_fin date,
    tipo_evento character varying(50) COLLATE pg_catalog."default",
    id_categoria integer,
    evento evento,
    CONSTRAINT eventos_pkey PRIMARY KEY (id),
    CONSTRAINT fk_categorias FOREIGN KEY (id_categoria)
        REFERENCES public.categorias (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_id_user FOREIGN KEY (id_user)
        REFERENCES public."Users" (id_user) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.eventos
    OWNER to eduard;