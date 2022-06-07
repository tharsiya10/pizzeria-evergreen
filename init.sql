drop table if exists pizza_classique cascade;
drop table if exists taille_pizza cascade;
drop table if exists entree cascade;
drop table if exists sauce_pizza cascade;
drop table if exists sauce_entree cascade;
drop table if exists boisson cascade;
drop table if exists dessert cascade;
drop table if exists menu cascade;
drop table if exists ingredient cascade;
drop table if exists ingredient_pizza_classique cascade;
drop table if exists sauce_pizza_classique cascade;
drop table if exists client cascade;
drop table if exists inscrit cascade;
drop table if exists livreur cascade;
drop table if exists commande cascade;
drop table if exists client_boisson cascade;
drop table if exists client_entree cascade;
drop table if exists client_dessert cascade;
drop table if exists client_sauce_entree cascade;
drop table if exists client_sauce cascade;
drop table if exists client_pizza cascade;
drop table if exists client_ingredients cascade;
drop table if exists client_menu cascade;
drop table if exists livraison cascade;


create table client(
    idClient serial primary key,
    nom varchar(25) NOT NULL,
    prenom varchar(25) NOT NULL,
    adresse text NOT NULL,
    codeImmeuble text,
    tel text NOT NULL,
    mail text NOT NULL,
    horaire time not null
);


create table livreur(
    idLivr serial primary key,
    nom varchar(25) NOT NULL,
    prenom varchar(25) NOT NULL,
    mdp varchar(25) NOT NULL
);

--Tables des produits proposés par la pizzeria (les classiques),  on mettra une pizza de nom custom dans le pizzas classiques

create table sauce_entree(
    id varchar(25) primary key,
    nom varchar(25) NOT NULL,
    prix float NOT NULL
);

create table sauce_pizza(
    id serial primary key,
    nom varchar(25) NOT NULL,
    prix float NOT NULL
);

create table pizza_classique(
    code serial primary key,
    id varchar(25) not null,
    nom varchar(25) NOT NULL,
    taille varchar(25) NOT NULL,
    prix float NOT NULL,
    idSauce integer references sauce_pizza(id)
);


create table entree(
    id varchar(25) primary key,
    nom varchar(25) NOT NULL,
    prix float NOT NULL,
    sauce boolean NOT NULL,
    description text NOT NULL
);

create table boisson(
    id varchar(25) primary key,
    nom varchar(25) NOT NULL,
    qte decimal not null,
    prix float NOT NULL,
    description text NOT NULL
);

create table dessert(
    id varchar(25) primary key,
    nom varchar(25) NOT NULL,
    prix float NOT NULL,
    description text NOT NULL
);

create table menu(
    id serial primary key,
    nom varchar(25) NOT NULL,
    prix float NOT NULL,
    nb_pizza integer NOT NULL,
    taille_pizza varchar(25) NOT NULL,
    nb_entree integer not null,
    nb_boisson integer NOT NULL,
    min_litre integer NOT NULL,
    max_litre integer NOT NULL -- ajouter dessert
);

create table ingredient(
    cle_ingr varchar(25) primary key,
    nom_ingr varchar(25) not null,
    prix float not null
);

create table ingredient_pizza_classique(
    --idPizza integer references pizza_classique(code),
    cle_pizza varchar(25) not null,
    cle_ingr varchar(25) references ingredient(cle_ingr),
    primary key(cle_pizza, cle_ingr)
);

-- create table sauce_pizza_classique(
--     idPizza integer references pizza_classique(idPizza),
--     idSauce integer references sauce(idSauce),
--     primary key(idPizza, idSauce)  
-- );

--Tables pour les produits choisis par le client
create table commande(
    idCmd serial primary key,
    idClient integer not null,
    montant integer not null,
    foreign key(idClient)  references client(idClient) on delete cascade
);

create table client_boisson(
    id_client_boisson serial primary key,
    idCmd integer, -- references commande(idCmd),
    idBoisson varchar(25) references boisson(id),
    inMenu boolean,
    id_client_menu integer,
    foreign key(idCmd) references commande(idCmd) on delete cascade
);

create table client_dessert(
    id_client_dessert serial primary key,
    idCmd integer, -- references commande(idCmd),
    idDessert varchar(25) references dessert(id),
    foreign key(idCmd) references commande(idCmd) on delete cascade
);

--Choix de l'entrée
create table client_entree(
    id_client_entree serial primary key,
    idCmd integer, --references commande(idCmd),
    idEntree varchar(25) references entree(id),
    inMenu boolean,
    id_client_menu integer,
    idSauce varchar(25),
    foreign key(idCmd) references commande(idCmd) on delete cascade
);

--Choix de la sauce pour l'entree
create table client_sauce_entree(
    id serial primary key,
    id_client_entree integer, -- references client_entree(id_client_entree),
    idSauce varchar(25) references sauce_entree(id),
    foreign key(id_client_entree) references client_entree(id_client_entree) on delete cascade
);

--Choix de sauce en plus
create table client_sauce(
    id_client_sauce serial primary key,
    idCmd integer, -- references commande(idCmd),
    idSauce varchar(25) references sauce_entree(id),
    foreign key(idCmd) references commande(idCmd) on delete cascade
);

--Choix de la pizza
create table client_pizza(
    id_client_pizza serial primary key,
    idCmd integer, -- references commande(idCmd),
    idPizza integer references pizza_classique(code), --pour savoir si c'est une pizza complètement customisé ou une pizza classique avec des ajouts ou suppr d'ingrédients
    prix float,
    inMenu boolean,
    id_client_menu integer,
    foreign key(idCmd) references commande(idCmd) on delete cascade
);

create table client_ingredients(
    id serial primary key,
    id_client_pizza integer, -- references client_pizza(id_client_pizza),
    cle_ingr varchar(25) references ingredient(cle_ingr),
    foreign key(id_client_pizza) references client_pizza(id_client_pizza) on delete cascade
);

--Choix du menu
create table client_menu(
    id_client_menu serial primary key,
    idCmd integer, -- references commande(idCmd),
    idMenu integer references menu(id),
    foreign key(idCmd) references commande(idCmd) on delete cascade
);

create table livraison(
    id serial primary key,
    idLivr integer references livreur(idLivr),
    idCmd integer, -- references commande(idCmd)
    foreign key(idCmd) references commande(idCmd) on delete cascade
);

insert into sauce_pizza values
(1, 'Sauce tomate', 1),
(2, 'Sauce pesto', 2)
;

insert into sauce_entree values
('ketchup', 'Sauce ketchup', 1),
('curry', 'Sauce curry', 1)
;

insert into pizza_classique values
(1, 'custom', 'Custom', 'Medium', 18, 1),
(2, 'custom', 'Custom', 'Large', 18, 1),
(3, 'custom', 'Custom', 'XLarge', 18, 1),
(4, 'veggies', 'Veggies', 'Medium',18,2), 
(5,'veggies', 'Veggies', 'Large',25,2),
(6, 'veggies', 'Veggies', 'XLarge',28,2),
(7,'chevre-mielleux', 'Chèvre mielleux', 'Medium', 15,1),
(8, 'chevre-mielleux', 'Chèvre mielleux', 'Large', 17, 1),
(9,'chevre-mielleux', 'Chèvre mielleux', 'XLarge', 25,1),
(10, 'tomate-mozzarella-pesto', 'Tomate-mozzarella', 'Medium', 12, 2),
(11, 'tomate-mozzarella-pesto', 'Tomate-mozzarella', 'Large', 14, 2),
(12, 'tomate-mozzarella-pesto', 'Tomate-mozzarella', 'XLarge', 12, 2),
(13, 'oignons-doux-miel', 'Oignons doux et au miel', 'Medium', 13, 1),
(14, 'oignons-doux-miel', 'Oignons doux et au miel', 'Medium', 15, 1),
(15, 'oignons-doux-miel', 'Oignons doux et au miel', 'Medium', 17, 1)
;

insert into ingredient values
('courgette', 'Courgettes' ,1),
('poivron', 'Poivrons',1),
('tomate-cerise','Tomates cerises',1),
('mozzarella', 'Mozzarella',1),
('basilic', 'Basilic',1),
('fromage-chevre', 'Fromage de chèvre',1),
('miel', 'Miel',1),
('tomme-vache', 'Tomme de vache',1),
('roquette', 'Roquette',1),
('oignon', 'Oignons',1),
('parmesan', 'Parmesan',1),
('pignons-pin', 'Pignons de pin',1),
('aubergine','Aubergine',1),
('cepes', 'Cèpes',1),
('ricotta', 'Ricotta',1),
('persil', 'Persil',1),
('tomate', 'Tomates',1),
('olive-noire', 'Olives noires',1),
('tomates', 'Tomates', 1)
;

insert into ingredient_pizza_classique values
('veggies', 'courgette'),
('veggies', 'poivron'),
('veggies','tomate-cerise'),
('veggies', 'basilic'),
('veggies','mozzarella'),
('chevre-mielleux', 'fromage-chevre'),
('chevre-mielleux', 'miel'),
('tomate-mozzarella-pesto', 'tomates'),
('tomate-mozzarella-pesto', 'pignons-pin'),
('tomate-mozzarella-pesto', 'parmesan'),
('tomate-mozzarella-pesto', 'mozzarella'),
('oignons-doux-miel', 'oignon'),
('oignons-doux-miel', 'parmesan'),
('oignons-doux-miel', 'miel')
;

insert into boisson values
('coca-cola', 'Coca-Cola', 0.33, 2, 'Coca-Cola goût classique'),
('orangina', 'Orangina', 1.5, 3, 'Orangina agrumes')
;

insert into entree values
('frites', 'Frites', 3, true, 'frites'),
('salade-caesar', 'Salade Caesar', 5, false, 'salade verte, tomates fraîches'),
('salade-mediterraneenne', 'Salade Méditerranéenne', 5, false, 'salade verte, tomates fraîches, champignons frais, olives noires')
;

insert into dessert values
('tiramisu', 'Tiramisu', 5, 'tiramisu'),
('fondant-chocolat', 'Fondant au chocolat', 3, 'Coeur fondant au chocolat')
;

insert into livreur values
(1, 'Toussaint', 'Sophie', 'azerty');
