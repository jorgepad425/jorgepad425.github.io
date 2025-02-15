function addBook(){
    if(document.getElementById("titleText").value == "" || 
    document.getElementById("genreText").value == "") 
    // Change this to a text warning under the input and not an obstructive window alert.
        window.alert("Missing title/genre!");
    else {
    document.getElementById("titleText").value = "";
    document.getElementById("genreText").value = "";
    }
}