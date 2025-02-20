/*
https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
    Used to create booklist as an array rather than directly manipulating the HTML, passing
values as elements and not arrays.
*/

/*
Reading Status: Not Started, In Progressed, Finished
Deleting Books

Change bookarray from an array of arrays to an array of book objects
book objects include: book(title, author, genre, isbn)
Improve Whitespace Checking
Allow usage of template for easier modifying
*/
class book{
    constructor(title, genre){
        this.title = title;
        this.genre = genre;
    }
}

var bookarray = [];

(function () {
    bookarray.push(new book("Placeholder Book", "Placeholder Genre"));
    bookarray.push(new book("Great Gatsby", "Tragedy"));

    refreshList();
})();

function getEle(s){
    const element = document.getElementById(s);
    return element;
}

function swap(i, j){
    const temp = bookarray[i];
    bookarray[i] = bookarray[j];
    bookarray[j] = temp;

}

function refreshList(){
    while (getEle("list").firstChild) {
        getEle("list").removeChild(getEle("list").firstChild);
        }

    for(let i = 0; i<bookarray.length; i++){
        let entry = document.createElement("div");
        entry.className = "book"; //<div class="book">
        entry.innerHTML = '<li><div class="booktext"><h3>' + bookarray[i].title + '</h3><h5>' + bookarray[i].genre + '</h5></div></li>';
        getEle("list").appendChild(entry); 
    }
}

function textChanged(ele){
    if(ele.value != "")
        ele.style.border = "2px solid black"
}

function addBook(){
    const text = getEle("titleText");
    const genre = getEle("genreText");

    const missing = document.getElementById("missingText");
    let acceptable = true;
    missing.setAttribute("hidden", true);

    var inputList = getEle("inputList").querySelectorAll("input[type=text]");
    
    for(let i = 0; i<inputList.length; i++){
        let temp = inputList[i];
        if(temp.value == ""){ // IMPROVE THE CHECK, WHITESPACE GETS ADDED
            missing.removeAttribute("hidden");
            acceptable = false;
            temp.style.border = "2px solid lightcoral";
        } 
        else temp.style.border = "2px solid black";
    }

    if(acceptable == true){
        missing.setAttribute("hidden", true);

        const temp = new book(text.value, genre.value);
        bookarray.push(temp);

        text.value = "";
        genre.value = "";

        refreshList();
    }
    acceptable = true;
}
