import { it, describe, expect } from 'vitest'
import { where, sort, groupBy, having, query, users, type User } from './main'

describe('query тест', () => {
  it('where', () => {
    const pipeline = query(
      where<User>()('surname', 'Doe')
    )

    const result = pipeline(users)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('NGG')
  })

  it('сортировка по возрасту', () => {
    const sortByAge = sort<User>()('age')
    const result = sortByAge(users)
    
    expect(result).toHaveLength(4)
    expect(result[0].age).toBe(31)
    expect(result[1].age).toBe(33)
    expect(result[2].age).toBe(33)
    expect(result[3].age).toBe(35)
  })

  it('where + groupBy', () => {
    const pipeline = query(
      where<User>()('surname', 'Doe'),
      groupBy<User>()('city')
    )

    const result = pipeline(users)
    expect(result).toHaveLength(1)
    expect(result[0].key).toBe('NY')
    expect(result[0].items).toHaveLength(1)
  })

  it('where + groupBy + having', () => {
    const pipeline = query(
      where<User>()('surname', 'Doe'),
      groupBy<User>()('city'),
      having<User>()(g => g.items.length > 0)
    )

    const result = pipeline(users)
    expect(result).toHaveLength(1)
    expect(result[0].key).toBe('NY')
  })

  it('groupBy + sort', () => {
    const pipeline = query(
      groupBy<User>()('city'),
      sort<{ key: string; items: User[] }>()('key')
    )

    const result = pipeline(users)
    expect(result).toHaveLength(2)
    expect(result[0].key).toBe('LA')
    expect(result[1].key).toBe('NY')
  })

  it('stage props', () => {
    const whereFn = where<User>()('name', 'NGG')
    const groupFn = groupBy<User>()('city')
    const havingFn = having<User>()(g => true)
    const sortFn = sort<User>()('age')

    expect((whereFn as any).stage).toBe('where')
    expect((groupFn as any).stage).toBe('groupBy')
    expect((havingFn as any).stage).toBe('having')
    expect((sortFn as any).stage).toBe('sort')
  })
})