const { getClient } = require('./connect');
const { renderAllPizzas, renderAllEntrees, renderAllProd } = require('./getCarte');
const { renderPizza, renderEntree, renderProd, getPizza, getEntree, getDessert, getBoisson, getSauce } = require('./getProd');

module.exports.selectCarte = async function(req, res){
    const db = await getClient();
    let prod; let sauces; let has_sauce; let pizzas ;
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "menu"){
        prod = await db.query('select * from menu'); 
        renderAllProd(req, res, prod);
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "pizza"){
        prod = await db.query('select distinct id, nom from pizza_classique');
        pizzas = await db.query('select * from pizza_classique');
        renderAllPizzas(req, res, prod, pizzas);
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "entree"){
        prod = await db.query('select * from entree');
        sauces = await db.query('select * from sauce_entree');
        has_sauce = await db.query('select * from entree where sauce=true'); // * -> nom
        renderAllEntrees(req, res, prod, sauces, has_sauce);
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "boisson"){
        prod = await db.query('select * from boisson');
        renderAllProd(req, res, prod);
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "dessert"){
        prod = await db.query('select * from dessert');
        renderAllProd(req, res, prod);
        
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "sauce"){
        prod = await db.query('select * from sauce_entree');
        renderAllProd(req, res, prod);
    }
    await db.end();
}

module.exports.selectProd = async function(req, res) {
    const db = await getClient();
    
    let details; let tab; let type;
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "pizza"){ 
        let tab = await getPizza(req, res);
        renderPizza(req, res, tab);
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "entree"){
        tab = await getEntree(req, res);
        renderEntree(req, res, tab);
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "dessert"){
        details = (await getDessert(req, res));        
        renderProd(req, res, details, "Desserts");
    }
    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "boisson"){
        details = await getBoisson(req,res);
        renderProd(req, res, details, "Boissons");
    }

    if(typeof req.params.typeOfProd !== 'undefined' && req.params.typeOfProd === "sauce"){
        details = await getSauce(req,res);
        renderProd(req, res, details, "Sauces");
    }
    await db.end();
    
}