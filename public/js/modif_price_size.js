$(document).ready(function () {
    let prod;
    
    if($("#prod-container").attr('data-prod')){
        prod = JSON.parse($("#prod-container").attr('data-prod'));
    }

    function modifPrixSelonTaille(btn, id){
        let id_opt = ($("#taille-select-"+id).val());
        
        let setprice = ($("#taille-"+id+"-"+id_opt).attr('data-price'));
        btn.attr('data-price', setprice);
        let settaille = id_opt;
        
        btn.attr('data-taille', settaille);
        if(typeof setprice !== "undefined"){
            btn.html('Ajouter '+setprice+' €');
        }
        else {
            btn.html("Ajouter "+btn.attr('data-price')+" €");
        } 
    }

    if(prod){
        for(let c = 0; c<prod.length; c++){
            let btn = $("#add-in-cart-"+prod[c].id);
            let id = btn.attr('data-id');
            modifPrixSelonTaille(btn, id);

            $("#taille-select-"+id).on({
                change: function(){
                    modifPrixSelonTaille(btn, id);
                }
            })
        }
    }
});