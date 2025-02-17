function addBook(){
    const text = document.getElementById("titleText");
    const genre = document.getElementById("genreText");

    const mtext = document.getElementById("mtitle");
    const mgen = document.getElementById("mgenre");
    let acceptable = true;
    mtext.setAttribute("hidden", true);
    mgen.setAttribute("hidden", true);

    if(text.value == ""){
        mtext.removeAttribute("hidden");
        acceptable = false;
    }
    if(genre.value == "") {
        mgen.removeAttribute("hidden");
        acceptable = false;
    }

    if(acceptable == true){
    mtext.setAttribute("hidden", true);
    mgen.setAttribute("hidden", true);
    text.value = "";
    genre.value = "";
    }
    acceptable = true;
}