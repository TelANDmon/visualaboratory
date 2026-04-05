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

type WhereStage = { stage: "where" }
type GroupByStage = { stage: "groupBy" }
type HavingStage = { stage: "having" }
type SortStage = { stage: "sort" }

type Stage = "where" | "groupBy" | "having" | "sort"
type Step = ((data: any) => any) & { stage: Stage }

export type Transform<T> = (data: T[]) => T[]

export type Where<T> = <K extends keyof T>(
  key: K,
  value: T[K]
) => Transform<T> & WhereStage

export const where = <T>(): Where<T> =>
  <K extends keyof T>(key: K, value: T[K]): Transform<T> & WhereStage => {
    const fn = (data: T[]) => data.filter((item) => item[key] === value);
    (fn as Transform<T> & WhereStage).stage = "where"
    return fn as Transform<T> & WhereStage
  }

export type Sort<T> = <K extends keyof T>(key: K) => Transform<T> & SortStage

export const sort = <T>(): Sort<T> => <K extends keyof T>(key: K): Transform<T> & SortStage => {
    const fn = (data: T[]) =>
      [...data].sort((a, b) => {
        const av = a[key]
        const bv = b[key]
        if (av < bv) return -1
        if (av > bv) return 1
        return 0
      });

    (fn as Transform<T> & SortStage).stage = "sort"
    return fn as Transform<T> & SortStage
  }

export type Group<T, K extends keyof T> = {
  key: T[K]
  items: T[]
}

export type GroupBy<T> = <K extends keyof T>(
  key: K) => ((data: T[]) => Group<T, K>[]) & GroupByStage

export function groupBy<T>(): GroupBy<T> {
  return function <K extends keyof T>(key: K) {
    const fn = (data: T[]): Group<T, K>[] => {
      const map = new Map<T[K], Group<T, K>>()

      for (const item of data) {
        const val = item[key]
        let group = map.get(val)

        if (!group) {
          group = { key: val, items: [] }
          map.set(val, group)
        }

        group.items.push(item)
      }

      return Array.from(map.values())
    };

    (fn as ((data: T[]) => Group<T, K>[]) & GroupByStage).stage = "groupBy"
    return fn as ((data: T[]) => Group<T, K>[]) & GroupByStage
  };
}

export type GroupTransform<T, K extends keyof T> =
  (groups: Group<T, K>[]) => Group<T, K>[]

export type Having<T> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean) => GroupTransform<T, K> & HavingStage

export function having<T>(): Having<T> {
  return function <K extends keyof T>(
    predicate: (group: Group<T, K>) => boolean): GroupTransform<T, K> & HavingStage {
    const fn = (groups: Group<T, K>[]) => groups.filter(predicate);

    (fn as GroupTransform<T, K> & HavingStage).stage = "having"
    return fn as GroupTransform<T, K> & HavingStage
  }
}

type NextStages<Prev extends Stage | ""> =
  Prev extends "" ? "where" | "groupBy" :
  Prev extends "where" ? "where" | "groupBy" :
  Prev extends "groupBy" ? "having" | "sort" :
  Prev extends "having" ? "sort" :
  Prev extends "sort" ? "sort" :
  never

type ValidateStages<T extends readonly Step[], Prev extends Stage | "" = ""> =
  T extends readonly [infer First, ...infer Rest]
    ? First extends Step
      ? First["stage"] extends NextStages<Prev>
        ? Rest extends readonly Step[]
          ? ValidateStages<Rest, First["stage"]>
          : never
        : never
      : never
    : T

export type ValidateOrder<T extends readonly Step[]> =
  ValidateStages<T> extends never ? never : T

export function query<const TSteps extends readonly Step[]>(
  ...steps: ValidateOrder<TSteps>
) {
  return (initialData: any[]) => (steps as readonly Step[]).reduce((currentData, step) => step(currentData), initialData)
}
