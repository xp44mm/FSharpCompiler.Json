import { map } from 'rxjs/operators'
import { b, button, td, textNode, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'
import { BalanceViewModel } from '../../model'

export const gasParameterRows = (balance = new BalanceViewModel()) => {
    let { gasParameters, inletGasPressureg } = balance
    return [
        tr(td(b('入口烟气参数')), td(), td(), td()),

        tr(
            td('温度'),
            td('℃'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.temperature })
            ),
            td()
        ),

        tr(
            td('压力'),
            td('Pa'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.pressureg })
            ),
            td(
                button(
                    '设置为',
                    textNode(inletGasPressureg |> map(p => p.toFixed(1)))
                ).subscribeEvent('click', _ => {
                    gasParameters.pressureg.next(
                        inletGasPressureg.value
                    )
                }),
            )
        ),

        tr(
            td('基准含氧量'),
            td('vol. %'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.baseO2 })
            ),
            td()
        ),

        tr(td('污染物浓度：'), td(), td(), td()),

        tr(
            td('SO2'),
            td('mg/Nm3'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.concentration.SO2 })),
            td()
        ),

        tr(
            td('SO3'),
            td('mg/Nm3'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.concentration.SO3 })),
            td()
        ),
        tr(
            td('HCl'),
            td('mg/Nm3'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.concentration.HCl })),
            td()
        ),
        tr(
            td('HF'),
            td('mg/Nm3'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.concentration.HF })),
            td()
        ),

        tr(
            td('ash'),
            td('mg/Nm3'),
            td({ className: 'text-right' },
                numberbox({ number: gasParameters.concentration.ash })),
            td()
        ),
    ]
}
