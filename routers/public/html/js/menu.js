const menu_btn = document.getElementsByClassName("bt");
document.addEventListener("click", function(e){
    if(e.target == menu_btn[0]){
        this.location.href = "index.html";
    }
})