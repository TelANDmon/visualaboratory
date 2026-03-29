    import {it,describe,expect} from "vitest"
    import { where, sort, groupBy, having, query, users, User } from "./main"

    describe('query types', () => {
        describe('types', () => {
            it('where filter', () => {
                const filterNGG = where<User>()("name", "NGG");
                const result = filterNGG(users);
                expect(result).toHaveLength(2);
                expect(result.every(user => user.name === "NGG")).toBe(true);
            });

            it('sort users by age', () => {
                const sortByAge = sort<User>()("age");
                const result = sortByAge(users);
                expect(result.map(users=>users.age)).toEqual([31,33,33,35])
            });

            it('groupBy city', () => {
                const groupByCity = groupBy<User>()("city");
                const result = groupByCity(users);

                expect(result).toHaveLength(2);

                const nyGroup = result.find(group => group.key === "NY");
                const laGroup = result.find(group => group.key === "LA");
                expect(nyGroup?.items).toHaveLength(2);
                expect(laGroup?.items).toHaveLength(2);
            });

            it('having', () => {
                const groups = groupBy<User>()("city")(users);
                const filterGroups = having<User>()(
                group => group.items.some(user => user.age > 34));
                const result = filterGroups(groups);

                expect(result).toHaveLength(1);
                expect(result[0].key).toBe("LA");
            });
        });

        describe('query', () => {
            it('where and sort', () => {
                const pipeline = query<User>(
                    where<User>()("surname", "ZOLO"),
                    sort<User>()("age")
                );

                const result = pipeline(users);

                expect(result).toHaveLength(2);
                expect(result[0].name).toBe("NGG");
                expect(result[1].name).toBe("Kizaru");
            });

            it('where groupBy having', () => {
                const pipeline = query<User>(
                    where<User>()("surname", "ZOLO"),
                    groupBy<User>()("city"),
                    having<User>()(group => group.items.length > 1)
                );

                const result = pipeline(users);

                expect(result).toHaveLength(1);
                expect(result[0].key).toBe("LA");
                expect(result[0].items).toHaveLength(2);
            });

            it('return empty', () => {
                const pipeline = query<User>(
                    where<User>()("name", "NonExistent")
                );

                expect(pipeline(users)).toEqual([]);
            });
        });
    });