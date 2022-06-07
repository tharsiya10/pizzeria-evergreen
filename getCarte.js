let carte = [];
carte[0] = {typeOfProd: "menu", nom: "Menus"}; 
carte[1] = {typeOfProd: "pizza", nom: "Pizzas"};
carte[2] = {typeOfProd: "entree", nom: "Entrees"};
carte[3] = {typeOfProd: "sauce", nom: "Sauces"};
carte[4] = {typeOfProd: "dessert", nom: "Desserts"};
carte[5] = {typeOfProd: "boisson", nom: "Boissons"};

module.exports.renderAllMenus = function (req, res, prod) {
    res.render('prod.ejs', {
        carte: carte,
        prod: prod.rows,            
        type: "menu",
        content: JSON.stringify(prod.rows)
    });
};

module.exports.renderAllProd = function (req, res, prod) {
    res.render('prod.ejs', {
        carte: carte,
        prod: prod.rows,            
        type: req.params.typeOfProd,
        content: JSON.stringify(prod.rows)
    });
};

module.exports.renderAllEntrees = function(req, res, prod, sauces, has_sauce){
    res.render('entree.ejs', {
        carte: carte,
        prod: prod.rows,
        sauces: sauces.rows,
        has_sauce: has_sauce.rows,
        type: req.params.typeOfProd,
        entrees: JSON.stringify(prod.rows)
    });
}

module.exports.renderAllPizzas = function(req, res, prod, pizzas){
    res.render('pizza.ejs', {
        carte: carte,
        prod: prod.rows,
        pizzas: pizzas.rows,
        type: req.params.typeOfProd,
        content: JSON.stringify(prod.rows)
    });
};