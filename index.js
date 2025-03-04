/*
https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
    Used to create booklist as an array rather than directly manipulating the HTML, passing
values as elements and not arrays.
*/

/*
Improve Whitespace Checking
Improved filtering option (genre, status) - Easy?
Make filtering not be capsensitive :(
Finishing book celebratory
MAYBE NOT GROUPING BOOKS :(
Display book covers via API (Google Library/Open Library)

CSS Wishlist

Improve UI for mobile devices
Confetti for finishing a book
Better background web visual overall
Better border for books and the "bookshelf"
Animation for deleting a book (Border closes in and disappears)
Visually better drop down selection

*/
class book{
    constructor(title, author, genre, isbn, rating){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isbn = isbn;
        this.rating = rating;
        this.ID = INTERNAL_ID++;
        bookorder.push(this.ID);
    }
}

var bookarray = [];
var bookorder = [];
var INTERNAL_ID = 0;

(function () {
    bookarray.push(new book("Book", "Author", "Genre", "ISBN", 1));
    bookarray.push(new book("Great Gatsby", "F. Scott Fitzgerald", "Tragedy", "9780333791035", 5));

    refreshList();
})();

function swap(i, j){
    const temp = bookarray[i];
    bookarray[i] = bookarray[j];
    bookarray[j] = temp;
}

function refreshList(){
    while (getEle("list").firstChild) {
        getEle("list").removeChild(getEle("list").firstChild);
        }
    const t = getEle("titleSearch").value.toLowerCase();
    const a = getEle("authorSearch").value.toLowerCase();
    for(let i = 0; i<bookarray.length; i++){
        let temp = getEle("booktemplate").content.cloneNode(true);
        const title = bookarray[i].title;
        const author = bookarray[i].author;
        
        if(!(title.toLowerCase().includes(t,0)) && ("" != t)) continue;
        if(!(author.toLowerCase().includes(a,0)) && ("" !=a)) continue;

        temp.querySelector(".title").innerText = title;
        temp.querySelector(".author").innerText = author;
        temp.querySelector(".genre").innerText = bookarray[i].genre;
        temp.querySelector(".isbn").innerText = bookarray[i].isbn;
        temp.querySelector(".INTERNAL_ID").innerText = bookarray[i].ID;
        refreshStar(bookarray[i], temp);

        getEle("list").appendChild(temp); 
    }
}
function refreshStar(book, item){
    const radio = item.querySelectorAll("input[type=radio]");
    for(let i = 0; i < 5; i++){
        const pluh = ".starsymbol" + (i+1);
        const staritem = item.querySelector(pluh);
        if(radio[i].getAttribute("value") <= book.rating)
            staritem.setAttribute("src", "goodstar.png");
        else staritem.setAttribute("src", "badstar.png");
    }
}
function textChanged(ele){
    if(ele.value != "")
        ele.style.border = "2px solid black"
}

function addBook(){
    const text = getEle("titleText");
    const genre = getEle("genreText");
    const author = getEle("authorText");
    const isbn = getEle("isbnText");

    const missing = document.getElementById("missingText");
    let acceptable = true;
    missing.setAttribute("hidden", true);

    var inputList = getEle("inputList").querySelectorAll("input[type=text]");
    
    for(let i = 0; i<inputList.length; i++){
        let temp = inputList[i];
        if(temp.value == "" && temp.id != "isbnText"){ // IMPROVE THE CHECK, WHITESPACE GETS ADDED
            missing.removeAttribute("hidden");
            acceptable = false;
            temp.style.border = "2px solid lightcoral";
        } 
        else temp.style.border = "2px solid black";
    }

    if(acceptable == true){
        missing.setAttribute("hidden", true);

        const temp = new book(text.value, author.value, genre.value, isbn.value==""?"N/A":isbn.value, 0);
        bookarray.push(temp);

        for(let i = 0; i<inputList.length; i++) inputList[i].value = "";

        refreshList();
    }
    acceptable = true;
}

function deleteBook(book){
    let index = getIdxOfBook(book, 0);
    for(let j = index; j<bookarray.length; j++){
            bookarray[j] = bookarray[j+1];
            bookorder[j] = bookorder[j+1];
    }
    bookorder.pop();
    bookarray.pop();
    refreshList();
}

function selectStar(rating){
    const star = rating.getAttribute("value");
    index = getIdxOfBook(rating, 3)
    console.log(index);
    bookarray[index].rating = star;
    refreshStar(bookarray[index], rating.parentNode.parentNode.parentNode)
}

/* UTILITY FUNCTIONS */
function getEle(s){
    const element = document.getElementById(s);
    return element;
}

function getIdxOfBook(item, recursion){
    const size = bookorder.length;
    let index = -1;
    for(let j = 0; j < recursion; j++)
        item = item.parentNode;
    for(let i = 0; i < size; i++)
        if(bookorder[i] == item.querySelector(".INTERNAL_ID").innerText)
            index = i;
    if(index==-1) return null;
    else return index;
}
function refreshStar(book, item){
    const radio = item.querySelectorAll("input[type=radio]");
    for(let i = 0; i < 5; i++){
        const pluh = ".starsymbol" + (i+1);
        const staritem = item.querySelector(pluh);
        if(radio[i].getAttribute("value") <= book.rating)
            staritem.setAttribute("src", "goodstar.png");
        else staritem.setAttribute("src", "badstar.png");
    }
}