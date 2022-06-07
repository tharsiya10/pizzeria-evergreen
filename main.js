const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: true});
const { getClient } = require('./connect');
const { renderAllMenus } = require('./getCarte');
const { commandePage } = require('./getCommande');
const { insertClient } = require('./insertClient');
const { selectCarte, selectProd } = require('./selectData');
const path = require('path');

app.listen(port);
app.set("view engine", "ejs");
app.use("/public", express.static('public'));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const db = await getClient();
    const prod  = await db.query('select * from menu');
    renderAllMenus(req, res, prod);
    await db.end(); 
});

app.post('/checkout', urlencodedParser, (req,res) => {
    res.render('checkout.ejs');
});

app.post('/commande', urlencodedParser, async (req, res) => {
    insertClient(req, res);
    res.sendFile(path.join(__dirname, '/public/html/fin.html'));
});


app.post('/livraison', urlencodedParser, async (req,res) => {
    const db = await getClient();
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let mdp = req.body.mdp;
    let idLivr = await db.query('select * from livreur where nom=$1 and prenom=$2 and mdp=$3', [nom, prenom, mdp]);
    let tab;
    if(idLivr.rowCount === 1){
        commandePage(res, idLivr.rows[0].idlivr);
    }
    else if(typeof req.body.commande !== 'undefined'){
        let cmd = parseInt(req.body.commande);
        let tmp = await db.query('delete from commande where idCmd=$1', [cmd]);
        tmp = await db.query('delete from client where idClient=$1', [parseInt(req.body.client)]);
        commandePage(res, parseInt(req.body.livreur));
        
    }
    else {
        res.render('connexion.ejs', {
            nom: nom,
            prenom: prenom,
            mdp: '',
            titre: "Vous n'existez pas"
        });
    }
    await db.end();

});

app.get('/livraison', (req, res) => {    
    res.render('connexion.ejs',  {
        nom: '',
        prenom: '',
        mdp: '',
        titre: "Connexion"
    });
});

app.get("/:typeOfProd", async (req, res) => {
    await selectCarte(req, res);
});

app.get("/:typeOfProd/:id", async (req,res) => {
    await selectProd(req, res);
});