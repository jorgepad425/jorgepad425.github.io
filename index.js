/*
https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
    Used to create booklist as an array rather than directly manipulating the HTML, passing
values as elements and not arrays.
*/

/*
Improve Whitespace Checking
Improve UI for mobile devices
Ability to rate books (0.0 - 5.0)
Ability to search books by title/author (refreshList could have an if condition!)
    - Improved filtering option (genre, status)
Finishing book celebratory
MAYBE NOT GROUPING BOOKS :(
Display book covers via API (Google Library/Open Library)

CSS Wishlist

Confetti for finishing a book
Better background web visual overall
Better border for books and the "bookshelf"
Animation for deleting a book (Border closes in and disappears)
Visually better drop down selection

*/
class book{
    constructor(title, author, genre, isbn){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isbn = isbn;
    }
}

var bookarray = [];

(function () {
    bookarray.push(new book("Book", "Author", "Genre", "ISBN"));
    bookarray.push(new book("Great Gatsby", "F. Scott Fitzgerald", "Tragedy", "9780333791035"));

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
        let temp = getEle("booktemplate").content.cloneNode(true);

        temp.querySelector(".title").innerText = bookarray[i].title;
        temp.querySelector(".author").innerText = bookarray[i].author;
        temp.querySelector(".genre").innerText = bookarray[i].genre;
        temp.querySelector(".isbn").innerText = bookarray[i].isbn;

        getEle("list").appendChild(temp); 
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

        const temp = new book(text.value, author.value, genre.value, isbn.value==""?"N/A":isbn.value);
        bookarray.push(temp);

        for(let i = 0; i<inputList.length; i++) inputList[i].value = "";

        refreshList();
    }
    acceptable = true;
}

function deleteBook(book){
    let index = -1;
    const size = getEle("list").querySelectorAll("li").length;
    for(let i = 0; i < size; i++)
        if(getEle("list").querySelectorAll("li")[i].isEqualNode(book))
             index = i;
        
    for(let j = index; j<bookarray.length; j++)
            bookarray[j] = bookarray[j+1]
    bookarray.pop();
    refreshList();
}

function selectStar(rating){
    const star = rating.getAttribute("value");
    console.log(star);
    const radio = rating.parentNode.querySelectorAll("input[type=radio]");
    for(let i = 0; i < 5; i++){
        const pluh = ".starsymbol" + (i+1);
        const staritem = rating.parentNode.querySelector(pluh);
        if(radio[i].getAttribute("value") <= star)
            staritem.setAttribute("src", "goodstar.png");
        else staritem.setAttribute("src", "badstar.png");
    }
}