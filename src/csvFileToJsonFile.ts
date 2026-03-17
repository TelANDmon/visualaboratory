import { csvToJSON } from "./csvToJsonFile.js";
import { readFile, writeFile }  from "node:fs/promises"

export async function formatCsvFileToJsonFile(input: string, output: string, delimiter: string): Promise<void> {
    try{
        if(!input || !output){
            throw new Error("ошибочка пустого значения")
        }
        const csvstring = await readFile(input,'utf-8')
        const rows = csvstring.trim().split('\n')
        const result = csvToJSON(rows,delimiter)
        await writeFile(output, JSON.stringify(result,null,2))
    }
    catch(error){
        if (error instanceof Error){
            if(error.message.includes("ENOENT")){
                throw new Error("ошибка чтения файла")
            }
            if(error.message.includes("EACESS")){
                throw new Error("ошибка на запись в файл")
            }
        }
        throw error;
    }
}



