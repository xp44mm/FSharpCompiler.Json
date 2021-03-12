import { BehaviorSubject } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { observableArray } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { OrrificeViewModel } from './OrrificeViewModel'

//export const createPipeline = key => {
//    let model = new PipelineViewModel(key)
//    model.addOrrifice()
//    model.orrifices$.next(model.orrifices)
//    return model
//}

export class PipelineViewModel {
    constructor() {
        this.title = new BehaviorSubject('孔板管道')
        this.p0 = new BehaviorSubject(101.325)
        this.p1 = new BehaviorSubject(120)
        this.t = new BehaviorSubject(50)
        this.dens = new BehaviorSubject(1243)
        this.flow = new BehaviorSubject(42)
        this.dw = new BehaviorSubject(100)

        //孔板组的管径简化为相同，不变化，则孔板厚度也相同。
        this.thick = new BehaviorSubject(8)

        this.pt =
            this.t
            |> map(t => 'orrifice/backpressureDrop?' + jzonQueryData({ t }))
            |> mergeMap(url => httpGetJson(url))

        this.minThick =
            this.dw
            |> map(dw => 'orrifice/minThick?' + jzonQueryData({ dw }))
            |> mergeMap(url => httpGetJson(url))
            |> tap(t => {
                let tt = Math.ceil(t)
                if (tt > this.thick.value) {
                    this.thick.next(tt)
                }
            })

        this.orrifices = observableArray()
        this.orrifices.create = this.addOrrifice.bind(this)
    }

    pickeys() {
        let behaviorSubjects = new Set(
            Object.keys(this).filter(k => this[k] instanceof BehaviorSubject)
        )
        behaviorSubjects.delete('p0')
        return [...behaviorSubjects, 'orrifices']
    }

    addOrrifice() {
        let orrifice = new OrrificeViewModel()
        orrifice.subscription = orrifice.subscribe(this)
        this.orrifices.push(orrifice)
    }

    //删除最后一个
    removeOrrifice() {
        if (this.orrifices.length > 0) {
            let i = this.orrifices.length - 1
            this.orrifices.splice(i, 1)
        }
    }
}
