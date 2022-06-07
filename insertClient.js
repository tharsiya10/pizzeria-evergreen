const { getClient } = require('./connect');
const { insertAll } = require('./insertCmd');

module.exports.insertClient = async function(req, res){
    const db = await getClient();
    let nom = req.body.client.nom;
    let prenom = req.body.client.prenom;
    let adresse = req.body.client.adresse;
    let code = req.body.client.code; 
    let tel = req.body.client.mobile;
    let mail = req.body.client.mail;
    let horaire = req.body.client.time;
    
    await db.query('insert into client(nom, prenom, adresse, codeImmeuble, tel, mail, horaire) values($1, $2, $3, $4, $5, $6, $7)'
        , [nom, prenom, adresse, code, tel, mail, horaire]);
    let idClient = await db.query('select idClient from client where nom=$1 and prenom=$2 and horaire=$3', [nom, prenom, horaire]);
    
    await db.query('insert into commande(idClient,montant) values($1,$2)', [idClient.rows[0].idclient, parseInt(req.body.total_price)]);
    let idCmd = await db.query('select idCmd from commande where idClient=$1', [idClient.rows[0].idclient]);
    let products = (JSON.parse(req.body.products));
    await insertAll(products, idCmd);
    await db.end();
}