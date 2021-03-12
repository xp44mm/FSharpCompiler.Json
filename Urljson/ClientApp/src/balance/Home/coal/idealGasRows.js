import { b, button, td, textNode, tr } from '../../../hyperscript'
import { changeCoalS } from '../../bindings/changeCoalS'
import { BalanceViewModel } from '../../model'

export const idealGasRows = (balance = new BalanceViewModel()) => {
   let {
      gasParameters,
      combustion: { idealGas },
   } = balance

   return [
      tr(td(b('理论烟气量')), td(), td(), td('100kg燃料')),

      tr(td('H2O'), td('kmol'), td({ className: 'text-right' }, textNode(idealGas.H2O)), td()),

      tr(td('O2'), td('kmol'), td({ className: 'text-right' }, textNode(idealGas.O2)), td()),

      tr(td('N2'), td('kmol'), td({ className: 'text-right' }, textNode(idealGas.N2)), td()),

      tr(td('CO2'), td('kmol'), td({ className: 'text-right' }, textNode(idealGas.CO2)), td()),

      tr(td('SO2'), td('kmol'), td({ className: 'text-right' }, textNode(idealGas.SO2)), td()),

      /**分离到单独的组件中**/
      tr(td(b('浓度分析')), td(), td(), td()),

      tr(td('SO2浓度（干态）'), td('ppmdv'), td({ className: 'text-right' }, textNode(idealGas.ppmSO2)), td()),

      tr(td(), td('mg/Nm3'), td({ className: 'text-right' }, textNode(idealGas.concentrationSO2)), td()),

      tr(
         td('SO2浓度（干态，', textNode(gasParameters.baseO2), '% O2）'),
         td('ppmdv'),
         td({ className: 'text-right' }, textNode(idealGas.base_ppmSO2)),
         td()
      ),

      tr(
         td(),
         td('mg/Nm3'),
         td({ className: 'text-right' }, textNode(idealGas.base_concentrationSO2)),
         td(
            button(
               {
                  onClick() {},
               },
               '目标:',
               textNode(gasParameters.concentration.SO2)
            ).subscribeEvent('click', _ => {
               changeCoalS(balance)
            })
         )
      ),
   ]
}
