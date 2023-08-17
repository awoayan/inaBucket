import { renderHook } from '@testing-library/react'
import HomePage from '../HomePage'


global.fetch = jest.fn()

describe("HomePage", () => {
    it("should return initial values for mixedItems", async () => {
        const { result } = renderHook(() => HomePage())
    })
})