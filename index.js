function addBook(){
    const text = document.getElementById("titleText");
    const genre = document.getElementById("genreText");
    let acceptable = true;

    if(text.value == ""){
        window.alert("Missing title!");
        acceptable = false;
    }
    if(genre.value == "") {
        window.alert("Missing genre!");
        acceptable = false;
    }
    // Change this to a text warning under the input and not an obstructive window alert.
    if(acceptable == true){
    text.value = "";
    genre.value = "";
    }
    acceptable = true;
}