function createUser(useriD, userName, email, isAct) {
    return { id: useriD, name: userName, email: email, isActive: isAct };
}
var user1 = createUser(10, "Bob", "bobemail", true);
var user2 = createUser(10, "ALBERT", "", false);
console.log(user1);
console.log(user2);
function createBook(book) {
    return book;
}
function printBook(book) {
    console.log("Title: ".concat(book.title));
    console.log("Author: ".concat(book.author));
    console.log("Year: ".concat(book.year));
    console.log("Genre: ".concat(book.genre));
}
var book1 = {
    title: "DOTA2LOR",
    author: "PIDIDI",
    genre: "non-fiction",
};
var book2 = {
    title: "IGRAVKALMARA",
    author: "nn",
    genre: "non-fiction",
    year: 2022,
};
console.log("book1");
printBook(book1);
console.log("book2");
printBook(book2);
function calculateArea(shape, param) {
    var _a, _b;
    if (shape == "circle") {
        var r = (_a = param.radius) !== null && _a !== void 0 ? _a : 0;
        return 3.14 * Math.pow(r, 2);
    }
    else {
        var a = (_b = param.side) !== null && _b !== void 0 ? _b : 0;
        return Math.pow(a, 2);
    }
}
console.log("круг");
console.log(calculateArea("circle", { radius: 10 }));
console.log("квадрат");
console.log(calculateArea("square", { side: 10 }));
function getStatusColor(Status) {
    if (Status == "active") {
        return "green";
    }
    if (Status == "inactive") {
        return "red";
    }
    else {
        return "seroburomalinoviy";
    }
}
console.log(getStatusColor("active"));
console.log(getStatusColor("inactive"));
console.log(getStatusColor("new"));
var upperFirst = function (value, uppercase) {
    var _a;
    if (uppercase === void 0) { uppercase = false; }
    if (!value) {
        return "";
    }
    var s = ((_a = value[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + value.slice(1);
    if (uppercase == true) {
        var s_1 = value.toUpperCase();
    }
    return s;
};
var spaceDelete = function (value, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    if (!value) {
        return "";
    }
    var s = value.trim();
    if (uppercase == true) {
        s = value.toUpperCase();
    }
    return s;
};
console.log(spaceDelete("chto pisat ", true));
console.log(upperFirst("chto pisat", false));
/////////////////////////////////////////////////////////////
function getFirstElement(arr) {
    return arr.length > 0 ? arr[0] : undefined;
}
var massive = ["victor", "page", "mina"];
var massive2 = [10, 15, 2000];
console.log(getFirstElement(massive));
console.log(getFirstElement(massive2));
var obj = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
];
function findById(items, id) {
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (item.id === id) {
            return item;
        }
    }
    return undefined;
}
console.log(findById(obj, 2));
