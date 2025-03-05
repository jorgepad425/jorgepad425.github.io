/*
https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
    Used to create booklist as an array rather than directly manipulating the HTML, passing
values as elements and not arrays.
*/

/*
Improve Whitespace Checking
Add Sorting
Finishing book celebratory
Maybe Group Books?
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
    constructor(title, author, genre, isbn, status, rating){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isbn = isbn;
        this.status = status;
        this.rating = rating;
        this.ID = INTERNAL_ID++;
        bookorder.push(this.ID);
    }
}

var bookarray = [];
var bookorder = [];
var INTERNAL_ID = 0;

var filtercount = 0;
var filterarray = [];

(function () {
    bookarray.push(new book("Book", "Author", "Genre", "ISBN", 0, 1));
    bookarray.push(new book("Great Gatsby", "F. Scott Fitzgerald", "Tragedy", "9780333791035", 1, 3));
    bookarray.push(new book("Lamentable Tale of Sad Mouse", "Miss Cheese Veus", "Tragedy", "1234567890", 2, 5)); 

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
    refreshFilters();
    const t = getEle("titleSearch").value.toLowerCase();
    const a = getEle("authorSearch").value.toLowerCase();
    for(let i = 0; i<bookarray.length; i++){
        let temp = getEle("booktemplate").content.cloneNode(true);
        const title = bookarray[i].title;
        const author = bookarray[i].author;
        
        // SEARCH BEGINS FIRST
        if(!(title.toLowerCase().includes(t,0)) && ("" != t)) continue;
        if(!(author.toLowerCase().includes(a,0)) && ("" !=a)) continue;

        // FILTERS BEGIN NEXT, BASED ON AN 'OR' CONDITION
        let isFiltered = true;
        for(let j = 0; j < filterarray.length; j++){
            if(filterarray[j] <= 4 && filterarray[j]+1 == bookarray[i].rating){ isFiltered = false;}
            else if(filterarray[j] > 4 && filterarray[j]<8 && filterarray[j]-5 == bookarray[i].status){ isFiltered = false; }
            else {
                const genre = getEle("filterList")
                .querySelectorAll(".filter .filterCat")[j]
                ?.options[filterarray[j]]
                ?.innerText||'false';
                console.log(genre);
                if(genre == bookarray[i].genre && genre != false) isFiltered = false;
            }
        }
        if(isFiltered && filterarray.length!=0) continue;
        temp.querySelector(".title").innerText = title;
        temp.querySelector(".author").innerText = author;
        temp.querySelector(".genre").innerText = bookarray[i].genre;
        temp.querySelector(".isbn").innerText = bookarray[i].isbn;
        temp.querySelector(".status").selectedIndex = bookarray[i].status;
        temp.querySelector(".INTERNAL_ID").innerText = bookarray[i].ID;

        refreshStar(bookarray[i], temp);

        getEle("list").appendChild(temp);
    }
}
function changeCategory(category){
    filterarray[getIdxOfFilter(category.parentNode)] = category.selectedIndex;
    refreshList();
}
function addFilter(){
    const temp = 0;
    filterarray[filtercount] = temp;
    filtercount++;
    refreshList();
}
function refreshFilters(){
    while (getEle("filterList").firstChild){
        getEle("filterList").removeChild(getEle("filterList").firstChild);
    }
    for(let j = 0; j<filterarray.length; j++){
        let temp = getEle("filterTemplate").content.cloneNode(true);
        temp.querySelector(".INTERNAL_ID").innerText = j;

        const set = new Set();
        for(let i = 0; i<bookarray.length; i++){
            const genre = bookarray[i].genre;
            if(set.has(genre)) continue;
            set.add(genre);
            temp.querySelector(".filterCat").appendChild(new Option(genre, j));
        }
        temp.querySelector(".filterCat").selectedIndex = filterarray[j];
        temp.querySelector(".filterCat").setAttribute("value", filterarray[j]);
        getEle("filterList").appendChild(temp); 
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

        const temp = new book(text.value, author.value, genre.value, isbn.value==""?"N/A":isbn.value, 0, 0);
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
// filter one, filter two, filter three
function deleteFilter(filter){
    idx = getIdxOfFilter(filter);
    for(let i = idx; i<filterarray.length; i++){
        filterarray[i] = filterarray[i+1];
    }
    filtercount--;
    filterarray.pop();
    refreshList();
}
function getIdxOfFilter(filter){
    const filterList = getEle("filterList").querySelectorAll(".filter");
    let idx = -1
    for(let j = 0; j < filterarray.length; j++){
        if(filterList[j].isEqualNode(filter)){ idx = j; break; }
    }
    return idx;
}

function selectStar(rating){
    const star = rating.getAttribute("value");
    index = getIdxOfBook(rating, 3)
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