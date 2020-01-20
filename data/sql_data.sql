ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_boards_id_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_statuses_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards.fk_statuses_id CASCADE;


DROP TABLE IF EXISTS public.boards;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
CREATE TABLE boards (
    id serial NOT NULL,
    title varchar(20) unique
);

DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
CREATE TABLE cards (
    id serial NOT NULL,
    board_id integer not null,
    title varchar(20),
    status_id integer not null check (status_id between 0 and 3),
    "order" integer not null
);

DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.statuses_id_seq;
CREATE TABLE statuses (
    id serial not null,
    title varchar(15)
);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_boards_id FOREIGN KEY (board_id) REFERENCES boards (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_statuses_id FOREIGN KEY (status_id) REFERENCES statuses (id);

INSERT INTO boards values (1,'Board 1');
INSERT INTO boards values (2,'Board 2');


INSERT INTO statuses values (0,'new');
INSERT INTO statuses values (1,'in progress');
INSERT INTO statuses values (2,'testing');
INSERT INTO statuses values (3,'done');

INSERT INTO cards values (1,1,'new card 1',0,0);
INSERT INTO cards values (2,1,'new card 2',0,1);
INSERT INTO cards values (3,1,'in progress card',1,0);
INSERT INTO cards values (4,1,'planning',2,0);
INSERT INTO cards values (5,1,'done card 1',3,0);
INSERT INTO cards values (6,1,'done card 1',3,1);
INSERT INTO cards values (7,2,'new card 1',0,0);
INSERT INTO cards values (8,2,'new card 2',0,1);
INSERT INTO cards values (9,2,'in progress card',1,0);
INSERT INTO cards values (10,2,'planning',2,0);
INSERT INTO cards values (11,2,'done card 1',3,0);
INSERT INTO cards values (12,2,'done card 1',3,1);





