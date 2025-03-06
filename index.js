/*
https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
    Used to create booklist as an array rather than directly manipulating the HTML, passing
values as elements and not arrays.
*/

/*
Improve Whitespace Checking
Finishing book celebratory


CSS Wishlist
Better background web visual overall

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

(function (){
    bookarray.push(new book("Book", "Author", "Genre", "ISBN", 0, 1));
    bookarray.push(new book("The Great Gatsby", "F. Scott Fitzgerald", "Tragedy", "9780333791035", 1, 3));
    bookarray.push(new book("Lamentable Tale of a Sad Mouse", "Miss Cheese Veus", "Tragedy", "1234567890", 2, 5)); 

    refreshList();
})();

function swap(i, j){
    const temp = bookarray[i];
    bookarray[i] = bookarray[j];
    bookarray[j] = temp;
}
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function celebratory(dropdown){
    bookarray[getIdxOfBook(dropdown.parentNode.parentNode.parentNode)].status = dropdown.selectedIndex;
    if(dropdown.selectedIndex==2){
        const rainbow = dropdown.parentNode.parentNode.parentNode.querySelector(".rainbow-text");
        const s = "Congratulations! How was it?";
        rainbow.removeAttribute("hidden");
        for(let i = 0; i<s.length+1; i++, await delay(75))
           rainbow.innerText = s.substring(0, i);
        await delay(2000);
        for(let i = 0; i<s.length+1; i++, await delay(75))
            rainbow.innerText = s.substring(0, s.length+1-i);
        rainbow.innerText= "";
        rainbow.setAttribute("hidden", "");
    }
}
async function refreshList(){
    while (getEle("list").firstChild){
        getEle("list").removeChild(getEle("list").firstChild);
        }
    refreshFilters();
    const t = getEle("titleSearch").value.toLowerCase();
    const a = getEle("authorSearch").value.toLowerCase();
    for(let i = 0; i<bookarray.length; i++){
        let temp = getEle("booktemplate").content.cloneNode(true);
        const title = bookarray[i].title;
        const author = bookarray[i].author;
        const image = await fetchBookCover(title, author);
        
        // SEARCH BEGINS FIRST
        if(!(title.toLowerCase().includes(t,0)) && ("" != t)) continue;
        if(!(author.toLowerCase().includes(a,0)) && ("" !=a)) continue;

        // FILTERS BEGIN NEXT, BASED ON AN 'OR' CONDITION
        let isFiltered = true;
        for(let j = 0; j < filterarray.length; j++){
            if(filterarray[j] <= 4 && filterarray[j]+1 == bookarray[i].rating){ isFiltered = false;}
            else if(filterarray[j] > 4 && filterarray[j]<8 && filterarray[j]-5 == bookarray[i].status){ isFiltered = false; }
            else {
                // THIS IS AI GENERATED, CREDIT TO GPT
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
        temp.querySelector(".bookImage").src = image;
        temp.querySelector(".INTERNAL_ID").innerText = bookarray[i].ID;

        refreshStar(bookarray[i], temp);

        getEle("list").appendChild(temp);

    }
}
async function fetchBookCover(title, author){
    const placeholder = `book-cover-placeholder.png`;
    try{ // https://openlibrary.org/search.json?title=the+lord+of+the+rings&?author=Tolkien&limit=1
        // ?CATEGORY=Blah+blah+blah
        // &?CATEGORY=BLAH
        // &limit=x 
        // If I were to improve this, have an alternative where it searches up with solely ISBN.
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1`);
        if (!response.ok){
            return placeholder; // Can't reach openlibrary
        }
        const data = await response.json();

        if (data.docs.length > 0){
            const book = data.docs[0];
            return book.cover_i? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`: placeholder;
        } else{
            return placeholder;
        }
    } catch (error){
        return placeholder;
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
        bootstrap.Modal.getInstance(getEle("input")).hide();
        refreshList();
    } else {
        missing.removeAttribute("hidden");
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