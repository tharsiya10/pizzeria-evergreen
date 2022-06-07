const { getClient } = require('./connect');

module.exports.getDessert = async function (req, res) {
    const db = await getClient();
    let details = await db.query('select * from dessert where id=$1', [req.params.id]);
    return details;
};

module.exports.getBoisson = async function(req, res){
    const db = await getClient();
    let details = await db.query('select * from boisson where id=$1', [req.params.id]);
    db.end();
    return details;
};

module.exports.getSauce = async function(req, res){
    const db = await getClient();
    let details = await db.query('select * from sauce_entree where id=$1', [req.params.id]);
    db.end();
    return details;
};

module.exports.getEntree = async function(req, res){
    const db = await getClient();
    let details = await db.query('select * from entree where id=$1', [req.params.id]);
    let sauces; let has_sauce;
    if(details.rows[0].sauce === true){
        sauces = await db.query('select * from sauce_entree');
        has_sauce = true;
    }
    else {
        sauces = [];
        has_sauce = false;
    }
    db.end();
    return [details, sauces, has_sauce];
};

module.exports.getPizza = async function(req, res){
    const db = await getClient();
    let details = await db.query('select * from pizza_classique where id=$1', [req.params.id]);
    let pizzas = await db.query('select distinct id,nom from pizza_classique where id=$1', [req.params.id]);
    let tailles = await db.query('select taille, prix from pizza_classique where id=$1', [req.params.id]);
    let ingredients_pizzas = await db.query('select * from ingredient_pizza_classique where cle_pizza=$1',[req.params.id]);
    let all_ingredients = await db.query('select * from ingredient'); 
    db.end();
    return [details, pizzas, tailles, ingredients_pizzas, all_ingredients];
};

module.exports.renderProd = function(req, res, details, type){
    res.render('prod_details.ejs', {
        id: req.params.id,
        details: details.rows,
        type: type,
        prod: JSON.stringify(details.rows)
    });
}

module.exports.renderEntree = function(req, res, tab){
    res.render('entree_details.ejs', {
        id: req.params.id,
        details: tab[0].rows,
        sauces: tab[1].rows,
        has_sauce: tab[2],
        type: req.params.typeOfProd,
        prod: JSON.stringify(tab[0].rows)      
    });
}

module.exports.renderPizza = function(req, res, tab){
    res.render('pizza_details.ejs', {
        id: req.params.id, 
        details: tab[0].rows,
        pizzas: tab[1].rows,
        tailles: tab[2].rows,
        nom: tab[0].rows[0].nom,
        ingredients_pizzas: tab[3].rows,
        all_ingredients: tab[4].rows,
        store_ingr_pizzas: JSON.stringify(tab[3].rows),
        store_all_ingr: JSON.stringify(tab[4].rows),
        type: req.params.typeOfProd,
        prod: JSON.stringify(tab[1].rows),
        count: 0
    });
}