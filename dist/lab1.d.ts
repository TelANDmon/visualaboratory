interface User {
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}
export declare function createUser(useriD: number, userName: string, isAct: boolean, email?: string): User;
type Genre = "fiction" | "non-fiction";
interface Book {
    title: string;
    author: string;
    year?: number;
    genre: Genre;
}
export declare function createBook(book: Book): Book;
export {};
//# sourceMappingURL=lab1.d.ts.map