import type { DeepReadonly, PickedByType, EventHandlers } from './main'
import { it, describe, expectTypeOf } from 'vitest'

describe('тесты для типов', () => {
    it('DeepReadonly', () => {
        type User = {
            name: string
            address: {
                city: string
                id: number
            }
        }
        expectTypeOf<DeepReadonly<User>>().toEqualTypeOf<{
            readonly name: string
            readonly address: {
                readonly city: string
                readonly id: number
            }
        }>()
    })

    it('PickedByType', () => {
        type User2 = {
            name: string
            surname: string
            age: number
            F: boolean
        }
        expectTypeOf<PickedByType<User2, string>>().toEqualTypeOf<{
            name:string
            surname: string
        }>()
        expectTypeOf<PickedByType<User2, number>>().toEqualTypeOf<{
            age: number
        }>()
        expectTypeOf<PickedByType<User2, boolean>>().toEqualTypeOf<{
            F: boolean
        }>()
    })

    it('EventHandlers', () => {
        type Events = {
            click: {x: number; y: number}
            change: string
            submit: boolean
        }
        expectTypeOf<EventHandlers<Events>>().toEqualTypeOf<{
            onClick?: (event: {x: number; y: number}) => void
            onChange?: (event: string) => void
            onSubmit?: (event: boolean) => void
        }>()
    }
)})