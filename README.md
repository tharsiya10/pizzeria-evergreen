# PW6_projet

BELHOUT Chaima () et VIGNESWARAN Tharsiya (21971806)

    # Programme:
script d'initialisation: init.sql
lancer le projet avec: node main.js
possibilité de modifier dans connect.js les données
selon la base de données.


    # Fonctionnement côté client:
On tombe sur la page de menu et on peut se déplacer librement 
entre les différentes catégories de produits
(Pizzas, Entrees, Sauces, Desserts, Boissons)
On peut ajouter directement au panier le produit souhaité.
En cliquant sur l'image, le site redirige vers le détail du produit.
Pour les pizzas, on peut à la fois ajouter une pizza classique et
une pizza customisée.
Pour customiser une pizza classique, il faut cliquer sur l'image. 
On sera alors redirigé vers une page avec le détail de la pizza:
les ingrédients déjà présents et tous les autres ingrédients qu'il est possible
d'ajouter.
On peut également enlever les ingrédients de la pizza.
Le prix de la pizza augmente s'il on a déjà plus de trois ingrédients sélectionnés.
Le prix de la pizza augmente selon la taille choisie.
Le panier est mis à jour continuellement. Il est possible de retirer des produits
du panier.
Une fois avoir cliqué sur le bouton "Commander", on est redirigé vers une 
page d'informations qui doit être remplie par le client
Après avoir envoyé le formulaire, le panier du client est effacé et il est redirigé 
vers la page d'accueil.

route: /livraison
Le livreur se connecte et s'affiche ensuite les détails de la commande qu'il doit effectuer.
Si le livreur indique qu'il a livré sa commande, le site lui présentera une autre commande
d'un client.
Les commandes sont affichées sur la base de l'heure de commande la plus ancienne.
Une identité de livreur a été créée avec le script sql pour simuler sa connexion:
Nom: Toussaint Prénom: Sophie mot de passe: azerty

    # Fonctionnement côté serveur
Le serveur se connecte à la base de données et envoie les données aux fichiers ejs
pour afficher les produits et leurs détails.

    # Améliorations:
Nous n'avons pas implémenter le choix de menu, ni le choix d'une sauce pour une pizza.
Si l'on customise une pizza et qu'elle se trouve être identique à une pizza classique,
notre programme ne permet pas de retrouver la similitude entre ces deux pizzas, ni son prix.
Une page d'inscription pour les clients.
CSS qui se trouve dans la branche prod_frontend mais qui n'a pas été correctement lié aux pages 
ce qui empêche le bon fonctionnement du back-end.

	# Repartition:
BELHOUT Chaima: CSS et bootstrap
VIGNESWARAN Tharsiya: Back-end et un peu de front-end (jquery)
