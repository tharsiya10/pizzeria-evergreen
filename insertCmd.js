const { getClient } = require('./connect');

async function insertPizza(idcmd, p) {
    const db = await getClient();
    let code = await db.query('select code from pizza_classique where id=$1 and taille=$2', [p.id_prod, p.taille]);
    await db.query('insert into client_pizza(idCmd,idPizza,prix) values($1,$2,$3)', [idcmd, code.rows[0].code,p.prix]);
    if(p.ingr !== ''){
        let ingr = JSON.parse(p.ingr);
        let idClPizza = await db.query('select id_client_pizza from client_pizza where idCmd=$1 and idPizza=$2 and prix=$3', [idcmd, code.rows[0].code, p.prix]);
        ingr.forEach(async function(i){
            let aux = await db.query('insert into client_ingredients(id_client_pizza,cle_ingr) values($1,$2)', [idClPizza.rows[0].id_client_pizza, i.cle_ingr]);
        });
    }
    
}

async function insertEntree(idcmd, p){
    const db = await getClient();
    if(p.sauce === ''){
        await db.query('insert into client_entree(idCmd,idEntree) values($1,$2)', [idcmd, p.id_prod]);
    }
    else {
        await db.query('insert into client_entree(idCmd,idEntree,idSauce) values($1,$2,$3)', [idcmd, p.id_prod, p.sauce]);
    }
    
}

module.exports.insertAll = async function(products, idCmd){
    const db = await getClient();
    products.forEach(function(p){
        if(p.type === 'sauce'){
            db.query('insert into client_sauce(idCmd,idSauce) values($1,$2)', [idCmd.rows[0].idcmd, p.id_prod]);
        }
        if(p.type === 'boisson'){
            db.query('insert into client_boisson(idCmd,idBoisson) values($1,$2)', [idCmd.rows[0].idcmd, p.id_prod]);
        }
        else if(p.type === 'dessert'){
            db.query('insert into client_dessert(idCmd,idDessert) values($1,$2)', [idCmd.rows[0].idcmd, p.id_prod]);
        }
        else if(p.type === 'entree'){
            insertEntree(idCmd.rows[0].idcmd, p);
        }
        else if(p.type === 'pizza'){
            insertPizza(idCmd.rows[0].idcmd, p);
        }

    });
    
}
    