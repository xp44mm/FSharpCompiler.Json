import { isEmptyData } from "./isEmpty"

test('is empty', () => {
    expect(isEmptyData(undefined)).toBe(true)
    expect(isEmptyData(null)).toBe(true)
    expect(isEmptyData([])).toBe(true)
    expect(isEmptyData({})).toBe(true)
    expect(isEmptyData("")).toBe(true)
    expect(isEmptyData(NaN)).toBe(true)
})

test('not empty', () => {
    expect(isEmptyData(0)).toBe(false)
    expect(isEmptyData(false)).toBe(false)

})

