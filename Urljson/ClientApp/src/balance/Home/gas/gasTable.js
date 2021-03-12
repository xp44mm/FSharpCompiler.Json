import { map } from 'rxjs/operators'
import { table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'

let gasunit = {
    H2O: 'kg/hr',
    O2: 'kg/hr',
    N2: 'kg/hr',
    CO2: 'kg/hr',
    SO2: 'kg/hr',
    SO3: 'kg/hr',
    HCl: 'kg/hr',
    HF: 'kg/hr',
    ash: 'kg/hr',
    temperature: '℃',
    pressureg: 'Pa',
    pressure: 'Pa',
    dnvolume: 'Nm3/hr',
    nvolume: 'Nm3/hr',
    dvolume: 'm3/hr',
    volume: 'm3/hr',
}

export const gasTable = (balance = new BalanceViewModel()) => {
    let { oxiair, hasGGH, ggh, absorber, removal } = balance

    let props = {
        'style.display':
            balance.hasGGH
            |> map(hasGGH => (hasGGH ? 'table-cell' : 'none')),
    }

    let data = [
        ['GGH入口', ggh.inlet, props],
        ['吸收塔入口', absorber.inlet],
        ['吸收塔出口', absorber.outlet],
        ['脱除', removal],
        ['GGH出口', ggh.outlet, props],
        ['供给氧化空气', oxiair.feed],
        ['压缩氧化空气', oxiair.compress],
        ['饱和氧化空气', oxiair.satur],
        ['GGH吹扫', ggh.sootblow, props],
    ]

    let root = table(
        { className: 'table-sm table-bordered table-hover' },
        thead(
            tr(
                th('名稱'),
                th('單位'),
                ...data.map(([name, , props]) => th({ ...props }, name))
            )
        ),
        tbody(
            Object.entries(gasunit).map(([t, u]) =>
                tr(
                    th(t),
                    td(u),
                    ...data.map(([, gas, props]) =>
                        td({
                            ...props,
                            className: 'text-right',
                        }, textNode(
                            gas[t]
                                ? gas[t] |> map(x => typeof x === 'number' ? x.toFixed(2) : x)
                                : gas[t]
                        ))
                    )
                )
            )
        )
    )
    return root
}
