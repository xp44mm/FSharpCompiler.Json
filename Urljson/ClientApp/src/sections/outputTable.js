import { map } from 'rxjs/operators'
import { div, table, tbody, td, textNode, th, thead, tr } from '../hyperscript'
import { SectionsViewModel } from './model'

export const outputTable = (model = new SectionsViewModel()) => {
   let linesTbody = tbody()

   //append a section
   model.sections.push$
      |> map(line =>
         tr(
            td(textNode(line.name)),
            td({ className: 'text-right' }, textNode(line.volume)),
            td(textNode(line.dimension)),
            td({ className: 'text-right' }, textNode(line.area |> map(v => v.toFixed(0)))),
            td({ className: 'text-right' }, textNode(line.velocity |> map(v => v.toFixed(2))))
         )
      )
      |> (o =>
         o.subscribe(tr => {
            linesTbody.appendChild(tr)
         }))

   //remove a section
   model.sections.remove$ |> map(i => linesTbody.childNodes[i]) |> (o => o.subscribe(tr => linesTbody.removeChild(tr)))

   return div(
      table(
         { 'style.marginTop': '4px' },
         thead(tr(th('名称'), th('流量'), th('尺寸'), th('截面积'), th('流速')), tr(th(), th('m3/hr'), th('mm'), th('mm2'), th('m/s'))),
         linesTbody
      )
   )
}
