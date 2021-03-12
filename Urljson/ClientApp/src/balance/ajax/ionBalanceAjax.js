import { combineLatest, NEVER, of } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
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

// from bindingIonBalance
export function ionBalanceAjax(balance = new BalanceViewModel()) {
    let {
        productA,
        dewatering,
        tower,
        wash,
        gypsumBleed,
        phof,
        phuf,
        vffeed,
        gypsum,
        filtrate,
        shff,
        shof,
        shuf,
        reclaimWater,
    } = balance

    let allow =
        combineLatest(dewatering.chlorideBleed, ready.react)
        |> map(([i, r]) => i == 'SH OF' && r)

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.ionBalance.next(false)))

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
            shuf: dewatering.secondHydrocyclone.underflow,
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
        sh: {
            'CaSO4*2H2O': dewatering.secondHydrocyclone['CaSO4*2H2O'],
            'CaSO3*(1/2)H2O': dewatering.secondHydrocyclone['CaSO3*(1/2)H2O'],
            CaCO3: dewatering.secondHydrocyclone.CaCO3,
            MgSO4: dewatering.secondHydrocyclone.MgSO4,
            MgCO3: dewatering.secondHydrocyclone.MgCO3,
            inerts: dewatering.secondHydrocyclone.inerts,
            solids: dewatering.secondHydrocyclone.solids,
        },
    }

    let result =
        Object.assign(
            Object.fromEntries([
                'gypsumBleed',
                'phof',
                'phuf',
                'vffeed',
                'gypsum',
                'filtrate',
                'shff',
                'shof',
                'shuf',
                'reclaimWater',
            ].map(prop => [prop, Object.fromEntries(liquidIngr.map(k => [k, balance[prop][k]]))])),
            { wash })

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.ionBalance.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/ionBalance?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> map(data => Deep.fromObject(data))
        |> map(deep => deep.intersect(resultDeep.keys))
        |> map(deep => {
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values)
            } else {
                console.error(deep.keys)
                return NEVER
            }
        })
        |> map(deep => deep.values)
        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready.ionBalance.next(true) }))

}
