const { getClient } = require('./connect');

module.exports.commandePage = async function (res, idLivr) {
    const db = await getClient();
    let client_details;
    let commande = await db.query('select * from livraison where idLivr=$1', [idLivr]);
    if(commande.rowCount !== 0){
        client_details = await db.query('select * from client natural join commande where idCmd=$1', [commande.rows[0].idcmd]);
    }
    else {
        client_details = await db.query('select * from client where horaire=(select min(horaire) from client natural join commande where idCmd not in (select idCmd from livraison))');
    }
    
    let desserts = []; let boissons = [];  let sauces = []; let entrees = [];  let pizzas = []; let ingredients = []; let sauces_entrees = []; let i ;
    let idDessert; let idBoisson; let idSauce; let idEntree; let idPizza;  let idCmd;
    
    if(client_details.rowCount !== 0){
        idCmd = await db.query('select * from commande where idClient=$1', [client_details.rows[0].idclient]);
        if(idCmd.rowCount !== 0){
            if(commande.rowCount === 0){
                await db.query('insert into livraison(idLivr,idCmd) values($1,$2)', [idLivr, idCmd.rows[0].idcmd]);
            }
            
            idDessert = await db.query('select * from client_dessert where idCmd=$1', [idCmd.rows[0].idcmd]);
            idBoisson = await db.query('select * from client_boisson where idCmd=$1', [idCmd.rows[0].idcmd]);
            idSauce = await db.query('select * from client_sauce where idCmd=$1',[idCmd.rows[0].idcmd]);
            idEntree = await db.query('select * from client_entree where idCmd=$1', [idCmd.rows[0].idcmd]);
            idPizza = await db.query('select * from client_pizza where idCmd=$1', [idCmd.rows[0].idcmd]);
            
            if(typeof idPizza.rows[0] !== 'undefined') {
                for(i = 0; i<idPizza.rowCount; i++){
                    pizzas[i] = (await db.query('select * from pizza_classique where code=$1', [idPizza.rows[i].idpizza])).rows;
                    ingredients[i] = (await db.query('select * from client_ingredients where id_client_pizza=$1', [idPizza.rows[i].id_client_pizza])).rows;
                    
                }  
            }
            if(typeof idEntree.rows[0] !== 'undefined'){
                
                for(i = 0; i<idEntree.rowCount; i++){
                    entrees[i] = (await db.query('select * from entree where id=$1', [idEntree.rows[i].identree])).rows;
                    sauces_entrees[i] = (await db.query('select * from sauce_entree where id=$1', [idEntree.rows[i].idsauce])).rows;
                }

            }
            if(typeof idSauce.rows[0] !== 'undefined'){
                for(i = 0; i<idSauce.rowCount; i++){
                    sauces[i] = (await db.query('select * from sauce_entree where id=$1', [idSauce.rows[i].idsauce])).rows;    
                }
                
            }
            if(typeof idDessert.rows[0] !== 'undefined'){
                for(i = 0; i<idDessert.rowCount; i++){
                    desserts[i] = (await db.query('select * from dessert where id=$1', [idDessert.rows[i].iddessert])).rows;
                }
                
            }
            if(typeof idBoisson.rows[0] !== 'undefined'){
                for(i = 0; i<idBoisson.rowCount; i++){
                    boissons[i] = (await db.query('select * from boisson where id=$1', [idBoisson.rows[i].idboisson])).rows;
                }
            }
        }
    }
    
    res.render('commande.ejs', {
        client_details : client_details,//(client_details.rows[0]),
        entrees: entrees,
        sauces_entrees: sauces_entrees,
        sauces: sauces,
        desserts: desserts,
        boissons: boissons,
        pizzas: pizzas,
        ingredients: ingredients,
        idLivr: idLivr,
        idPizza: idPizza,//idPizza.rows,
        idCmd: idCmd //idCmd.rows[0].idcmd
    });
}