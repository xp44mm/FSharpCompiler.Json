import { combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

let sections = {
    rectangle: shape => combineLatest(shape.rectangle.width, shape.rectangle.height) |> map(([w, h]) => `${w}×${h}m`),
    circle: shape => shape.circle.diameter |> map(d => `Φ${d}m`),
}

//荷载参数
let loadFunctions = {
    duct: function(load) {
        let { section, wall, length, fullness, inclination, ashDensity } = load.duct

        let result =
            section.kind
            |> mergeMap(kind => {
                let dimension$ = sections[kind](section)
                return combineLatest(dimension$, length) |> map(([d, l]) => `${d}, L=${l}m`)
            })

        return result
    },

    damper: function(load) {
        let { section, wall } = load.damper
        return (
            section.kind
            |> mergeMap(kind => {
                return sections[kind](section)
            })
        )
    },

    expansion: function(load) {
        let { section, pressure, inclination, direction } = load.expansion

        let result =
            section.kind
            |> mergeMap(kind => {
                let dimension$ = sections[kind](section)
                return combineLatest(dimension$, pressure) |> map(([d, p]) => `${d}, ${p}kPa`)
            })
        return result
    },
}

export const sectionRepr = load => load.kind |> mergeMap(kind => loadFunctions[kind](load))
