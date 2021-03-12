export function getDimensionName(wallName) {
    if (wallName === 'top' ||
        wallName === 'bottom' ||
        wallName === 'sidea'
    ) { return 'latitude' }
    if (wallName === 'side' ||
        wallName === 'sideb'
    ) { return 'longitude' }
}
