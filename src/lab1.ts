 interface User{
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

export function createUser(useriD: number, userName: string, isAct:boolean, email?: string): User{
    return{id: useriD, name: userName, email: email, isActive: isAct}
}

let user1 = createUser(10,"Bob",true,"bobemail");
let user2= createUser(10,"ALBERT",false,"");

console.log(user1);
console.log(user2);


///////////////////////////////////////////////////////////

type Genre = "fiction" | "non-fiction";
export interface Book{
    title: string;
    author: string;
    year?: number;
    genre: Genre;

}

export function createBook(book: Book): Book{
    return book;
}


export function printBook(book: Book) : void {
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

const knizka1 = createBook(book1);
console.log("hz");
printBook(knizka1);

console.log("book2");
printBook(book2);

////////////////////////////////////////////////////////////////

export function calculateArea(shape: "circle", param: {radius?:number}) : number;
export function calculateArea(shape : "square", param: {side?:number}): number;

export function calculateArea(shape: "circle" | "square", param:{ radius?: number; side?: number}) :number{
    if (shape === "circle"){
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


export type Status = "active" | "inactive" | "new";

export function getStatusColor(Status: Status): string{
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

export type StringFormatter = (value: string, uppercase?: boolean) =>string;
export const upperFirst: StringFormatter = (value, uppercase = false) => {
    if(!value){
        return ""; 
    }

    let s = value[0]?.toUpperCase()+value.slice(1);
    if(uppercase==true){
       s = value.toUpperCase();
    }
    return s;
}

export const spaceDelete: StringFormatter = (value, uppercase = false) => {
    if(!value){
        return "";
    }

    let s = value.trim();

    if(uppercase == true){
         s = s.toUpperCase();
    }
    return s;
}

let stroka1 = "     chto pisat"
let stroka2 = "ya ne znayu"

console.log(spaceDelete(stroka1,true));
console.log(upperFirst(stroka2, true));


/////////////////////////////////////////////////////////////


export function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length>0 ? arr[0] : undefined;
}

let massive: string[] = ["victor", "page", "mina"];
let massive2: number[] = [10,15,2000];
console.log(getFirstElement(massive));
console.log(getFirstElement(massive2));

////////////////////////////////////////////////////////////////////

export interface HasId{
    id: number;
}

let obj: HasId[] = [
    {id: 1},
    {id: 2},
    {id: 3}
]


export function findById<T extends HasId>(items: T[], id: number): T | undefined{
    for(const item of items){
        if(item.id === id){
            return item;
        }
    }
    return undefined;
}

console.log(findById(obj,2));


