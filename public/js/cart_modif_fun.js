function is_present(my_cart, prod){
    return my_cart.products.findIndex((p) => p.id === prod.id) ;
}

function add(my_cart, prod){ 
    my_cart.products.push(prod);
    my_cart.total_price += prod.prix; 
    sessionStorage.setItem("cart",JSON.stringify(my_cart));       
}

function remove(my_cart, prod){
    let ind = is_present(my_cart, prod);
    if(ind >= 0){
        my_cart.products.splice(ind,1);
        my_cart.total_price -= prod.prix;
        sessionStorage.removeItem("cart");
        sessionStorage.setItem("cart",JSON.stringify(my_cart));
    }
}