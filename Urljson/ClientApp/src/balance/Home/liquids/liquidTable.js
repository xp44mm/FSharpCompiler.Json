import { map } from 'rxjs/operators'
import { table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'

let liquidrows = [
    ['CaSO4*2H2O', 'kg/hr'],
    ['CaSO3*(1/2)H2O', 'kg/hr'],
    ['CaCO3', 'kg/hr'],
    ['MgSO4', 'kg/hr'],
    ['MgCO3', 'kg/hr'],
    ['inerts', 'kg/hr'],
    ['ash', 'kg/hr'],
    ['CaF2', 'kg/hr'],
    ['MgF2', 'kg/hr'],
    ['Cl-', 'kg/hr'],
    ['F-', 'kg/hr'],
    ['Mg++', 'kg/hr'],
    ['Ca++', 'kg/hr'],
    ['SO4--', 'kg/hr'],
    ['H2O', 'kg/hr'],
    ['tss', '待定'],
    ['tds', '待定'],
    ['fw', '待定'],
    ['tf', 'kg/hr'],
    ['solids', '%'],
    ['concCl', 'ppmwt'],
    ['sgSolution', '#'],
    ['sgSolid', '#'],
    ['sg', '待定'],
    ['density', 'kg/m3'],
    ['volume', 'm3/hr'],
]
export const liquidTable = (balance = new BalanceViewModel()) => {
    let {
        productA,
        limestone,
        gypsumBleed,
        phof,
        phuf,
        vffeed,
        gypsum,
        filtrate,
        shff,
        shof,
        shuf,
        bleed,
        reclaimWater,
        toprep,
    } = balance

    //有廢水站
    let sh$ =
        balance.dewatering.chlorideBleed
        |> map(
            chlorideBleed => (chlorideBleed === 'SH OF' ? 'table-cell' : 'none')
        )
    //無廢水站
    let nosh$ =
        balance.dewatering.chlorideBleed
        |> map(
            chlorideBleed => (chlorideBleed !== 'SH OF' ? 'table-cell' : 'none')
        )

    let allLiquids = [
        ['产物', productA, 'none'],
        ['石灰石', limestone.feed],
        ['石灰石浆液', limestone.slurry],
        ['浆液排出', gypsumBleed],
        ['石膏站顶流', phof],
        ['石膏站底流', phuf],
        ['过滤机供浆', vffeed],
        ['石膏', gypsum],
        ['滤液水', filtrate],
        ['废水站供浆', shff, sh$],
        ['废水站顶流', shof, sh$],
        ['废水站底流', shuf, sh$],
        ['废水排放', bleed, nosh$],
        ['回流水', reclaimWater],
        ['去制浆', toprep],
    ]

    return table(
        { className: 'table-sm table-bordered table-hover' },
        thead(
            tr(
                th('名称'),
                th('单位'),

                ...allLiquids.map(([name, , disp]) =>
                    th(disp ? { 'style.display': disp } : {}, name)
                )
            )
        ),
        tbody(
            liquidrows.map(([t, u]) =>
                tr(
                    th(t),
                    td(u),
                    ...allLiquids.map(([, liquid, disp]) =>
                        td(
                            disp ? { 'style.display': disp, className: 'text-right' } : { className: 'text-right' },
                            textNode(
                                liquid[t]
                                |> map(x => typeof x === 'number' ? x.toFixed(2) : x)

                            )
                        )
                    )
                )
            )
        )
    )
}
