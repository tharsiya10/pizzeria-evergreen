function add_in_tab(tab, topping){
    tab.push(
        {"cle_ingr": topping}
    );
}

function present_in_tab(tab, cle_ingr){
    return tab.findIndex((p) => p.cle_ingr === cle_ingr) ;
}

function remove_price_ingr(tab, cle_ingr){ //, ingr_curr
    if(present_in_tab(tab,cle_ingr) !== -1){
        if(tab.length >= 3){ // ingr_curr
            return tab.find((p) => p.cle_ingr === cle_ingr).prix;
        }
        
    }
    
    return 0;
}

function rm_in_tab(tab, cle_ingr){
    let ind = present_in_tab(tab,cle_ingr);
    tab.splice(ind, 1);
}
