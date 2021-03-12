import { map } from 'rxjs/operators'
import { div, table, tbody, th, thead, tr } from '../hyperscript'
import { ductOutputRow } from './ductOutputRow'
import { TableViewModel } from './model'

export const outputTable = (model = new TableViewModel()) => {
   let root = div(
      table(
         thead(
            tr(th('名称'), th('型式'), th('尺寸'), th('表面积'), th('重量'), th('油漆'), th('保温'), th('压型板')),

            tr(th(), th(), th('m'), th('m2'), th('t'), th('kg'), th('m3'), th('m2'))
         ),
         tbody()
      )
   )

   let container = root.getElementsByTagName('tbody')[0]

   //append a line
   model.lines.push$ |> map(duct => ductOutputRow(duct)) |> (o => o.subscribe(tr => container.appendChild(tr)))

   //remove a line
   model.lines.remove$ |> map(i => container.childNodes[i]) |> (o => o.subscribe(tr => container.removeChild(tr)))

   return root
}
