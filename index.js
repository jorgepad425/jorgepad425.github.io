/*
https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
    Used to create booklist as an array rather than directly manipulating the HTML, passing
values as elements and not arrays.
*/

var bookarray = [
    ['Placeholder Book', 'Placeholder Genre'],
    ['Great Gatsby', 'Tragedy']
];

(function () {
    refreshList();
})();

function getEle(s){
    const element = document.getElementById(s);
    return element;
}

function refreshList(){
    while (getEle("list").firstChild) {
        getEle("list").removeChild(getEle("list").firstChild);
        }

    for(let i = 0; i<bookarray.length; i++){
        let entry = document.createElement("li");
        entry.innerHTML = '<div class="book"><li><div class="booktext"><h3>' + bookarray[i][0] + '</h3><h5>' + bookarray[i][1]+ '</h5></div></li></div>';
        getEle("list").appendChild(entry); 
    }
}

/*
      <div class="book"><li>
        <div class="booktext">
        <h3>Book 1</h3>
        <h5>Thriller</h5>
      </div></li></div>
      <div class="book"><li>
        <div class="booktext">
        <h3>Book 2</h3>
        <h5>Horror</h5>
      </div></li></div>
*/

function addBook(){
    const text = getEle("titleText");
    const genre = getEle("genreText");

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

        let temp = [text.value, genre.value];
        bookarray.push(temp);

        text.value = "";
        genre.value = "";
    }
    acceptable = true;
    refreshList();
}
