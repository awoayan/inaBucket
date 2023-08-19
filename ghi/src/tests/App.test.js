import { renderHook } from '@testing-library/react'
import App from '../App'


global.fetch = jest.fn()

describe("HomePage", () => {
    it("should return initial values for mixedItems", async () => {
        const { result } = renderHook(() => HomePage())
    })
})