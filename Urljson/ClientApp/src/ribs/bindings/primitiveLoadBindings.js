import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { locate } from '../../deep'
import { wallPaths, wallLoadPaths } from '../path/wallPaths'
import { loads } from '../path/keys'


//绑定单独的分项荷载
export function primitiveLoadBindings(project, rib) {
    //正压
    rib.barotropy.subscribe(p => {
        wallPaths.forEach(path => {
            locate(rib, path).barotropy.pressure.next(p)
        })
    })

    //负压
    rib.vaccum.subscribe(p => {
        wallPaths.forEach(path => {
            locate(rib, path).vaccum.pressure.next(p)
        })
    })

    //保温荷载
    rib.insulationWeight.subscribe(x => {
        for (let ld of loads) {
            rib.horizon.top[ld].insula.next(-x)
            rib.horizon.bottom[ld].insula.next(x)
        }
    })

    //灰荷载
    combineLatest(rib.ash, rib.longitude.length)
        |> map(([ash, h]) => ash * h / 1000)
        |> (o => o.subscribe(ld => {
            rib.horizon.bottom.barotropy.ash.next(ld)
        }))

    //雪荷载
    project.snow
        |> map(s => -s)
        |> (o => o.subscribe(ld => {
            rib.horizon.top.vaccum.snow.next(ld)
        }))

    //风荷载
    combineLatest(rib.windElevCoeff, project.w0)
        |> map(([mz, w0]) => mz * w0)
        |> (o => o.subscribe(wz => {
            rib.horizon.top.barotropy.wind.next(0.7 * wz)
            rib.horizon.bottom.barotropy.wind.next(0.7 * wz)
            rib.horizon.side.barotropy.wind.next(0.5 * wz)
            rib.horizon.side.vaccum.wind.next(-0.8 * wz)

            rib.vertical.sidea.barotropy.wind.next(0.7 * wz)
            rib.vertical.sideb.barotropy.wind.next(0.7 * wz)
            rib.vertical.sidea.vaccum.wind.next(-0.8 * wz)
            rib.vertical.sideb.vaccum.wind.next(-0.8 * wz)

        }))
}

