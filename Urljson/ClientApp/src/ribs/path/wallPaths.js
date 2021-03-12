import { loads } from './keys'

export const wallPaths = [
    ['horizon', 'top'],
    ['horizon', 'bottom'],
    ['horizon', 'side'],
    ['vertical', 'sidea'],
    ['vertical', 'sideb'],
]

export const wallLoadPaths = wallPaths
    .map(path => loads.map(l => [...path, l]))
    .reduce((a, b) => [...a, ...b])

