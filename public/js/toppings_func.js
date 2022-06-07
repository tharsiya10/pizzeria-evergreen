// add toppings in ingr_curr
function add_in_tab(tab, topping){
    tab.push(
        {"cle_ingr": topping}
    );
}

function present_in_tab(tab, cle_ingr){
    return tab.findIndex((p) => p.cle_ingr === cle_ingr) ;
}

function rm_in_tab(tab, cle_ingr){
    let ind = tab(cle_ingr);
    tab.splice(ind, 1);
}