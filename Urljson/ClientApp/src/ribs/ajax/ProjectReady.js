import { BehaviorSubject } from 'rxjs'

export const projectReady = {
    ribs: new WeakMap()
}

const wallLoadReady = () => ({
    plateStress: new BehaviorSubject(false),
    plateDeflection: new BehaviorSubject(false),
    fixedDeflection: new BehaviorSubject(false),
    fixedStress: new BehaviorSubject(false),
    pinnedStress: new BehaviorSubject(false),
    pinnedDeflection: new BehaviorSubject(false),
})

const wallReady = () => ({
    combSection: new BehaviorSubject(false),
    plateFreq: new BehaviorSubject(false),
    ribStable: new BehaviorSubject(false),
    fixedBeta: new BehaviorSubject(false),
    fixedFreq: new BehaviorSubject(false),
    pinnedFreq: new BehaviorSubject(false),

    barotropy: wallLoadReady(),
    vaccum: wallLoadReady(),
})

export function createRibReady() {

    return {
        windElevCoeff: new BehaviorSubject(false),

        pipeMaterial: {
            steelProperty: new BehaviorSubject(false)
        },

        ribMaterial: {
            steelProperty: new BehaviorSubject(false)
        },

        insulationWeight: new BehaviorSubject(false),

        latitude: {
            pipe: {
                buckling: new BehaviorSubject(false),
            },
        },

        longitude: {
            pipe: {
                buckling: new BehaviorSubject(false),
            },
        },

        horizon: {
            top: wallReady(),
            bottom: wallReady(),
            side: wallReady(),
        },

        vertical: {
            sidea: wallReady(),
            sideb: wallReady(),
        },

    }
}

