export type User = {
    id: number;
    name: string;
    surname: string;
    age: number;
    city: string;
}


export const users: User[] = [
    { id: 1, name: "NGG", surname: "Doe", age: 33, city: "NY" },
    { id: 2, name: "Bigbabytape", surname: "Tatwole", age: 33, city: "NY" },
    { id: 3, name: "Kizaru", surname: "ZOLO", age: 35, city: "LA" },
    { id: 4, name: "NGG", surname: "ZOLO", age: 31, city: "LA" },
]

export type Transform<T> = (data: T[]) => T[];

export function query<T>(...steps: Function[]) {
    return (initialData: T[]): any => {
        return steps.reduce((currentData, step) => step(currentData), initialData);
    };
}

export type Where<T> = <K extends keyof T> (
    key: K,
    value: T[K]
) => Transform<T>

export const where = <T>(): Where<T> =>
  <K extends keyof T>(key: K, value: T[K]): Transform<T> =>
  (data: T[]) =>
    data.filter((item) => item[key] === value);


export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>

export const sort = <T>(): Sort<T> =>
  <K extends keyof T>(key: K): Transform<T> =>
  (data: T[]) =>
    [...data].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });


const search = query<User>(
    where<User>()("name","NGG"),
    where<User>()("surname","Doe"),
    sort<User>()("age"),
)   

const res = search(users)
console.log(res)


export type Group<T, K extends keyof T> = {
    key: T[K]
    items: T[]
}

export type GroupBy<T> = <K extends keyof T>(key: K) => (data: T[]) => Group<T, K>[];

export function groupBy<T>(): GroupBy<T> {
    return function<K extends keyof T>(key: K) {
        return (data: T[]): Group<T, K>[] => {
            const map = new Map<T[K], Group<T, K>>()

            for (const item of data){
                const val = item[key]
                let group = map.get(val)
                if (!group){
                    group = {key:val, items: []}
                    map.set(val,group)
                }
                group.items.push(item)
                }
                return Array.from(map.values())
            };
        }
}

export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[]

export type Having<T> = <K extends keyof T>(predicate: (group: Group<T, K>) => boolean) => GroupTransform<T, K>

export function having<T>(): Having<T> {
    return function<K extends keyof T>(
        predicate: (group: Group<T,K>)=> boolean): GroupTransform<T,K>{
            return (groups: Group<T,K>[]) => groups.filter(predicate)
        }
}

const groupByCity = groupBy<User>()("city");
const groups = groupByCity(users); 

const pipeline = query<User>(
  where<User>()("surname", "Doe"),
  groupBy<User>()("city"),
  having<User>()(group => group.items.length > 1),
);

const result = pipeline(users)

console.log(result)
