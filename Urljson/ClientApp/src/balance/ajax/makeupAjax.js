import { combineLatest, of } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

// rename from bindingMakeup
export function makeupAjax(balance = new BalanceViewModel()) {
    let {
        terminal,
        oxiair,
        hasGGH,
        ggh,
        limestone,
        removal,
        absorber,
        gypsum,
        dewatering: { chlorideBleed },
        shof,
        bleed,
        makeup,
    } = balance

    //实际可以与`absorberWithUnderspray`||`gypsumBleed`同时发出请求。
    let allow =
        combineLatest(ready.absorberWithUnderspray, ready.gypsumBleed)
        |> map(([dp, gb]) => dp && gb)

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.makeup.next(false)))

    let branchCl = ing =>
        combineLatest(chlorideBleed, bleed[ing], shof[ing])
        |> map(([c, b, s]) => {
            switch (c) {
                case 'PH OF':
                    return b
                case 'SH OF':
                    return s
                default:
                    //'Filtrate':检查循环表
                    return b
            }
        })

    let input = {
        gasInlet: terminal.H2O,
        oxifeed: oxiair.feed.H2O,
        sootblow:
            combineLatest(hasGGH, ggh.sootblow.H2O)
            |> map(([ggh, sootblow]) => ggh ? sootblow : 0),
        limestone: limestone.feed.H2O,
        removal: removal.H2O,
        gasOutlet:
            combineLatest(hasGGH, ggh.outlet.H2O, absorber.outlet.H2O)
            |> map(([ggh, w, z]) => ggh ? w : z),

        gypsum: {
            H2O: gypsum.H2O,
            'CaSO4*2H2O': gypsum['CaSO4*2H2O'],
            'CaSO3*(1/2)H2O': gypsum['CaSO3*(1/2)H2O'],
        },

        cl: {
            H2O: branchCl('H2O'),
            'CaSO4*2H2O': branchCl('CaSO4*2H2O'),
            'CaSO3*(1/2)H2O': branchCl('CaSO3*(1/2)H2O'),
        },
    }

    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.makeup.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/makeup?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => { makeup.next(data) })
        |> (o => o.subscribe(() => ready.makeup.next(true)))
}
