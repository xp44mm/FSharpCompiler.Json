
function getNeigbors(wallName) {
    if (wallName === 'top' || wallName === 'bottom') { return 'side' }
    if (wallName === 'side') { return ['bottom', 'top'] }
    if (wallName === 'sidea') { return 'sideb' }
    if (wallName === 'sideb') { return 'sidea' }
}
