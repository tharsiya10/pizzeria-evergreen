$(document).ready(function () {
    let taille = $("select").val();
    let prix = ($("option").attr("data-price"));
    let prix_total = parseInt(prix);
    let id_pizza = $("#prod-container").attr('data-id');
    let ingr_init = JSON.parse($("#ingredients-chosen").attr("data-ingr"));
    let all_ingr = JSON.parse($("#all-ingredients").attr("data-all"));
    let ingr_curr = ingr_init;
    let add_prix = 0;
    let count = ingr_curr.length;

    function setEtiquette(){
        for(let i = 0; i< all_ingr.length; i++){
            let span = $("#prix-ingr-"+all_ingr[i].cle_ingr);
           
            if(ingr_curr.length < 3){
                
                span.html("gratuit");
            }
            else {
                
                let etiquette_prix = $("#prix-ingr-"+all_ingr[i].cle_ingr).attr('data-price');
                
                span.html(etiquette_prix);
            }
        }
    }

    setEtiquette();

    function show_montant(prix_taille, add_prix){
        prix_total = parseInt(add_prix) + parseInt(prix_taille);
        $("button#add-in-cart-"+id_pizza).data('ingr', JSON.stringify(ingr_curr));
        $("button#add-in-cart-"+id_pizza).attr('data-price', prix_total);
        $("button#add-in-cart-"+id_pizza).html("Ajouter "+prix_total+" €");
    }
    show_montant(prix, add_prix);

    function is_gratuit(prix_ingr){
        if(ingr_curr.length <= 3){
            show_montant(prix, 0);
        }
        else {
            
            add_prix += parseInt(prix_ingr);
            
            show_montant(prix, add_prix);
        }
    }
    
    //TAILLE et prix d'une pizza
    $("#taille-select-"+id_pizza).on({
        change: function(){
            taille = ($("#taille-select-"+id_pizza).val());
            
            prix = ($("#taille-"+id_pizza+"-"+taille).attr("data-price"));
            
            show_montant(prix, add_prix);
        }
    });

    all_rm();
    all_add();
    
    function all_add(){
        for(let j = 0; j < all_ingr.length; j++){
            let btn_add = $("button#add-toppings-"+all_ingr[j].cle_ingr);  
            let prix_ingr = $("button#add-toppings-"+all_ingr[j].cle_ingr).attr('data-prix');
            
            $(btn_add).on({
                click: function(){
                    handle_btn_add_toppings(btn_add, all_ingr[j].cle_ingr);
                    
                    is_gratuit(prix_ingr); 
                    if(ingr_curr.length >= 6){
                        disable_all(true);
                    }
                    all_rm();
                }
            })
            
        }
    }   

    function disable_all(b){
        for(let n = 0; n<all_ingr.length; n++){
            let btn_add = $("button#add-toppings-"+all_ingr[n].cle_ingr);  
            disable(btn_add, b);
        }
    }    

   function disable(btn, b){
       $(btn).prop("disabled", b);
   }

    function handle_btn_add_toppings(btn, cle_ingr){
        add_in_tab(ingr_curr, cle_ingr);
        after_add_toppings(cle_ingr);
        setEtiquette();
    }

    function after_add_toppings(cle_ingr){
        count++;
        $("#ingredients-chosen").append('<div id="my-toppings-'+count+'" data-cle="'+cle_ingr+'"><p>'+cle_ingr+'</p><button id="rm-toppings-'+count+'">x</button></div>');
    }

    function after_rm_toppings(div){
        $(div).remove();
    }

    function handle_btn_rm_toppings(btn, div, i, cle_ingr){
        let suppr_prix = remove_price_ingr(all_ingr, cle_ingr);
        rm_in_tab(ingr_curr, cle_ingr);
        after_rm_toppings(div);        
        is_gratuit("-"+suppr_prix); 
    }

    function all_rm(){   
        for(let i = 1; i <= count; i++){
            let btn_rm = ("button#rm-toppings-"+i);
            let div_rm = ("#my-toppings-"+i);
            let cle_ingredient = $(div_rm).attr('data-cle');
            $(btn_rm).on({
                click: function(){
                    handle_btn_rm_toppings(btn_rm, div_rm, i, cle_ingredient);
                    setEtiquette();
                    if(ingr_curr.length < 6){
                        disable_all(false);
                    }
                    
                }
            }); 
        }
    }
});
