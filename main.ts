import { csvToJSON } from "./csvToJsonFile.js";
import { formatCsvFileToJsonFile } from "./csvFileToJsonFile.js";
import { log } from "node:console";

let res = csvToJSON(["p1;p2;p3;p4", "1;A;b;c", "2;B;v;d"], ';');
console.log(res)

formatCsvFileToJsonFile('new.csv','new.json',";")