import { b, td, textNode, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'
import { AtmosphereViewModel } from '../../model/AtmosphereViewModel'

export const atmosphereRows = (atmosphere = new AtmosphereViewModel()) => {
   let { wetAir, airVol } = atmosphere

   return [
      tr(td(b('大气')), td(), td(), td()),

      tr(td('大气压力'), td('Pa'), td({ className: 'text-right' }, numberbox({ number: atmosphere.pressure })), td()),

      tr(td('大气温度'), td('℃'), td({ className: 'text-right' }, numberbox({ number: atmosphere.temperature })), td()),

      tr(td('相对湿度'), td('%'), td({ className: 'text-right' }, numberbox({ number: atmosphere.humidity })), td()),

      tr(td(b('空气质量')), td(), td(), td()),

      tr(td('H2O'), td('wt. %'), td({ className: 'text-right' }, textNode(wetAir.H2O)), td()),

      tr(td('O2'), td('wt. %'), td({ className: 'text-right' }, textNode(wetAir.O2)), td()),

      tr(td('N2'), td('wt. %'), td({ className: 'text-right' }, textNode(wetAir.N2)), td()),

      tr(td(b('空气体积')), td(), td(), td()),

      tr(td('H2O'), td('vol. %'), td({ className: 'text-right' }, textNode(airVol.H2O)), td()),

      tr(td('O2'), td('vol. %'), td({ className: 'text-right' }, textNode(airVol.O2)), td()),

      tr(td('N2'), td('vol. %'), td({ className: 'text-right' }, textNode(airVol.N2)), td()),
   ]
}
