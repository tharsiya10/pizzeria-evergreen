$(document).ready(function () {
   
    let my_cart = {products: [], total_price: 0};
    let sauce = "";
    let count = 0;
    let prod;
    
    if($("#prod-container").attr('data-prod')){
        prod = JSON.parse($("#prod-container").attr('data-prod'));
    }

    //session storage
    if(sessionStorage.getItem("cart")){
        my_cart = (JSON.parse(sessionStorage.getItem("cart")));  
        show_cart();
        show_total_price();
    }

    if(sessionStorage.getItem("count")){
        count = (JSON.parse(sessionStorage.getItem("count")));
    }

    if(prod){
        for(let i = 0; i<prod.length; i++){
            $("#add-in-cart-"+prod[i].id).on({
                click: function(event){
                    let btn = $("#add-in-cart-"+prod[i].id);
                    if(typeof prod[i].sauce !== "undefined" && prod[i].sauce === true){
                        sauce = $("#sauce-select").val();
                    }
                    else {
                        sauce = "";
                    }
                    handle_btn_add(btn);
                }
            })
        }
    }

    function show_total_price(){
        $("#montant-prix").html(my_cart.total_price+" €");
    }

    function show_cart(){
        for(let i = 0; i< my_cart.products.length; i++){
            show_cart_after_add(my_cart.products[i]);
        }
    }

    function show_cart_after_add(p){ 
        let id_div = "panier-content-"+p.id;
        let id_span_name = id_div+"-name";
        let id_span_price = id_div+"-price";
        let id_span_sauce = id_div+"-sauce";
        let id_btn = "item-removal-"+p.id;
        let div;
        let span_name = '<span id='+id_span_name+'>'+p.nom+'</span>';
        let span_price = '<span id='+id_span_price+'>'+p.prix+' €'+'<button id='+id_btn+'> X</button>'+'</span>';
        if(p.sauce){
            let span_sauce = '<span id='+id_span_sauce+'>'+sauce+'</span>';
            div = '<div id='+id_div+'>'+span_name+span_sauce+span_price+'</div';
        }
        else {
            div = '<div id='+id_div+'>'+span_name+span_price+'</div';
        } 
        $("#panier").append(div);
        handle_rm_btn(id_btn, p);
        css_rm_btn(id_btn);
        css_div(id_div);
    }

    function show_cart_after_rm(p){
        $("#panier-content-"+p.id).remove();
    }

    function handle_btn_add(btn){
        count ++;
        sessionStorage.setItem("count",JSON.stringify(count));
        let prix;
        prix = parseInt(btn.attr('data-price'));
        let ingr = "";
        
        if(btn.data('ingr')){
            ingr = btn.data('ingr');
        }
        let p = {
            id: count, 
            type: btn.attr('data-type'),
            id_prod: (btn.attr('data-id')),
            nom: btn.attr('data-name'),
            taille: btn.attr('data-taille'),
            prix: prix,
            sauce: sauce,
            ingr: ingr
        }
        
        add(my_cart, p);
        show_cart_after_add(p);
        show_total_price();
    }

    function handle_rm_btn(id_btn, p){
        $("#"+id_btn).on({
            click: function(event){
                remove(my_cart, p);
                show_cart_after_rm(p);
                show_total_price();
            }
        });
    }
    $(".checkout").on({
        click: function(e){
            let products = JSON.stringify(my_cart.products);
            let total_price = my_cart.total_price;
            $.post('/checkout', { 'products': products , 'total_price': total_price});
        }
    })
});
