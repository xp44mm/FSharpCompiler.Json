import { combineLatest } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { locate } from '../../deep'
import { getDimensionName } from '../path/getDimensionName'

//function pipeLoadBinding(rib, wallLoadPath) {
//    let wallLoad = locate(rib, wallLoadPath)
//    let dimension = rib[getDimensionName(wallLoadPath[1])]
//    subscribePipeLoad(rib, dimension, wallLoad)
//}

export function pipeLoadBinding({ rib, dimension, wallLoad }) {
    //垂直于板表面的内撑杆
    let {
        pipe: { wallArea, area, stable },
    } = dimension

    let pipeLoad = wallLoad.pipe

    //let allow = rib.kind
    //    |> filter(([kind]) => kind === kindName)

    combineLatest(dimension.pipeNumber, wallLoad.allLoads)
        //|> filter(([v]) => v)
        //|> map(([_, ...rest]) => rest)
        |> map(([n, load]) => n > 0 ? load : 0)
        |> (o => o.subscribe(pipeLoad.load))

    combineLatest(pipeLoad.load, wallArea)
        |> map(([load, wallArea]) => load * wallArea)
        |> (o => o.subscribe(pipeLoad.force))

    combineLatest(pipeLoad.force, area, stable)
        |> map(
            ([force, area, stable]) =>
                (force < 0 ? stable : 0.56)
                |> (stable => 10 * force / area / stable)
        )
        |> (o => o.subscribe(pipeLoad.stress))

}
