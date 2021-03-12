import { tilde, tildeKey } from './tilde'

describe('tilde test', () => {

    test('tilde empty', () => {
        let x = ''
        let y = tilde(x)
        expect(y).toEqual('~~')
    })

    test('tilde char', () => {
        let x = 'x'
        let y = tilde(x)
        expect(y).toEqual('~x~')
    })

    test('tilde tilde', () => {
        let x = '~'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', '~', '~'].join(''))
    })

    test('tilde backslash', () => {
        let x = '\\'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', '\\', '~'].join(''))
    })

    test('tilde b', () => {
        let x = '\b'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', 'b', '~'].join(''))
    })

    test('tilde f', () => {
        let x = '\f'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', 'f', '~'].join(''))
    })

    test('tilde n', () => {
        let x = '\n'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', 'n', '~'].join(''))
    })

    test('tilde r', () => {
        let x = '\r'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', 'r', '~'].join(''))
    })

    test('tilde t', () => {
        let x = '\t'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', 't', '~'].join(''))
    })

    test('tilde null char', () => {
        let x = '\0'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\', '0', '~'].join(''))
    })

    test('tilde Start of Heading', () => {
        let x = '\x01'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\x', '01', '~'].join(''))
    })

    test('tilde Unit Separator', () => {
        let x = '\x1f'
        let y = tilde(x)
        expect(y).toEqual(['~', '\\x', '1f', '~'].join(''))
    })


})

describe('tildeKey test', () => {

    test('tildeKey empty', () => {
        let x = ''
        let y = tildeKey(x)
        expect(y).toEqual('~~')
    })

    test('tildeKey char', () => {
        let x = 'x'
        let y = tildeKey(x)
        expect(y).toEqual('x')
    })

    test('tildeKey tilde', () => {
        let x = '~'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\', '~', '~'].join(''))
    })

    test('tildeKey backslash', () => {
        let x = '\\'
        let y = tildeKey(x)
        expect(y).toEqual('\\')
    })

    test('tildeKey b', () => {
        let x = '\b'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\', 'b', '~'].join(''))
    })

    test('tildeKey f', () => {
        let x = '\f'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\', 'f', '~'].join(''))
    })

    test('tildeKey n', () => {
        let x = '\n'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\', 'n', '~'].join(''))
    })

    test('tildeKey r', () => {
        let x = '\r'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\', 'r', '~'].join(''))
    })

    test('tildeKey t', () => {
        let x = '\t'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\', 't', '~'].join(''))
    })

    test('tildeKey null char', () => {
        let x = '\0'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\', '0', '~'].join(''))
    })

    test('tildeKey Start of Heading', () => {
        let x = '\x01'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\x', '01', '~'].join(''))
    })

    test('tildeKey Unit Separator', () => {
        let x = '\x1f'
        let y = tildeKey(x)
        expect(y).toEqual(['~', '\\x', '1f', '~'].join(''))
    })


})
