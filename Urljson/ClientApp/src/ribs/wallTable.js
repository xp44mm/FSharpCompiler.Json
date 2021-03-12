import { map } from 'rxjs/operators'
import { table, tbody, th, thead, tr } from '../hyperscript'
import { wallRows } from './wall/wallRows'
import { wallLoadRows } from './wallLoad/wallLoadRows'

export function wallTable(rib) {
   let { frequency } = rib
   let titles = [['顶面', 'horizon'], ['底面', 'horizon'], ['侧面', 'horizon'], ['侧面a', 'vertical'], ['侧面b', 'vertical']]

   return table(
      thead(
         tr(
            th('名称'),
            th('单位'),
            ...titles.map(([text, k]) =>
               th(
                  {
                     colSpan: 2,
                     '.hidden': rib.kind |> map(ki => ki !== k),
                  },
                  text
               )
            ),
            th('备注')
         )
      ),

      tbody(
         ...wallRows(rib),
         ...wallLoadRows(rib)
         //...pipeLoadRows(rib, 'fixedHorizon')
      )
   )
}
