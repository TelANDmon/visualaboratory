
export function csvToJSON(input: string[], delimiter: string) : object[]{
    if(input.length < 2){
        throw new Error("Слишком мало строк")
    }
    const header = input[0].split(delimiter)
    const result : object[] = []
    for(let i = 1; i < input.length; i=i+1){
        const value = input[i].split(delimiter)
        if(value.length!=header.length){
            throw new Error("несовпадения кол-ва аргументов и параметров")
        }
        const obj : {[key:string]: string | number} = {};
        for(let j=0; j<header.length; j=j+1){
            if(value[j]===""){
                throw new Error("передача пустого значения")
            }
            obj[header[j]]=isNaN(Number(value[j])) ? value[j] : Number(value[j])
        }
        result.push(obj);
    }
    
    return result;
}

