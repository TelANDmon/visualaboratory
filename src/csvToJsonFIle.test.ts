import { describe, it, expect } from "vitest"
import {csvToJSON} from "./csvToJsonFile"

describe("проверка функции csvToJSON", () =>{
  it("проверка на корректность ввода", () => {
    let res = csvToJSON(["p1;p2;p3;p4", "1;A;b;c", "2;B;v;d"], ';')
    expect(res[0]).toEqual({p1:1,p2:"A",p3:"b",p4:"c"})
    expect(res[1]).toEqual({p1:2,p2:"B",p3:"v",p4:"d"})
  })
  it("некорректность ввода", () =>{
    expect(() => csvToJSON(["p1"], ";")).toThrow("Слишком мало строк")
    expect(() => csvToJSON(["p1;p2;p3", "1;", "2;B"], ';')).toThrow("несовпадения кол-ва аргументов и параметров");
    expect(() => csvToJSON(["p1;p2;p3", "1;A;b", "2;B;"], ';')).toThrow("передача пустого значения");
  })
})
