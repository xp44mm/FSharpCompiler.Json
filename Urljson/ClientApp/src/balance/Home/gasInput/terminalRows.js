import { b, button, td, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { setTerminalAnalysis } from '../../bindings/setTerminalAnalysis'
import { BalanceViewModel } from '../../model'

export const terminalRows = (balance = new BalanceViewModel()) => {
    let { terminal } = balance
    return [
        tr(
            td(b('入口烟气')),
            td(),
            td(),
            td(
                button('使用煤燃烧结果').subscribeEvent('click', _ => {
                    setTerminalAnalysis(balance)
                }),
            ),
        ),

        tr(
            td('H2O'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.H2O })
            ),
            td(),
        ),

        tr(
            td('O2'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.O2 })
            ),
            td(),
        ),

        tr(
            td('N2'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.N2 })
            ),
            td(),
        ),

        tr(
            td('CO2'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.CO2 })
            ),
            td(),
        ),

        tr(
            td('SO2'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.SO2 })
            ),
            td(),
        ),

        tr(
            td('SO3'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.SO3 })
            ),
            td(),
        ),

        tr(
            td('HCl'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.HCl })
            ),
            td(),
        ),

        tr(
            td('HF'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.HF })
            ),
            td(),
        ),

        tr(
            td('ash'),
            td('kg/hr'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.ash })
            ),
            td(),
        ),

        tr(
            td('出口烟气压力(g)'),
            td('Pa'),
            td({ className: 'text-right' },
                numberbox({ number: terminal.pressureg })
            ),
            td(),
        ),

    ]
}
