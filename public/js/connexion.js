$(document).ready (function () {
    let livreur = {nom: '', prenom: '', mdp: ''}

    function formCompleted(){
        if(livreur.nom !== "" && livreur.prenom != "" && livreur.mdp !=""){
            $("#submit").prop("disabled", false);
        }
    }

    $("#submit").prop("disabled", true);

    $("#nom").on("keyup", function(){
        livreur.nom = $("#nom").val();
        formCompleted();
    });

    $("#prenom").on("keyup", function(){
        livreur.prenom = $("#prenom").val();
        formCompleted();
    });

    $("#mdp").on("keyup", function(){
        livreur.mdp = $("#mdp").val();
        formCompleted();
    });

});
