export const fixedPaths = [
    ['fixedHorizon', 'bottom'],
    ['fixedHorizon', 'side'],
    ['fixedHorizon', 'top'],
    ['verticalFixed', 'sidea'],
    ['verticalFixed', 'sideb'],
]

export const pinnedPaths = [
    ['horizonPinned', 'bottom'],
    ['horizonPinned', 'side'],
    ['horizonPinned', 'top'],
    ['verticalPinned', 'sidea'],
    ['verticalPinned', 'sideb'],
]

export const horizonPaths = [
    ['fixedHorizon', 'bottom'],
    ['fixedHorizon', 'side'],
    ['fixedHorizon', 'top'],
    ['horizonPinned', 'bottom'],
    ['horizonPinned', 'side'],
    ['horizonPinned', 'top'],
]

export const verticalPaths = [
    ['verticalFixed', 'sidea'],
    ['verticalFixed', 'sideb'],
    ['verticalPinned', 'sidea'],
    ['verticalPinned', 'sideb'],
]

export const wallPaths = [...fixedPaths, ...pinnedPaths]

