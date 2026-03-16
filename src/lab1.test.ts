import {describe, it ,expect } from "vitest";
import { createUser, createBook, calculateArea, getStatusColor, upperFirst, spaceDelete, getFirstElement, findById  } from "./lab1.js";

describe("user function", () => {
    it("должен запонлить карточку юзера", () =>{
        expect(createUser(10,"Artyom",true)).toEqual({id: 10, name: "Artyom", email: undefined, isActive: true});
});
it("должен создавать юзера с email", () => {
    expect(createUser(52,"АлександрNGG",true,"friendlythugg52")).toEqual({id:52,name: 'АлександрNGG',email:"friendlythugg52",isActive:true});
});
})

describe("создание книги", () => {
    it("должна создаться карточка книги и вывестись", () => {
        const exampebook = {
            title: "IAHZ",
            author: "ARTYOM",
            genre: "non-fiction" as const,
            year: 2006,
        };
        const result = createBook(exampebook)
        expect(result).toEqual({title:"IAHZ",author: "ARTYOM", genre:"non-fiction", year: 2006});
        });
})

describe("создать круг или квадрат и высчитать площадь", () => {
    it("должен запонить круг", () => {
        const area = calculateArea("circle",{radius: 52})
        const Scircle = 3.14*52**2;
        expect(area).toBeCloseTo(Scircle,2);
    });
    it("должен высчитать квадрат", () => {
        const area = calculateArea("square",{side: 52})
        const SquareS = 52**2;
        expect(area).toBeCloseTo(SquareS,2);
    })
    it("нулевое значение", () => {
        const area = calculateArea("circle",{})
        expect(area).toBe(0)
    })
})

describe("проверка активности", () => {
    it("active", () => {
        expect(getStatusColor("active")).toEqual("green")
    })
    it("inactive", () => {
        expect(getStatusColor("inactive")).toEqual("red")
    })
    it("new", () => {
        expect(getStatusColor("new")).toEqual("seroburomalinoviy")
    })
})

describe("проверка функций строк(удаление пробелов и перевод встрочный формат", () => {
    it("Upper", () => {
        expect(upperFirst("pididi not epstein",true)).toBe("PIDIDI NOT EPSTEIN")
    })
    it("SpaceDelete", () => {
        expect(spaceDelete("              nepon",false)).toBe("nepon")
    })
    it("проверка на пустое", () => {
        expect(spaceDelete("",false)).toBe("")
        expect(upperFirst("",false)).toBe("")
    })
})

describe("проверка вывода первого элемента массива", () => {
    it("проверка на словах", () => {
        let stringarray: string [] = ["mina","yamato","pudge"]
        expect(getFirstElement(stringarray)).toBe("mina")
    })
    it("проверка на числах", () => {
        let numberarray: number [] = [1,2,3];
        expect(getFirstElement(numberarray))
    })
})

describe("проверка нахождения элемента по id", () => {
    interface HasId {
        id: number;
    }
    let obj: HasId[] = [
         {id: 1},
        {id: 2}
    ]
    it("проверка id", () => {
        let obj: HasId[] = [
            {id: 1},
            {id: 2}
        ]
        expect(findById(obj,1)).toStrictEqual({id: 1})
    })
    it("проверка с ненормальным id", () => {
        expect(findById(obj,52)).toBeUndefined
    })
})
