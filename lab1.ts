interface User{
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

function createUser(useriD: number, userName: string, email: string, isAct:boolean): User{
    return{id: useriD, name: userName, email: email, isActive: isAct}
}

let user1 = createUser(10,"Bob","bobemail",true);
let user2= createUser(10,"ALBERT","",false);

console.log(user1);
console.log(user2);


///////////////////////////////////////////////////////////

type Genre = "fiction" | "non-fiction";
interface Book{
    title: string;
    author: string;
    year?: number;
    genre: Genre;

}

function createBook(book: Book): Book{
    return book;
}


function printBook(book: Book) : void {
    console.log(`Title: ${book.title}`);
    console.log(`Author: ${book.author}`);
    console.log(`Year: ${book.year}`);
    console.log(`Genre: ${book.genre}`);
}

let book1: Book = {
    title: "DOTA2LOR",
    author: "PIDIDI",
    genre: "non-fiction",
};

let book2: Book = {
    title: "IGRAVKALMARA",
    author: "nn",
    genre: "non-fiction",
    year: 2022,
}

console.log("book1");
printBook(book1);

console.log("book2");
printBook(book2);

////////////////////////////////////////////////////////////////

function calculateArea(shape: "circle", param: {radius:number}) : number;
function calculateArea(shape : "square", param: {side:number}): number;

function calculateArea(shape: "circle" | "square", param:{ radius?: number; side?: number}) :number{
    if (shape == "circle"){
        const r = param.radius?? 0;
        return 3.14 * r**2;
    }
    else{
        const a = param.side?? 0;
        return a**2;
    }
}

console.log("круг");
console.log(calculateArea("circle",{radius: 10}));
console.log("квадрат");
console.log(calculateArea("square",{side: 10}));


/////////////////////////////////////////////////////////////////////////////


type Status = "active" | "inactive" | "new";

function getStatusColor(Status: Status): string{
    if(Status == "active"){
        return "green";
    }
    if(Status == "inactive"){
        return "red";
    }
    else{
        return "seroburomalinoviy";
    }
}

console.log(getStatusColor("active"));
console.log(getStatusColor("inactive"));
console.log(getStatusColor("new"));


///////////////////////////////////////////////////////////////////////////////////////

type StringFormatter = (value: string, uppercase?: boolean) =>string;
const upperFirst: StringFormatter = (value, uppercase = false) => {
    if(!value){
        return ""; 
    }

    let s = value[0]?.toUpperCase()+value.slice(1);
    if(uppercase==true){
        let s = value.toUpperCase();
    }
    return s;
}

const spaceDelete: StringFormatter = (value, uppercase = false) => {
    if(!value){
        return "";
    }

    let s = value.trim();

    if(uppercase == true){
         s = value.toUpperCase();
    }
    return s;
}

console.log(spaceDelete("chto pisat ",true));
console.log(upperFirst("chto pisat",false));


/////////////////////////////////////////////////////////////


function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length>0 ? arr[0] : undefined;
}

let massive: string[] = ["victor", "page", "mina"];
let massive2: number[] = [10,15,2000];
console.log(getFirstElement(massive));
console.log(getFirstElement(massive2));

////////////////////////////////////////////////////////////////////

interface HasId{
    id: number;
}

let obj: HasId[] = [
    {id: 1},
    {id: 2},
    {id: 3}
]


function findById<T extends HasId>(items: T[], id: number): T | undefined{
    for(const item of items){
        if(item.id === id){
            return item;
        }
    }
    return undefined;
}

console.log(findById(obj,2));
