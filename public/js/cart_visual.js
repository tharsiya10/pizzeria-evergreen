
function css_div(id){
    $("#"+id).css({
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        padding: "10px"
    });    
}

function css_rm_btn(id_btn){
    $("#"+id_btn).css({
        backgroundColor: "transparent",
        cursor: "pointer",
        outline: "none",
        border: "none",
        overflow: "hidden",
        color: "grey",
        width: "50px"
    });
   
}


