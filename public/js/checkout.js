$(document).ready (function () {
    
    let client = {nom: "", prenom: "", adresse: "", code:"", mobile:"", mail:"", time: $("#horaire").val() }
    let panier = JSON.parse(sessionStorage.getItem("cart"));

    $("#client-data").on({
        click: function(e){
            e.preventDefault();
            let products = JSON.stringify(panier.products);
            let total_price = panier.total_price;
            $.post('/commande', 
            {'client': client, 'products': products , 'total_price': total_price}
            ).done(function(){
                setTimeout(function(){ document.location = '/'; alert('Commande bien enregistrée') }, 2000);
                
            });
            sessionStorage.clear();
        }
    })

    function formCompleted(){
        if(client.nom !== "" && client.prenom != "" && client.adresse !="" && client.mobile != "" && client.mail != ""){
            $("#submit").prop("disabled", false);
        }
    }

    function borderColor(id, color){
        $(id).css({
            border: "2px solid "+color
        });
    }

    $("#submit").prop("disabled", true);
    $("#nom").on("keyup", function(){
        client.nom = $("#nom").val();
        borderColor("#nom", "green");
        formCompleted();
    });

    $("#prenom").on("keyup", function(){
        client.prenom = $("#prenom").val();
        borderColor("#prenom", "green");
        formCompleted();
    });

    $("#rue").on("keyup", function(){
        client.adresse = $("#rue").val() +" "+$("#postal").val()+" "+$("#ville").val();
        borderColor("#rue", "green");
        formCompleted();
    });
    
    $("#postal").on("keyup", function(){
        client.adresse = $("#rue").val() +" "+$("#postal").val()+" "+$("#ville").val();
        borderColor("#postal", "green");
        formCompleted();
    });
    $("#ville").on("keyup", function(){
        client.adresse = $("#rue").val() +" "+$("#postal").val()+" "+$("#ville").val();
        borderColor("#ville", "green");
        formCompleted();
    });

    $("#code").on("keyup", function(){
        client.code = $("#code").val();
    });

    $("#horaire").on("input", function(){
        client.time = $("#horaire").val();
    });

    let regex_mobile = new RegExp(/^(06|07)[0-9]{8}/gi);
    $("#mobile").on("keyup", function(){
        client.mobile = $("#mobile").val();
        if(regex_mobile.test(client.mobile)){
            borderColor("#mobile", "green");
            
            formCompleted();
        }
        
        else {
            borderColor("#mobile", "red");
        }
    });

    let reg_mail = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
    $("#mail").on("keyup", function(){
        client.mail = $("#mail").val();
        if(reg_mail.test(client.mail)){
            borderColor("#mail", "green");
            formCompleted();
        }
        else {
            borderColor("#mail", "red");
        }
        
    });

});