import { combineLatest, NEVER, of } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { pickObject } from '../../pickObject'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

let liquidIngr = [
    'CaSO4*2H2O',
    'CaSO3*(1/2)H2O',
    'CaCO3',
    'MgSO4',
    'MgCO3',
    'inerts',
    'ash',
    'CaF2',
    'MgF2',
    'Cl-',
    'F-',
    'Mg++',
    'Ca++',
    'SO4--',
    'H2O',
]

// from bindingPhofChlorideBleed
export function phofChlorideBleedAjax(balance = new BalanceViewModel()) {
    let {
        productA,
        tower,
        dewatering,
        gypsumBleed,
        phof,
        phuf,
        vffeed,
        gypsum,
        filtrate,
        bleed,
        reclaimWater,
        wash,
    } = balance

    let allow =
        combineLatest(dewatering.chlorideBleed, ready.react)
        |> map(([i, r]) => i == 'PH OF' && r)

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.phofChlorideBleed.next(false)))

    let input = {
        productA: {
            'CaSO4*2H2O': productA['CaSO4*2H2O'],
            'CaSO3*(1/2)H2O': productA['CaSO3*(1/2)H2O'],
            CaCO3: productA.CaCO3,
            MgSO4: productA.MgSO4,
            MgCO3: productA.MgCO3,
            inerts: productA.inerts,
            ash: productA.ash,
            CaF2: productA.CaF2,
            MgF2: productA.MgF2,
            'Cl-': productA['Cl-'],
            'F-': productA['F-'],
            'Mg++': productA['Mg++'],
            'Ca++': productA['Ca++'],
            'SO4--': productA['SO4--'],
        },
        opt: {
            ext: of('Primary + Secondary'),
            phof: dewatering.primaryHydrocyclone.overflow,
            bleed: dewatering.chlorideBleed,
            solids: tower.solids,
            concCl: tower.concCl,
        },
        ph: {
            'CaSO4*2H2O': dewatering.primaryHydrocyclone['CaSO4*2H2O'],
            'CaSO3*(1/2)H2O': dewatering.primaryHydrocyclone['CaSO3*(1/2)H2O'],
            CaCO3: dewatering.primaryHydrocyclone.CaCO3,
            MgSO4: dewatering.primaryHydrocyclone.MgSO4,
            MgCO3: dewatering.primaryHydrocyclone.MgCO3,
            inerts: dewatering.primaryHydrocyclone.inerts,
            solids: dewatering.primaryHydrocyclone.solids,
        },
        vf: {
            'CaSO4*2H2O': dewatering.vacuumFilter['CaSO4*2H2O'],
            'CaSO3*(1/2)H2O': dewatering.vacuumFilter['CaSO3*(1/2)H2O'],
            CaCO3: dewatering.vacuumFilter.CaCO3,
            MgSO4: dewatering.vacuumFilter.MgSO4,
            MgCO3: dewatering.vacuumFilter.MgCO3,
            inerts: dewatering.vacuumFilter.inerts,
            ash: dewatering.vacuumFilter.ash,
            CaF2: dewatering.vacuumFilter.CaF2,
            MgF2: dewatering.vacuumFilter.MgF2,
            solids: dewatering.vacuumFilter.solids,
            concCl: dewatering.vacuumFilter.concCl,
        },
    }

    let result = {
        gypsumBleed: pickObject(gypsumBleed, liquidIngr),
        phof: pickObject(phof, liquidIngr),
        phuf: pickObject(phuf, liquidIngr),
        vffeed: pickObject(vffeed, liquidIngr),
        gypsum: pickObject(gypsum, liquidIngr),
        filtrate: pickObject(filtrate, liquidIngr),
        bleed: pickObject(bleed, liquidIngr),
        reclaimWater: pickObject(reclaimWater, liquidIngr),
        wash,
    }
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.phofChlorideBleed.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/phofChlorideBleed?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> map(data => Deep.fromObject(data))
        |> map(deep => deep.intersect(resultDeep.keys))
        |> map(deep => {
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values)
            } else {
                console.error(deep.keys)
                //return NEVER
            }
        })
        |> map(deep => deep.values)
        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready.phofChlorideBleed.next(true) }))

}
